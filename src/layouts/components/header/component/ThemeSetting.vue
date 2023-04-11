<template>
    <div class="theme-setting">
        <!-- <svg-icon
            class="toolBar-icon"
            @click="openDrawer"
            name="setting"
            :iconStyle="{ width: '20px', height: '20px' }"
        /> -->
        <i class="iconfont icon-shezhi toolBar-icon" @click="openDrawer"></i>
    </div>
</template>

<script setup lang="ts">
import mittBus from '@/utils/mittBus';
const openDrawer = () => {
    mittBus.emit('openThemeDrawer');
};
</script>
<style lang="less" scoped>
.theme-setting {
    height: 20px;
    .toolBar-icon {
        font-size: 20px;
        cursor: pointer;
    }
}
</style>
