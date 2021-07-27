declare namespace TagCloudModuleScssNamespace {
  export interface ITagCloudModuleScss {
    icon: string
    tagcloud: string
    title: string
    wrapper: string
  }
}

declare const TagCloudModuleScssModule: TagCloudModuleScssNamespace.ITagCloudModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: TagCloudModuleScssNamespace.ITagCloudModuleScss
}

export = TagCloudModuleScssModule
