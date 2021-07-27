declare namespace ArchiveMenuModuleScssNamespace {
  export interface IArchiveMenuModuleScss {
    dropdown: string
    dropdown_menu: string
    hideAnimation: string
    icon: string
    showAnimation: string
    title: string
    wrapper: string
  }
}

declare const ArchiveMenuModuleScssModule: ArchiveMenuModuleScssNamespace.IArchiveMenuModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: ArchiveMenuModuleScssNamespace.IArchiveMenuModuleScss
}

export = ArchiveMenuModuleScssModule
