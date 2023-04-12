<template>
    <div class="fullScreen">
        <i
            class="iconfont toolBar-icon"
            :class="isFullscreen ? 'icon-quxiaoquanping' : 'icon-quanping'"
            @click="toggle"
        ></i>
    </div>
</template>

<script setup lang="ts">
import { useFullscreen } from '@vueuse/core';
const { isFullscreen, toggle } = useFullscreen();
</script>
<style lang="less" scoped></style>
