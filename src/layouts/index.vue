<template>
    <component :is="LayoutComponents['classic']" />
    <ThemeDrawer />
</template>

<script setup lang="ts">
import layoutClassic from '@/layouts/LayoutClassic/index.vue';
import ThemeDrawer from '@/layouts/components/themeDrawer/index.vue';
const LayoutComponents = {
    classic: layoutClassic
};
</script>
<style scoped lang="less"></style>
