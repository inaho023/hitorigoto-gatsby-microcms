declare namespace ProfileModuleScssNamespace {
  export interface IProfileModuleScss {
    image: string
    post: string
    title: string
    wrapper: string
  }
}

declare const ProfileModuleScssModule: ProfileModuleScssNamespace.IProfileModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: ProfileModuleScssNamespace.IProfileModuleScss
}

export = ProfileModuleScssModule
