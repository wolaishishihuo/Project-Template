<template>
    <component :is="LayoutComponents[layout]" />
    <ThemeDrawer />
</template>

<script setup lang="ts">
import { computed, type Component } from 'vue';
import layoutClassic from '@/layouts/LayoutClassic/index.vue';
import layoutTransverse from '@/layouts/LayoutTransverse/index.vue';
import LayoutColumns from '@/layouts/LayoutColumns/index.vue';
import layoutVertical from '@/layouts/LayoutVertical/index.vue';
import ThemeDrawer from '@/layouts/components/themeDrawer/index.vue';
import { useGlobalStore } from '@/store/module/global';

const LayoutComponents: { [key: string]: Component } = {
    classic: layoutClassic,
    transverse: layoutTransverse,
    vertical: layoutVertical,
    columns: LayoutColumns
};
const globalStore = useGlobalStore();
const layout = computed(() => globalStore.layout);
</script>
<style scoped lang="less"></style>
