declare namespace MenubarModuleScssNamespace {
  export interface IMenubarModuleScss {
    menubar: string
    primary: string
    sub: string
    wrap: string
  }
}

declare const MenubarModuleScssModule: MenubarModuleScssNamespace.IMenubarModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: MenubarModuleScssNamespace.IMenubarModuleScss
}

export = MenubarModuleScssModule
