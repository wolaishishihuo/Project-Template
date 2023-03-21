<template>
    <component :is="LayoutComponents['classic']" />
</template>

<script setup lang="ts">
import layoutClassic from '@/layouts/LayoutClassic/index.vue';
const LayoutComponents = {
    classic: layoutClassic
};
</script>
<style scoped lang="less"></style>
