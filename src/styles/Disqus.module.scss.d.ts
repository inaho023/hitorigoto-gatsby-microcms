declare namespace DisqusModuleScssNamespace {
  export interface IDisqusModuleScss {
    disqus: string
  }
}

declare const DisqusModuleScssModule: DisqusModuleScssNamespace.IDisqusModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: DisqusModuleScssNamespace.IDisqusModuleScss
}

export = DisqusModuleScssModule
