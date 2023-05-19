<template>
    <component :is="LayoutComponents[layout]" />
    <ThemeDrawer />
</template>

<script setup lang="ts">
import { computed, type Component } from 'vue';
import layoutClassic from '@/layouts/LayoutClassic/index.vue';
import layoutTransverse from '@/layouts/LayoutTransverse/index.vue';
import ThemeDrawer from '@/layouts/components/themeDrawer/index.vue';
import { useGlobalStore } from '@/store/module/global';

const LayoutComponents: { [key: string]: Component } = {
    classic: layoutClassic,
    transverse: layoutTransverse
};
const globalStore = useGlobalStore();
const layout = computed(() => globalStore.layout);
console.log(layout.value);
</script>
<style scoped lang="less"></style>
