<template>
    <div class="layout-search-dialog">
        <i class="iconfont icon-nav_serch_icon toolBar-icon" @click="openSerch"></i>
    </div>
</template>

<script setup lang="ts">
const openSerch = () => {};
</script>
<style scoped lang="less">
/* 菜单搜索样式 */
.layout-search-dialog {
    :deep(.el-dialog) {
        background: rgb(0 0 0 / 50%);
        border-radius: 0 !important;
        box-shadow: unset !important;
        .el-dialog__header {
            border-bottom: none !important;
        }
    }
    :deep(.el-autocomplete) {
        position: absolute;
        top: 100px;
        left: 50%;
        width: 550px;
        transform: translateX(-50%);
        .el-input__wrapper {
            background-color: var(--el-bg-color);
        }
    }
}
.el-autocomplete__popper {
    .el-icon {
        position: relative;
        top: 2px;
        font-size: 16px;
    }
    span {
        margin: 0 0 0 10px;
        font-size: 14px;
    }
}
</style>
