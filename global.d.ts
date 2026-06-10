declare module 'motion/react' {
  import { MotionComponent, MotionProps } from 'motion';
  
  export const motion: {
    div: React.ForwardRefExoticComponent<MotionProps & React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
    [key: string]: React.ForwardRefExoticComponent<MotionProps & React.HTMLAttributes<HTMLElement> & React.RefAttributes<HTMLElement>>;
  };
  
  export const AnimatePresence: React.ComponentType<{
    children: React.ReactNode;
    initial?: boolean;
    onExitComplete?: () => void;
  }>;
}

declare module 'react' {
  // 更完整的React模块声明
  import * as ReactTypes from '@types/react';
  
  export = ReactTypes;
  export as namespace React;
}

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

declare module 'react/jsx-runtime' {
  export default any;
}

declare module 'react/jsx-dev-runtime' {
  export default any;
}

declare module '*.svg' {
	export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>
	export default ReactComponent
}
declare module '*.svg?url' {
	const content: StaticImageData

	export default content
}

declare type NullableNumber = string | number | null
declare type NullableObject = Record<string, any> | null
declare type NullableArray = Record<string, any>[] | null
declare type Nullable<T> = T | null
