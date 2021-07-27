declare namespace CategoryMenuModuleScssNamespace {
  export interface ICategoryMenuModuleScss {
    dropdown: string
    dropdown_menu: string
    hideAnimation: string
    icon: string
    showAnimation: string
    title: string
    wrapper: string
  }
}

declare const CategoryMenuModuleScssModule: CategoryMenuModuleScssNamespace.ICategoryMenuModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: CategoryMenuModuleScssNamespace.ICategoryMenuModuleScss
}

export = CategoryMenuModuleScssModule
