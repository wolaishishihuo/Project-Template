<template>
    <div class="tool-bar-lf">
        <CollapseIcon id="collapseIcon" />
        <Breadcrumb id="breadcrumb" v-if="breadcrumb" />
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import CollapseIcon from './component/CollapseIcon.vue';
import Breadcrumb from './component/Breadcrumb.vue';
import { useGlobalStore } from '@/store/module/global';
const globalStore = useGlobalStore();
const breadcrumb = computed(() => globalStore.breadcrumb);
</script>
<style scoped lang="less">
.tool-bar-lf {
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    white-space: nowrap;
}
</style>
