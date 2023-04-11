export type LayoutType = 'vertical' | 'classic' | 'transverse' | 'columns';
/* GlobalState */
export interface GlobalState {
    token: string;
    userInfo: any;
    assemblySize: AssemblySizeType;
    language: string;
    themeConfig: ThemeConfigProps;
}
export type AssemblySizeType = 'default' | 'small' | 'large';

/* themeConfigProp */
export interface ThemeConfigProps {
    maximize: boolean;
    layout: LayoutType;
    primary: string;
    isDark: boolean;
    isGrey: boolean;
    isCollapse: boolean;
    isWeak: boolean;
    breadcrumb: boolean;
    breadcrumbIcon: boolean;
    tabs: boolean;
    tabsIcon: boolean;
    footer: boolean;
}

/* AuthState */
export interface AuthState {
    routeName: string;
    authButtonList: {
        [key: string]: string[];
    };
    authMenuList: Menu.MenuOptions[];
}
/* tabsMenuProps */
export interface TabsMenuProps {
    icon: string;
    title: string;
    path: string;
    name: string;
    close: boolean;
}
/* TabsState */
export interface TabsState {
    tabsMenuList: TabsMenuProps[];
}
