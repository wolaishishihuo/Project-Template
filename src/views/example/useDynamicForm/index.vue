<template>
    <div class="dynamicForm">
        <h1 class="title">自定义封装 Form表单</h1>
        <dynamicForm
            v-model="formData"
            :form-items="formItems"
            :rules="rules"
            :colLayout="{ span: 24 }"
        />
    </div>
    <component :is="`el-input`" />
</template>

<script setup lang="ts" name="useDynamicForm">
import { ref, watch, reactive } from 'vue';
import dynamicForm from '@/core/dynamicForm/index.vue';

const formItems = [
    {
        field: 'id',
        type: 'input',
        placeholder: '测试组件:输入2',
        label: 'id'
    },
    {
        field: 'age',
        type: 'select',
        placeholder: '测试组件:选择30',
        label: 'age',
        options: [
            {
                value: '1',
                label: '20'
            },
            {
                value: '2',
                label: '30'
            }
        ]
    },
    {
        field: 'a',
        type: 'input',
        placeholder: '测试组件',
        label: 'a',
        props: {
            hide: '{{formData.id == 2 }}',
            disabled: '{{formData.age == 2 }}'
        }
    }
];
const formData = ref({
    id: ''
});
const validatePass2 = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('Please input the password again'));
    } else {
        callback();
    }
};
const rules = reactive({
    id: [{ required: true, validator: validatePass2, trigger: 'blur' }],
    age: [{ validator: validatePass2, trigger: 'blur' }]
});

watch(
    () => formData.value,
    newValue => {
        console.log(newValue);
    },
    {
        deep: true
    }
);
</script>
<style scoped lang="less">
.title {
    color: var(--light-ft-color);
}
</style>
