<template>
    <div class="toolBarLeft">
        <CollapseIcon />
        <Breadcrumb />
    </div>
</template>

<script setup lang="ts">
import CollapseIcon from './component/CollapseIcon.vue';
import Breadcrumb from './component/Breadcrumb.vue';
</script>
<style scoped lang="less">
.toolBarLeft {
    display: flex;
    align-items: center;
}
</style>
