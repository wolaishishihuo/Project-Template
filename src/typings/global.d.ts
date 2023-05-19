// * Menu
declare namespace Menu {
    interface MenuOptions {
        path: string;
        name: string;
        component?: string | (() => Promise<any>);
        redirect?: string;
        meta: MetaProps;
        children?: MenuOptions[];
    }
    interface MetaProps {
        icon: string;
        title: string;
        activeMenu?: string;
        isLink?: string;
        isHide: boolean;
        isFull: boolean;
        isAffix: boolean;
        isKeepAlive: boolean;
    }
}
/* Vite */
declare interface ViteEnv {
    VITE_USER_NODE_ENV: 'development' | 'production' | 'test';
    VITE_GLOB_APP_TITLE: string;
    VITE_PORT: number;
    VITE_OPEN: boolean;
    VITE_REPORT: boolean;
    VITE_BUILD_COMPRESS: 'gzip' | 'brotli' | 'gzip,brotli' | 'none';
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE: boolean;
    VITE_DROP_CONSOLE: boolean;
    VITE_PUBLIC_PATH: string;
    VITE_API_URL: string;
    VITE_PROXY: [string, string][];
}
declare type Recordable<T = any> = Record<string, T>;
/* __APP_INFO__ */
declare const __APP_INFO__: {
    pkg: {
        name: string;
        version: string;
        dependencies: Recordable<string>;
        devDependencies: Recordable<string>;
    };
    lastBuildTime: string;
};
declare module 'sortablejs';
/* Generic Tools */
type ObjToKeyValUnion<T> = {
    [K in keyof T]: { key: K; value: T[K] };
}[keyof T];

type ObjToKeyValArray<T> = {
    [K in keyof T]: [K, T[K]];
}[keyof T];
