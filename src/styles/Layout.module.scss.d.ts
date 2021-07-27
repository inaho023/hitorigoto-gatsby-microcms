declare namespace LayoutModuleScssNamespace {
  export interface ILayoutModuleScss {
    bottom_wrapper: string
    container: string
    description: string
    float: string
    footer: string
    header: string
    main: string
    title: string
  }
}

declare const LayoutModuleScssModule: LayoutModuleScssNamespace.ILayoutModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: LayoutModuleScssNamespace.ILayoutModuleScss
}

export = LayoutModuleScssModule
