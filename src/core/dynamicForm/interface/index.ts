export interface FormItem {
    field: string;
    type: string;
    placeholder: string;
    label: string;
    props?: Props;
    options?: Options[];
    [key: string]: any;
}

interface Props {
    hide?: string;
    disabled?: string;
}
interface Options {
    value: string;
    label: string;
}
