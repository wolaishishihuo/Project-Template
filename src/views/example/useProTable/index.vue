<template>
    <div class="proTable">
        <h1>自定义封装可搜索表格</h1>
        <hr />
        <ProTable ref="proTable" title="用户列表" />
    </div>
</template>

<script setup lang="ts" name="useProTable">
import ProTable from '@/core/proTable/index.vue';
</script>
<style scoped lang="less"></style>
