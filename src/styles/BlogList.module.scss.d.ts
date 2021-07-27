declare namespace BlogListModuleScssNamespace {
  export interface IBlogListModuleScss {
    category: string
    date: string
    grid: string
    image: string
    list_title: string
    title: string
    wrapper: string
  }
}

declare const BlogListModuleScssModule: BlogListModuleScssNamespace.IBlogListModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: BlogListModuleScssNamespace.IBlogListModuleScss
}

export = BlogListModuleScssModule
