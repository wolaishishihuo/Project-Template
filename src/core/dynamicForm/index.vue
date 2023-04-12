<template>
    <el-form ref="formRef" :model="formData" :label-width="labelWidth" :rules="rules">
        <el-row>
            <template v-for="item in dynamicFormItems" :key="item.label">
                <el-col v-bind="colLayout">
                    <el-form-item
                        :label="item.label"
                        :style="itemStyle"
                        :prop="item.field"
                        v-if="!item.props || item.props?.hide"
                    >
                        <template v-if="item.type === 'input' || item.type === 'password'">
                            <el-input
                                :disabled="item.props?.disabled"
                                :placeholder="item.placeholder"
                                :show-password="item.type === 'password'"
                                v-model="formData[`${item.field}`]"
                            />
                        </template>
                        <template v-else-if="item.type === 'select'">
                            <el-select
                                :disabled="item.props?.disabled"
                                :placeholder="item.placeholder"
                                style="width: 100%"
                                v-model="formData[`${item.field}`]"
                            >
                                <el-option
                                    v-for="option in item.options"
                                    :key="option.value"
                                    :label="option.label"
                                    :value="option.value"
                                />
                            </el-select>
                        </template>
                    </el-form-item>
                </el-col>
            </template>
        </el-row>
    </el-form>
</template>

<script lang="ts" setup name="dynamicForm">
import { ref, toRefs, watch, computed } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { _cloneDeep } from '@/utils/common';
import type { FormItem } from './interface';
import { parseAllExpression } from './index';
import { useGlobalStore } from '@/store/module/global';
const globalStore = useGlobalStore();
const assemblySize = computed(() => globalStore.assemblySize);
const props = withDefaults(
    defineProps<{
        labelWidth: string;
        modelValue: Record<string, any>;
        colLayout: Record<string, any>;
        itemStyle: Record<string, any>;
        formItems: FormItem[];
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

const dynamicFormItems = ref();
const init = () => {
    dynamicFormItems.value = _cloneDeep(formItems.value);
    dynamicFormItems.value.forEach((schema: FormItem) => {
        Object.assign(schema, parseAllExpression(schema, formData.value));
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
