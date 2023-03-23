export type LayoutType = 'vertical' | 'classic' | 'transverse' | 'columns';
export interface ThemeConfigProps {
    isCollapse: boolean;
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
