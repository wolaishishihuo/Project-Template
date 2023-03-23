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
