<template>
    <el-table
        ref="tableRef"
        v-bind="$attrs"
        :border="border"
        :row-key="rowKey"
        :data="[]"
        style="width: 100%"
    >
        <el-table-column prop="date" label="Date" width="180" />
        <el-table-column prop="name" label="Name" width="180" />
        <el-table-column prop="address" label="Address" />
    </el-table>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { ElTable, TableProps } from 'element-plus';
import { BreakPoint, ColumnProps } from './interface';

interface ProTableProps extends Partial<Omit<TableProps<any>, 'data'>> {
    columns: ColumnProps[]; // 列配置项
    requestApi: (params: any) => Promise<any>; // 请求表格数据的api ==> 必传
    requestAuto?: boolean;
    dataCallback?: (data: any) => any; // 返回数据的回调函数，可以对数据进行处理 ==> 非必传
    title?: string; // 表格标题，目前只在打印的时候用到 ==> 非必传
    pagination?: boolean; // 是否需要分页组件 ==> 非必传（默认为true）
    initParam?: any; // 初始化请求参数 ==> 非必传（默认为{}）
    border?: boolean; // 是否带有纵向边框 ==> 非必传（默认为true）
    toolButton?: boolean; // 是否显示表格功能按钮 ==> 非必传（默认为true）
    rowKey?: string; // 行数据的 Key，用来优化 Table 的渲染，当表格数据多选时，所指定的 id ==> 非必传（默认为 id）
    searchCol?: number | Record<BreakPoint, number>; // 表格搜索项 每列占比配置 ==> 非必传 { xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }
}
// 接受父组件参数，配置默认值
const props = withDefaults(defineProps<ProTableProps>(), {
    requestAuto: true,
    columns: () => [],
    pagination: true,
    initParam: {},
    border: true,
    toolButton: true,
    rowKey: 'id',
    searchCol: () => ({ xs: 1, sm: 2, md: 2, lg: 3, xl: 4 })
});

// 是否显示搜索模块
const isShowSearch = ref(true);

// 表格 DOM 元素
const tableRef = ref<InstanceType<typeof ElTable>>();
// 接收 columns 并设置为响应式
const tableColumns = ref<ColumnProps[]>(props.columns);
</script>
