'use client'

import { useState, useRef } from 'react'
import { toast } from 'sonner'
import { Plus, Link as LinkIcon, Upload } from 'lucide-react'
import { DialogModal } from '@/components/dialog-modal'
import type { ImageItem } from '../../projects/components/image-upload-dialog'

interface UploadDialogProps {
	onClose: () => void
	onSubmit: (payload: { images: ImageItem[]; description: string }) => void
}

type TabType = 'file' | 'url'

export default function UploadDialog({ onClose, onSubmit }: UploadDialogProps) {
	const [description, setDescription] = useState('')
	const [images, setImages] = useState<ImageItem[]>([])
	const [activeTab, setActiveTab] = useState<TabType>('file')
	const [urlInput, setUrlInput] = useState('')
	const fileInputRef = useRef<HTMLInputElement>(null)

	// 文件处理
	const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(e.target.files || [])
		if (files.length === 0) return

		const nextImages: ImageItem[] = []

		for (const file of files) {
			if (!file.type.startsWith('image/')) {
				toast.error('请选择图片文件')
				return
			}
			nextImages.push({
				type: 'file',
				file,
				previewUrl: URL.createObjectURL(file)
			})
		}

		setImages(prev => [...prev, ...nextImages])
		// 重置 input，允许重复选同一文件
		if (e.target) e.target.value = ''
	}

	// URL 处理
	const handleAddUrl = () => {
		const url = urlInput.trim()
		if (!url) return

		// 简单校验：必须是 http/https 开头
		if (!/^https?:\/\/.+/.test(url)) {
			toast.error('请输入有效的图片 URL（以 http:// 或 https:// 开头）')
			return
		}

		// 避免重复添加
		const alreadyExists = images.some(img => img.type === 'url' && img.url === url)
		if (alreadyExists) {
			toast.error('该 URL 已添加')
			return
		}

		setImages(prev => [
			...prev,
			{ type: 'url', url, previewUrl: url }
		])
		setUrlInput('')
	}

	const handleUrlKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			e.preventDefault()
			handleAddUrl()
		}
	}

	// 删除单张图片
	const handleRemoveImage = (index: number) => {
		setImages(prev => {
			const target = prev[index]
			if (target.type === 'file') {
				URL.revokeObjectURL(target.previewUrl)
			}
			return prev.filter((_, i) => i !== index)
		})
	}

	// 提交
	const handleSubmit = () => {
		if (images.length === 0) {
			toast.error('请至少添加一张图片')
			return
		}

		onSubmit({ images, description })

		setImages([])
		setDescription('')
		onClose()
	}

	// 关闭
	const handleClose = () => {
		images.forEach(image => {
			if (image.type === 'file') {
				URL.revokeObjectURL(image.previewUrl)
			}
		})
		setImages([])
		setDescription('')
		onClose()
	}

	// 预览区（共用，与 tab 无关）
	const PreviewArea = () => {
		if (images.length === 0) return null

		return (
			<div className='mt-3 space-y-2'>
				{/* 扇形堆叠预览（最多 3 张） */}
				<div className='relative flex h-40 items-center justify-center overflow-visible rounded-xl bg-linear-to-br from-gray-50 to-gray-100'>
					{images.slice(0, 3).map((image, index) => (
						<div
							key={index}
							className={`absolute h-32 w-44 overflow-hidden rounded-xl border-4 border-white bg-white shadow-xl transition-transform ${index === 0
									? '-left-4 -translate-y-2 -rotate-6'
									: index === 1
										? 'z-20 rotate-1'
										: 'right-0 translate-y-2 rotate-6'
								}`}>
							<img src={image.previewUrl} alt={`preview-${index}`} className='h-full w-full object-cover' />
						</div>
					))}

					{images.length > 3 && (
						<div className='absolute right-4 -bottom-2 rounded-full bg-black/70 px-3 py-1 text-xs text-white shadow-lg'>
							共 {images.length} 张
						</div>
					)}
				</div>

				{/* 缩略图列表，支持单独删除 */}
				<div className='flex flex-wrap gap-2'>
					{images.map((image, index) => (
						<div key={index} className='group relative h-14 w-14 overflow-hidden rounded-lg border border-gray-200 bg-gray-50'>
							<img src={image.previewUrl} alt={`thumb-${index}`} className='h-full w-full object-cover' />
							{/* URL 标记 */}
							{image.type === 'url' && (
								<div className='absolute bottom-0 left-0 right-0 bg-black/50 py-0.5 text-center text-[10px] text-white'>
									URL
								</div>
							)}
							{/* 删除按钮 */}
							<button
								type='button'
								onClick={() => handleRemoveImage(index)}
								className='absolute inset-0 hidden items-center justify-center bg-black/40 text-white group-hover:flex'>
								✕
							</button>
						</div>
					))}
				</div>

				<div className='flex items-center justify-between'>
					<span className='text-secondary text-xs'>已添加 {images.length} 张图片</span>
				</div>
			</div>
		)
	}

	return (
		<DialogModal open onClose={handleClose} className='card w-md max-sm:w-full'>
			<div className='space-y-4'>
				<h2 className='text-xl font-bold'>上传图片</h2>

				{/* Tab 切换 */}
				<div className='flex rounded-lg border border-gray-200 bg-gray-50 p-1'>
					<button
						type='button'
						onClick={() => setActiveTab('file')}
						className={`flex flex-1 items-center justify-center gap-1.5 rounded-md py-1.5 text-sm transition-colors ${activeTab === 'file' ? 'bg-white font-medium shadow-sm' : 'text-gray-500 hover:text-gray-700'
							}`}>
						<Upload className='h-3.5 w-3.5' />
						本地文件
					</button>
					<button
						type='button'
						onClick={() => setActiveTab('url')}
						className={`flex flex-1 items-center justify-center gap-1.5 rounded-md py-1.5 text-sm transition-colors ${activeTab === 'url' ? 'bg-white font-medium shadow-sm' : 'text-gray-500 hover:text-gray-700'
							}`}>
						<LinkIcon className='h-3.5 w-3.5' />
						图片 URL
					</button>
				</div>

				{/* 文件上传面板 */}
				{activeTab === 'file' && (
					<div>
						<label className='text-secondary mb-2 block text-sm font-medium'>选择图片（可多选）</label>
						<input
							ref={fileInputRef}
							type='file'
							accept='image/*'
							multiple
							className='hidden'
							onChange={handleFileSelect}
						/>

						{images.filter(i => i.type === 'file').length === 0 && images.length === 0 ? (
							<div
								onClick={() => fileInputRef.current?.click()}
								className='flex h-32 cursor-pointer items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 transition-colors hover:bg-secondary/10'>
								<div className='text-center'>
									<Plus className='mx-auto mb-1 h-8 w-8 text-gray-500' />
									<p className='text-secondary text-xs'>点击选择图片</p>
								</div>
							</div>
						) : (
							<button
								type='button'
								onClick={() => fileInputRef.current?.click()}
								className='w-full rounded-lg border border-dashed border-gray-300 bg-gray-50 py-2.5 text-sm text-gray-600 transition-colors hover:bg-secondary/10'>
								+ 继续添加文件
							</button>
						)}
					</div>
				)}

				{/* URL 输入面板 */}
				{activeTab === 'url' && (
					<div>
						<label className='text-secondary mb-2 block text-sm font-medium'>输入图片 URL</label>
						<div className='flex gap-2'>
							<input
								type='text'
								placeholder='https://example.com/image.jpg'
								className='flex-1 rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm focus:outline-none'
								value={urlInput}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUrlInput(e.target.value)}
								onKeyDown={handleUrlKeyDown}
							/>
							<button
								type='button'
								onClick={handleAddUrl}
								className='rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50'>
								添加
							</button>
						</div>
						<p className='text-secondary mt-1.5 text-xs'>按 Enter 或点击「添加」，可多次添加</p>
					</div>
				)}

				{/* 共用预览区 */}
				<PreviewArea />

				{/* 描述 */}
				<div>
					<label className='text-secondary mb-2 block text-sm font-medium'>描述（可选，应用于本次所有图片）</label>
					<textarea
						value={description}
						onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
						placeholder='这组图片的说明...'
						className='w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm focus:outline-none'
						rows={3}
					/>
				</div>

				{/* 操作按钮 */}
				<div className='mt-4 flex gap-3'>
					<button
						type='button'
						onClick={handleClose}
						className='flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm transition-colors hover:bg-gray-50'>
						取消
					</button>
					<button type='button' onClick={handleSubmit} className='brand-btn flex-1 justify-center px-4'>
						确认上传
					</button>
				</div>
			</div>
		</DialogModal>
	)
}