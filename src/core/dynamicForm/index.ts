import { _cloneDeep } from '@/utils/common';
import { isArray, isObject } from '@/utils/is';
// 模仿 x-render的回显方式
const isExpression = (str: string) => {
    if (typeof str !== 'string') {
        return false;
    }
    const pattern = /^{\s*{(.+)}\s*}$/;
    const reg1 = /^{\s*{function\(.+}\s*}$/;
    return str.match(pattern) && !str.match(reg1);
};

const parseExpression = (func: any, formData = {}) => {
    if (typeof func === 'string') {
        const funcBody = func.replace(/^{\s*{/g, '').replace(/}\s*}$/g, '');
        const funcStr = `
      return ${funcBody.replace(/formData/g, JSON.stringify(formData))}
    `;
        try {
            const result = Function(funcStr)();
            return result;
        } catch (error) {
            console.log(error, func);
            return null; // 如果计算有错误，return null 最合适
        }
    }
};
export const parseAllExpression = (_schema: any, _formData: any) => {
    const schema = _cloneDeep(_schema);
    const formData = _formData;
    const recursionArray = (list: any[]): any[] => {
        const result = list.map(item => {
            if (isArray(item)) {
                return recursionArray(item);
            }
            if (isObject(item)) {
                return parseAllExpression(item, formData);
            }

            if (isExpression(item)) {
                return parseExpression(item, formData);
            }
            return item;
        });
        return result;
    };

    Object.keys(schema).forEach(key => {
        const value = schema[key];
        if (isArray(value)) {
            schema[key] = recursionArray(value);
        }
        if (isObject(value)) {
            schema[key] = parseAllExpression(value, formData);
        } else if (isExpression(value)) {
            schema[key] = parseExpression(value, formData);
        } else if (typeof key === 'string' && key.toLowerCase().indexOf('props') > -1) {
            // 有可能叫 xxxProps
            const propsObj = schema[key];
            if (isObject(propsObj)) {
                Object.keys(propsObj).forEach(k => {
                    schema[key][k] = parseExpression(propsObj[k], _formData);
                });
            }
        }
    });
    return schema;
};
