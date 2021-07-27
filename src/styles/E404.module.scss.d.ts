declare namespace E404ModuleScssNamespace {
  export interface IE404ModuleScss {
    post: string
  }
}

declare const E404ModuleScssModule: E404ModuleScssNamespace.IE404ModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: E404ModuleScssNamespace.IE404ModuleScss
}

export = E404ModuleScssModule
