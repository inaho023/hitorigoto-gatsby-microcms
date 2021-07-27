declare namespace ShareButtonModuleScssNamespace {
  export interface IShareButtonModuleScss {
    button: string
    share: string
  }
}

declare const ShareButtonModuleScssModule: ShareButtonModuleScssNamespace.IShareButtonModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: ShareButtonModuleScssNamespace.IShareButtonModuleScss
}

export = ShareButtonModuleScssModule
