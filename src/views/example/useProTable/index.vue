<template>
    <div class="proTable">
        <h1>自定义封装可搜索表格</h1>
        <hr />
        <ProTable
            ref="proTable"
            title="用户列表"
            :columns="columns"
            :requestApi="getTableList"
            :initParam="initParam"
            :dataCallback="dataCallback"
        >
            <template #usernameHeader="scope">
                <el-button
                    type="primary"
                    @click="ElMessage.success('我是通过作用域插槽渲染的表头')"
                >
                    {{ scope.row.label }}
                </el-button>
            </template>
            <!-- createTime -->
            <template #createTime="scope">
                <el-button
                    type="primary"
                    link
                    @click="ElMessage.success('我是通过作用域插槽渲染的内容')"
                >
                    {{ scope.row.createTime }}
                </el-button>
            </template>
            <template #expand="scope">
                {{ scope.row }}
            </template>
        </ProTable>
    </div>
</template>

<script setup lang="tsx" name="useProTable">
import { ref } from 'vue';
import ProTable from '@/core/proTable/index.vue';
import { ColumnProps } from '@/core/proTable/interface';
import { ElMessage } from 'element-plus';

const proTable = ref();
const initParam = ref({ type: 1 });
const dataCallback = (data: any) => {
    return {
        list: data.list,
        total: data.total,
        pageNum: data.pageNum,
        pageSize: data.pageSize
    };
};
const getTableList = () => {
    return new Promise((resolve, _reject) => {
        resolve({
            data: {
                list: [
                    {
                        id: 1,
                        username: '测试1',
                        user: {
                            detail: {
                                age: 20
                            }
                        }
                    },
                    {
                        id: 2,
                        username: '测试2',
                        createTime: '1'
                    }
                ]
            }
        });
    });
};
// 表格配置项
const columns: ColumnProps<any>[] = [
    { type: 'selection', fixed: 'left', width: 80 },
    { type: 'index', label: '#', width: 80 },
    { type: 'expand', label: 'Expand', width: 100 },
    {
        prop: 'username',
        label: '用户姓名',
        search: { el: 'input' },
        render: scope => {
            return (
                <el-button
                    type="primary"
                    link
                    onClick={() => ElMessage.success('我是通过 tsx 语法渲染的内容')}
                >
                    {scope.row.username}
                </el-button>
            );
        }
    },
    {
        prop: 'gender',
        label: '性别',
        // 字典数据
        // enum: genderType,
        enum: [],
        search: { el: 'select', props: { filterable: true } },
        fieldNames: { label: 'genderLabel', value: 'genderValue' }
    },
    // 多级 prop
    { prop: 'user.detail.age', label: '年龄', search: { el: 'input' } },
    { prop: 'idCard', label: '身份证号', search: { el: 'input' } },
    { prop: 'email', label: '邮箱' },
    { prop: 'address', label: '居住地址' },
    {
        prop: 'status',
        label: '用户状态',
        enum: [],
        search: { el: 'tree-select', props: { filterable: true } },
        fieldNames: { label: 'userLabel', value: 'userStatus' }
    },
    {
        prop: 'createTime',
        label: '创建时间',
        headerRender: row => {
            return (
                <el-button
                    onClick={() => {
                        ElMessage.success('学习 tsx 语法渲染');
                    }}
                    type="primary"
                >
                    {row.label}
                </el-button>
            );
        },
        width: 180,
        search: {
            el: 'date-picker',
            span: 2,
            props: { type: 'datetimerange', valueFormat: 'YYYY-MM-DD HH:mm:ss' },
            defaultValue: ['2022-11-12 11:35:00', '2022-12-12 11:35:00']
        }
    },
    { prop: 'operation', label: '操作', fixed: 'right', width: 330 }
];
</script>
<style scoped lang="less"></style>
