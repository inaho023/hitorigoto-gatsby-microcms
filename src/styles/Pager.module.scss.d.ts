declare namespace PagerModuleScssNamespace {
  export interface IPagerModuleScss {
    current: string
    page: string
    pager: string
    pager_wrapper: string
  }
}

declare const PagerModuleScssModule: PagerModuleScssNamespace.IPagerModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: PagerModuleScssNamespace.IPagerModuleScss
}

export = PagerModuleScssModule
