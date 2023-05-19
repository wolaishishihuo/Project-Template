<template>
    <div class="toolBarLeft">
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
.toolBarLeft {
    display: flex;
    align-items: center;
}
</style>
