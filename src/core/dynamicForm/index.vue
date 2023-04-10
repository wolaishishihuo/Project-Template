<template>
    <el-form ref="formRef" :model="formData" :label-width="labelWidth" :rules="rules">
        <el-row>
            <template v-for="item in dynamicFormItems" :key="item.label">
                <el-col v-bind="colLayout">
                    <el-form-item
                        :label="item.label"
                        :style="itemStyle"
                        :prop="item.field"
                        v-if="!item.hide"
                    >
                        <template v-if="item.type === 'input' || item.type === 'password'">
                            <el-input
                                :placeholder="item.placeholder"
                                :show-password="item.type === 'password'"
                                v-model="formData[`${item.field}`]"
                            />
                        </template>
                        <template v-else-if="item.type === 'select'">
                            <el-select
                                :placeholder="item.placeholder"
                                style="width: 100%"
                                v-model="formData[`${item.field}`]"
                            >
                                <el-option
                                    v-for="option in item.options"
                                    :key="option.value"
                                    :value="option.value"
                                >
                                    {{ option.label }}
                                </el-option>
                            </el-select>
                        </template>
                        <template v-else-if="item.type === 'datepicker'">
                            <el-date-picker
                                v-bind="item.otherOptions"
                                v-model="formData[`${item.field}`]"
                            />
                        </template>
                    </el-form-item>
                </el-col>
            </template>
        </el-row>
    </el-form>
</template>

<script lang="ts" setup name="dynamicForm">
import { ref, toRefs, watch } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { _cloneDeep } from '@/utils/common';
const props = withDefaults(
    defineProps<{
        labelWidth: string;
        modelValue: Record<string, any>;
        colLayout: Record<string, any>;
        itemStyle: Record<string, any>;
        formItems: any[];
        rules: FormRules;
    }>(),
    {
        labelWidth: '120px',
        itemStyle: () => ({ padding: '10px 4px' }),
        rules: () => ({}),
        colLayout: () => ({
            xl: 6,
            lg: 8,
            md: 12,
            sm: 24,
            xs: 24
        })
    }
);
const emits = defineEmits<{ (e: 'update:modelValue', state: Record<string, any>): void }>();
const { modelValue, labelWidth, formItems } = toRefs(props);
const formRef = ref<FormInstance>();
const formData = ref({ ...modelValue.value });

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
const dynamicFormItems = ref();
const init = () => {
    dynamicFormItems.value = _cloneDeep(formItems.value);
    dynamicFormItems.value.forEach(schema => {
        Object.keys(schema).forEach(key => {
            const value = schema[key];
            if (isExpression(value)) {
                schema[key] = !parseExpression(value, formData.value);
            }
        });
    });
};
init();
watch(
    () => formData.value,
    newValue => {
        init();
        emits('update:modelValue', newValue);
    },
    {
        deep: true
    }
);
</script>
