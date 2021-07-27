declare namespace PostModuleScssNamespace {
  export interface IPostModuleScss {
    box: string
    card: string
    content_wrapper: string
    gallery: string
    icon: string
    image: string
    image_wrapper: string
    info_wrapper: string
    navi: string
    nocard: string
    pagetitle: string
    post: string
    text: string
    text_wrapper: string
    title: string
    wrapper: string
  }
}

declare const PostModuleScssModule: PostModuleScssNamespace.IPostModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: PostModuleScssNamespace.IPostModuleScss
}

export = PostModuleScssModule
