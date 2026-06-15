import { motion } from 'motion/react'
import { useWriteStore } from '../stores/write-store'
import { INIT_DELAY } from '@/consts'
import { useRef } from 'react'
import {
	Bold,
	Italic,
	Strikethrough,
	Link,
	Code,
	Code2,
	Quote,
	List,
	ListOrdered,
	Heading1,
	Heading2,
	Heading3,
	Heading4,
	Heading5,
	Heading6,
	Minus,
	Image,
	Table,
} from 'lucide-react'

const defaultText = 'text'

// 工具栏配置 
type ToolbarItem =
	| {
		type: 'button'
		icon: React.ReactNode
		label: string
		shortcut?: string
		action: (ctx: EditorContext) => void
	}
	| { type: 'separator' }

interface EditorContext {
	textarea: HTMLTextAreaElement
	value: string
	selectionStart: number
	selectionEnd: number
	selectedText: string
	insertText: (text: string) => void
	updateForm: (data: { md: string }) => void
}

const toolbarItems: ToolbarItem[] = [
	// 标题组
	{
		type: 'button',
		icon: <Heading1 size={15} />,
		label: 'H1',
		shortcut: 'Ctrl+Alt+1',
		action: ({ textarea, value, selectionStart, insertText }) => {
			toggleLinePrefix(textarea, value, selectionStart, '# ', insertText)
		},
	},
	{
		type: 'button',
		icon: <Heading2 size={15} />,
		label: 'H2',
		shortcut: 'Ctrl+Alt+2',
		action: ({ textarea, value, selectionStart, insertText }) => {
			toggleLinePrefix(textarea, value, selectionStart, '## ', insertText)
		},
	},
	{
		type: 'button',
		icon: <Heading3 size={15} />,
		label: 'H3',
		shortcut: 'Ctrl+Alt+3',
		action: ({ textarea, value, selectionStart, insertText }) => {
			toggleLinePrefix(textarea, value, selectionStart, '### ', insertText)
		},
	},
	{
		type: 'button',
		icon: <Heading4 size={15} />,
		label: 'H4',
		shortcut: 'Ctrl+Alt+4',
		action: ({ textarea, value, selectionStart, insertText }) => {
			toggleLinePrefix(textarea, value, selectionStart, '#### ', insertText)
		},
	},
	{
		type: 'button',
		icon: <Heading5 size={15} />,
		label: 'H5',
		shortcut: 'Ctrl+Alt+5',
		action: ({ textarea, value, selectionStart, insertText }) => {
			toggleLinePrefix(textarea, value, selectionStart, '##### ', insertText)
		},
	},
	{
		type: 'button',
		icon: <Heading6 size={15} />,
		label: 'H6',
		shortcut: 'Ctrl+Alt+6',
		action: ({ textarea, value, selectionStart, insertText }) => {
			toggleLinePrefix(textarea, value, selectionStart, '###### ', insertText)
		},
	},
	{ type: 'separator' },
	// 文字格式
	{
		type: 'button',
		icon: <Bold size={15} />,
		label: '粗体',
		shortcut: 'Ctrl+B',
		action: ({ textarea, value, selectionStart, selectionEnd, selectedText, insertText }) => {
			handleInlineWrap(textarea, value, selectionStart, selectionEnd, selectedText, '**', insertText)
		},
	},
	{
		type: 'button',
		icon: <Italic size={15} />,
		label: '斜体',
		shortcut: 'Ctrl+I',
		action: ({ textarea, value, selectionStart, selectionEnd, selectedText, insertText }) => {
			handleInlineWrap(textarea, value, selectionStart, selectionEnd, selectedText, '*', insertText)
		},
	},
	{
		type: 'button',
		icon: <Strikethrough size={15} />,
		label: '删除线',
		shortcut: 'Ctrl+Shift+S',
		action: ({ textarea, value, selectionStart, selectionEnd, selectedText, insertText }) => {
			handleInlineWrap(textarea, value, selectionStart, selectionEnd, selectedText, '~~', insertText)
		},
	},
	{ type: 'separator' },
	// 链接 & 图片
	{
		type: 'button',
		icon: <Link size={15} />,
		label: '链接',
		shortcut: 'Ctrl+K',
		action: ({ textarea, selectionStart, selectedText, insertText }) => {
			const text = selectedText || defaultText
			insertText(`[${text}](url)`)
			setTimeout(() => {
				const urlStart = selectionStart + text.length + 3
				textarea.setSelectionRange(urlStart, urlStart + 3)
			}, 0)
		},
	},
	{
		type: 'button',
		icon: <Image size={15} />,
		label: '图片',
		shortcut: 'Ctrl+Shift+I',
		action: ({ textarea, selectionStart, selectedText, insertText }) => {
			const alt = selectedText || 'alt'
			insertText(`![${alt}](url)`)
			setTimeout(() => {
				const urlStart = selectionStart + alt.length + 4
				textarea.setSelectionRange(urlStart, urlStart + 3)
			}, 0)
		},
	},
	{ type: 'separator' },
	// 代码
	{
		type: 'button',
		icon: <Code size={15} />,
		label: '行内代码',
		shortcut: 'Ctrl+`',
		action: ({ textarea, value, selectionStart, selectionEnd, selectedText, insertText }) => {
			handleInlineWrap(textarea, value, selectionStart, selectionEnd, selectedText, '`', insertText)
		},
	},
	{
		type: 'button',
		icon: <Code2 size={15} />,
		label: '代码块',
		shortcut: 'Ctrl+Shift+`',
		action: ({ textarea, selectionStart, selectionEnd, selectedText, insertText }) => {
			const code = selectedText || 'code'
			const isMultiLine = selectedText.includes('\n')
			if (isMultiLine || !selectedText) {
				insertText(`\`\`\`\n${code}\n\`\`\``)
				if (!selectedText) {
					setTimeout(() => {
						textarea.setSelectionRange(selectionStart + 4, selectionStart + 4 + code.length)
					}, 0)
				}
			} else {
				insertText(`\`\`\`\n${code}\n\`\`\``)
				setTimeout(() => {
					textarea.setSelectionRange(selectionStart + 4, selectionEnd + 4)
				}, 0)
			}
		},
	},
	{ type: 'separator' },
	// 列表 & 引用
	{
		type: 'button',
		icon: <List size={15} />,
		label: '无序列表',
		shortcut: 'Ctrl+Shift+U',
		action: ({ textarea, value, selectionStart, insertText }) => {
			toggleLinePrefix(textarea, value, selectionStart, '- ', insertText)
		},
	},
	{
		type: 'button',
		icon: <ListOrdered size={15} />,
		label: '有序列表',
		shortcut: 'Ctrl+Shift+O',
		action: ({ textarea, value, selectionStart, insertText }) => {
			toggleLinePrefix(textarea, value, selectionStart, '1. ', insertText)
		},
	},
	{
		type: 'button',
		icon: <Quote size={15} />,
		label: '引用',
		shortcut: 'Ctrl+Shift+.',
		action: ({ textarea, value, selectionStart, insertText }) => {
			toggleLinePrefix(textarea, value, selectionStart, '> ', insertText)
		},
	},
	{ type: 'separator' },
	// 其他
	{
		type: 'button',
		icon: <Minus size={15} />,
		label: '分割线',
		shortcut: 'Ctrl+Shift+-',
		action: ({ insertText }) => {
			insertText('\n---\n')
		},
	},
	{
		type: 'button',
		icon: <Table size={15} />,
		label: '表格',
		shortcut: 'Ctrl+Shift+T',
		action: ({ textarea, selectionStart, insertText }) => {
			const table = `| 列1 | 列2 | 列3 |\n| --- | --- | --- |\n| 内容 | 内容 | 内容 |`
			insertText(table)
			setTimeout(() => {
				textarea.setSelectionRange(selectionStart + 2, selectionStart + 4)
			}, 0)
		},
	},
]

