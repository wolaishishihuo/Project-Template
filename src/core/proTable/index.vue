<template>
    <el-table
        ref="tableRef"
        v-bind="$attrs"
        :border="border"
        :row-key="rowKey"
        :data="tableData"
        style="width: 100%"
    >
        <!-- 默认插槽 -->
        <slot></slot>
        <template v-for="item in tableColumns" :key="item">
            <!-- selection || index -->
            <el-table-column
                v-bind="item"
                :align="item.align ?? 'center'"
                :reserve-selection="item.type == 'selection'"
                v-if="item.type == 'selection' || item.type == 'index'"
            />
            <!-- expand 支持 tsx 语法 && 作用域插槽 (tsx > slot) -->
            <el-table-column
                v-bind="item"
                :align="item.align ?? 'center'"
                v-if="item.type == 'expand'"
                v-slot="scope"
            >
                <component :is="item.render" :row="scope.row" v-if="item.render" />
                <slot :name="item.type" :row="scope.row" v-else></slot>
            </el-table-column>
            <!-- other 循环递归 -->
            <TableColumn v-if="!item.type && item.prop && item.isShow" :column="item">
                <template v-for="slot in Object.keys($slots)" #[slot]="scope">
                    <slot :name="slot" :row="scope.row"></slot>
                </template>
            </TableColumn>
        </template>
        <!-- 插入表格最后一行之后的插槽 -->
        <template #append>
            <slot name="append"> </slot>
        </template>
    </el-table>
    <slot name="pagination">
        <Pagination
            v-if="pagination"
            :pageable="pageable"
            :handleSizeChange="handleSizeChange"
            :handleCurrentChange="handleCurrentChange"
        />
    </slot>
</template>

<script lang="ts" setup>
import { ref, provide, onMounted, watch } from 'vue';
import { ElTable, TableProps } from 'element-plus';
import { BreakPoint, ColumnProps } from './interface';
import { useTable } from '@/hooks/useTable';
import { handleProp } from './utils';
import Pagination from './components/Pagination.vue';
import TableColumn from './components/TableColumn.vue';

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
// 表格操作 Hooks
const {
    tableData,
    pageable,
    searchParam,
    searchInitParam,
    getTableList,
    search,
    reset,
    handleSizeChange,
    handleCurrentChange
} = useTable(props.requestApi, props.initParam, props.pagination, props.dataCallback);
// 初始化请求
onMounted(() => props.requestAuto && getTableList());
// 定义 enumMap 存储 enum 值（避免异步请求无法格式化单元格内容 || 无法填充搜索下拉选择）
const enumMap = ref(new Map<string, { [key: string]: any }[]>());
provide('enumMap', enumMap);
const setEnumMap = async (col: ColumnProps) => {
    if (!col.enum) return;
    // 如果当前 enum 为后台数据需要请求数据，则调用该请求接口，并存储到 enumMap, xxx!标识该值不可能为空
    if (typeof col.enum !== 'function') return enumMap.value.set(col.prop!, col.enum!);
    const { data } = await col.enum();
    enumMap.value.set(col.prop!, data);
};
// 清空选中数据列表
const clearSelection = () => tableRef.value!.clearSelection();
// 监听页面 initParam 改化，重新获取表格数据
watch(() => props.initParam, getTableList, { deep: true });

// 扁平化 columns
const flatColumnsFunc = (columns: ColumnProps[], flatArr: ColumnProps[] = []) => {
    columns.forEach(async col => {
        if (col._children?.length) flatArr.push(...flatColumnsFunc(col._children));
        flatArr.push(col);

        // 给每一项 column 添加 isShow && isFilterEnum 默认属性
        col.isShow = col.isShow ?? true;
        col.isFilterEnum = col.isFilterEnum ?? true;

        // 设置 enumMap
        setEnumMap(col);
    });
    return flatArr.filter(item => !item._children?.length);
};
const flatColumns = ref<ColumnProps[]>();
flatColumns.value = flatColumnsFunc(tableColumns.value);

// 过滤需要搜索的配置项
const searchColumns = flatColumns.value.filter(item => item.search?.el);
// 设置搜索表单排序默认值 && 设置搜索表单项的默认值 ---> ! 是 TypeScript 中的非空断言操作符，用于告诉编译器该属性不为 null 或 undefined，可以安全地进行访问。
searchColumns.forEach((column, index) => {
    column.search!.order = column.search!.order ?? index + 2;
    if (column.search?.defaultValue !== undefined && column.search?.defaultValue !== null) {
        searchInitParam.value[column.search.key ?? handleProp(column.prop!)] =
            column.search?.defaultValue;
        searchParam.value[column.search.key ?? handleProp(column.prop!)] =
            column.search?.defaultValue;
    }
});
// 排序搜索表单项
searchColumns.sort((a, b) => a.search!.order! - b.search!.order!);

// 暴露给父组件的参数和方法(外部需要什么，都可以从这里暴露出去)
defineExpose({
    element: tableRef,
    tableData,
    searchParam,
    pageable,
    getTableList,
    reset,
    clearSelection,
    enumMap
    // isSelected,
    // selectedList,
    // selectedListIds
});
</script>
