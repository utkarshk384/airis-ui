export type BaseProps = {
    children?: React.ReactNode
} & React.SVGProps<SVGSVGElement>

export type IconWithBgProps = {
    bgColor?: string
    iconFill?: string
} & BaseProps