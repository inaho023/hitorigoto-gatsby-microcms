declare namespace GalleryModuleScssNamespace {
  export interface IGalleryModuleScss {
    gallery: string
    icon: string
    image_box: string
    image_wrapper: string
    text: string
  }
}

declare const GalleryModuleScssModule: GalleryModuleScssNamespace.IGalleryModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: GalleryModuleScssNamespace.IGalleryModuleScss
}

export = GalleryModuleScssModule