// 辅助函数

/** 行首前缀切换（标题、列表、引用） */
function toggleLinePrefix(
	textarea: HTMLTextAreaElement,
	value: string,
	selectionStart: number,
	prefix: string,
	insertText: (text: string) => void,
) {
	const lineStart = value.lastIndexOf('\n', selectionStart - 1) + 1
	const lineEnd = value.indexOf('\n', selectionStart)
	const line = value.substring(lineStart, lineEnd === -1 ? undefined : lineEnd)

	if (line.startsWith(prefix)) {
		// 移除前缀
		textarea.setSelectionRange(lineStart, lineStart + prefix.length)
		insertText('')
	} else {
		// 移除其他标题前缀再添加
		const headingMatch = line.match(/^(#{1,6} |> |- |\d+\. )/)
		if (headingMatch) {
			textarea.setSelectionRange(lineStart, lineStart + headingMatch[0].length)
			insertText(prefix)
		} else {
			textarea.setSelectionRange(lineStart, lineStart)
			insertText(prefix)
		}
	}
}

/** 行内包裹切换（粗体、斜体、删除线、行内代码） */
function handleInlineWrap(
	textarea: HTMLTextAreaElement,
	value: string,
	selectionStart: number,
	selectionEnd: number,
	selectedText: string,
	marker: string,
	insertText: (text: string) => void,
) {
	const before = value.substring(0, selectionStart)
	const after = value.substring(selectionEnd)
	const len = marker.length

	const isWrapped = before.endsWith(marker) && after.startsWith(marker)

	if (isWrapped && selectedText) {
		textarea.setSelectionRange(selectionStart - len, selectionEnd + len)
		insertText(selectedText)
	} else {
		const text = selectedText || defaultText
		insertText(`${marker}${text}${marker}`)
		if (!selectedText) {
			setTimeout(() => {
				textarea.setSelectionRange(selectionStart + len, selectionStart + len + defaultText.length)
			}, 0)
		}
	}
}

// 字数统计
function countWords(md: string) {
	// 去除 markdown 语法符号后统计
	const plain = md
		.replace(/```[\s\S]*?```/g, '') // 代码块
		.replace(/`[^`]*`/g, '') // 行内代码
		.replace(/!\[.*?\]\(.*?\)/g, '') // 图片
		.replace(/\[.*?\]\(.*?\)/g, '') // 链接
		.replace(/#{1,6}\s/g, '') // 标题
		.replace(/[*_~>-]+/g, '') // 格式符号

	const chars = plain.replace(/\s/g, '').length
	// 英文单词数
	const words = plain.match(/\b[a-zA-Z]+\b/g)?.length ?? 0
	const lines = md.split('\n').length

	return { chars, words, lines }
}

// 主组件
export function WriteEditor() {
	const { form, updateForm, addFiles } = useWriteStore()
	const textareaRef = useRef<HTMLTextAreaElement>(null)

	// insertText
	const insertText = (text: string) => {
		const textarea = textareaRef.current
		if (!textarea) return

		textarea.focus()
		const success = document.execCommand('insertText', false, text)

		if (!success) {
			const { selectionStart, selectionEnd, value } = textarea
			const before = value.substring(0, selectionStart)
			const after = value.substring(selectionEnd)
			updateForm({ md: before + text + after })
			setTimeout(() => {
				textarea.setSelectionRange(selectionStart + text.length, selectionStart + text.length)
				textarea.focus()
			}, 0)
		}
	}

	// 构建 EditorContext
	const getContext = (): EditorContext | null => {
		const textarea = textareaRef.current
		if (!textarea) return null
		const { selectionStart, selectionEnd, value } = textarea
		return {
			textarea,
			value,
			selectionStart,
			selectionEnd,
			selectedText: value.substring(selectionStart, selectionEnd),
			insertText,
			updateForm,
		}
	}

	// handleKeyDown 
	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		const textarea = textareaRef.current
		if (!textarea) return

		const { selectionStart, selectionEnd, value } = textarea
		const selectedText = value.substring(selectionStart, selectionEnd)
		const before = value.substring(0, selectionStart)
		const after = value.substring(selectionEnd)

		const ctrl = e.ctrlKey || e.metaKey

		// 粗体 Ctrl+B
		if (ctrl && !e.shiftKey && !e.altKey && e.key === 'b') {
			e.preventDefault()
			handleInlineWrap(textarea, value, selectionStart, selectionEnd, selectedText, '**', insertText)
			return
		}

		// 斜体 Ctrl+I
		if (ctrl && !e.shiftKey && !e.altKey && e.key === 'i') {
			e.preventDefault()
			handleInlineWrap(textarea, value, selectionStart, selectionEnd, selectedText, '*', insertText)
			return
		}

		// 删除线 Ctrl+Shift+S
		if (ctrl && e.shiftKey && e.key === 'S') {
			e.preventDefault()
			handleInlineWrap(textarea, value, selectionStart, selectionEnd, selectedText, '~~', insertText)
			return
		}

		// 链接 Ctrl+K
		if (ctrl && !e.shiftKey && !e.altKey && e.key === 'k') {
			e.preventDefault()
			const text = selectedText || defaultText
			insertText(`[${text}](url)`)
			setTimeout(() => {
				const urlStart = selectionStart + text.length + 3
				textarea.setSelectionRange(urlStart, urlStart + 3)
			}, 0)
			return
		}

		// 图片 Ctrl+Shift+I
		if (ctrl && e.shiftKey && e.key === 'I') {
			e.preventDefault()
			const alt = selectedText || 'alt'
			insertText(`![${alt}](url)`)
			setTimeout(() => {
				const urlStart = selectionStart + alt.length + 4
				textarea.setSelectionRange(urlStart, urlStart + 3)
			}, 0)
			return
		}

		// 行内代码 Ctrl+`
		if (ctrl && !e.shiftKey && e.key === '`') {
			e.preventDefault()
			handleInlineWrap(textarea, value, selectionStart, selectionEnd, selectedText, '`', insertText)
			return
		}

		// 代码块 Ctrl+Shift+`
		if (ctrl && e.shiftKey && e.key === '`') {
			e.preventDefault()
			const code = selectedText || 'code'
			insertText(`\`\`\`\n${code}\n\`\`\``)
			if (!selectedText) {
				setTimeout(() => {
					textarea.setSelectionRange(selectionStart + 4, selectionStart + 4 + code.length)
				}, 0)
			}
			return
		}

		// 标题 Ctrl+Alt+1/2/3 
		if (ctrl && e.altKey && ['1', '2', '3'].includes(e.key)) {
			e.preventDefault()
			const level = parseInt(e.key)
			const prefix = '#'.repeat(level) + ' '
			toggleLinePrefix(textarea, value, selectionStart, prefix, insertText)
			return
		}

		// 无序列表 Ctrl+Shift+U
		if (ctrl && e.shiftKey && e.key === 'U') {
			e.preventDefault()
			toggleLinePrefix(textarea, value, selectionStart, '- ', insertText)
			return
		}

		// 有序列表 Ctrl+Shift+O
		if (ctrl && e.shiftKey && e.key === 'O') {
			e.preventDefault()
			toggleLinePrefix(textarea, value, selectionStart, '1. ', insertText)
			return
		}

		// 引用 Ctrl+Shift+.
		if (ctrl && e.shiftKey && e.key === '>') {
			e.preventDefault()
			toggleLinePrefix(textarea, value, selectionStart, '> ', insertText)
			return
		}

		// 分割线 Ctrl+Shift+-
		if (ctrl && e.shiftKey && e.key === '_') {
			e.preventDefault()
			insertText('\n---\n')
			return
		}

		// 表格 Ctrl+Shift+T
		if (ctrl && e.shiftKey && e.key === 'T') {
			e.preventDefault()
			const table = `| 列1 | 列2 | 列3 |\n| --- | --- | --- |\n| 内容 | 内容 | 内容 |`
			insertText(table)
			setTimeout(() => {
				textarea.setSelectionRange(selectionStart + 2, selectionStart + 4)
			}, 0)
			return
		}

		// Tab 缩进
		if (e.key === 'Tab' && !e.shiftKey) {
			e.preventDefault()
			insertText('\t')
			return
		}

		// Shift+Tab 反缩进
		if (e.key === 'Tab' && e.shiftKey) {
			e.preventDefault()
			const lineStart = value.lastIndexOf('\n', selectionStart - 1) + 1
			const line = value.substring(lineStart, value.indexOf('\n', selectionStart))

			if (line.startsWith('\t')) {
				textarea.setSelectionRange(lineStart, lineStart + 1)
				insertText('')
			} else if (line.startsWith('  ')) {
				textarea.setSelectionRange(lineStart, lineStart + 2)
				insertText('')
			}
			return
		}

		// Enter：列表自动续行
		if (e.key === 'Enter') {
			const lineStart = value.lastIndexOf('\n', selectionStart - 1) + 1
			const line = value.substring(lineStart, selectionStart)

			// 无序列表
			const unorderedMatch = line.match(/^(\s*)([-*+] )/)
			if (unorderedMatch) {
				// 空列表项则退出列表
				if (line.trim() === unorderedMatch[2].trim()) {
					e.preventDefault()
					textarea.setSelectionRange(lineStart, selectionStart)
					insertText('')
					return
				}
				e.preventDefault()
				insertText(`\n${unorderedMatch[1]}${unorderedMatch[2]}`)
				return
			}

			// 有序列表
			const orderedMatch = line.match(/^(\s*)(\d+)\. /)
			if (orderedMatch) {
				if (line.trim() === `${orderedMatch[2]}.`) {
					e.preventDefault()
					textarea.setSelectionRange(lineStart, selectionStart)
					insertText('')
					return
				}
				e.preventDefault()
				const nextNum = parseInt(orderedMatch[2]) + 1
				insertText(`\n${orderedMatch[1]}${nextNum}. `)
				return
			}

			// 引用块
			const quoteMatch = line.match(/^(\s*> )/)
			if (quoteMatch) {
				if (line.trim() === '>') {
					e.preventDefault()
					textarea.setSelectionRange(lineStart, selectionStart)
					insertText('')
					return
				}
				e.preventDefault()
				insertText(`\n${quoteMatch[1]}`)
				return
			}
		}
	}

	// handlePaste
	const handlePaste = async (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
		const items = e.clipboardData.items
		if (!items) return

		const imageFiles: File[] = []
		for (let i = 0; i < items.length; i++) {
			const item = items[i]
			if (item.type.startsWith('image/')) {
				const file = item.getAsFile()
				if (file) imageFiles.push(file)
			}
		}

		if (imageFiles.length > 0) {
			e.preventDefault()
			const resultImages = await addFiles(imageFiles).catch(() => [])
			if (resultImages && resultImages.length > 0) {
				const markdowns = resultImages
					.map(item => (item.type === 'url' ? `![](${item.url})` : `![](local-image:${item.id})`))
					.join('\n')
				insertText(markdowns)
			}
		}
	}

	// 统计 
	const stats = countWords(form.md)

	// render 
	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.8 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ delay: INIT_DELAY }}
			className='bg-card flex min-h-[800px] w-[800px] flex-col rounded-[40px] border p-6 shadow'>

			{/* 标题 & Slug */}
			<div className='mb-3 flex gap-3'>
				<input
					type='text'
					placeholder='标题'
					className='bg-card flex-1 rounded-lg border px-3 py-2 text-sm'
					value={form.title}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateForm({ title: e.target.value })}
				/>
				<input
					type='text'
					placeholder='slug（xx-xx）'
					className='bg-card w-[200px] rounded-lg border px-3 py-2 text-sm'
					value={form.slug}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateForm({ slug: e.target.value })}
				/>
			</div>

			{/* 工具栏 */}
			<div className='mb-2 flex flex-wrap items-center gap-0.5 rounded-xl border px-2 py-1.5'>
				{toolbarItems.map((item, index) => {
					if (item.type === 'separator') {
						return <div key={index} className='bg-border mx-1 h-5 w-px' />
					}
					return (
						<button
							key={index}
							type='button'
							title={item.shortcut ? `${item.label}（${item.shortcut}）` : item.label}
							onMouseDown={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
								// 阻止 textarea 失焦
								e.preventDefault()
								const ctx = getContext()
								if (ctx) item.action(ctx)
							}}
							className='text-muted-foreground hover:text-foreground hover:bg-muted flex h-7 min-w-7 items-center justify-center rounded-md px-1.5 text-xs transition-colors'>
							{item.icon}
						</button>
					)
				})}
			</div>

			{/* 编辑区 */}
			<textarea
				ref={textareaRef}
				placeholder='Markdown 内容'
				className='bg-card min-h-0 flex-1 resize-none rounded-xl border p-4 text-sm'
				value={form.md}
				onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateForm({ md: e.target.value })}
				onKeyDown={handleKeyDown}
				onPaste={handlePaste}
			/>

			{/* 底部字数统计 */}
			<div className='text-muted-foreground mt-2 flex items-center justify-end gap-4 px-1 text-xs'>
				<span>
					<span className='text-foreground font-medium'>{stats.chars}</span> 字符
				</span>
				<span>
					<span className='text-foreground font-medium'>{stats.words}</span> 英文词
				</span>
				<span>
					<span className='text-foreground font-medium'>{stats.lines}</span> 行
				</span>
			</div>
		</motion.div>
	)
}