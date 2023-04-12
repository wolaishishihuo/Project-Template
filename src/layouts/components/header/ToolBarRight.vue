<template>
    <div class="tool-bar-ri">
        <div class="header-icon">
            <AssemblySize id="assemblySize" />
            <SearchMenu id="searchMenu" />
            <ThemeSetting id="themeSetting" />
            <Fullscreen id="fullscreen" />
        </div>
        <span class="username">贾志刚</span>
        <Avatar />
    </div>
</template>

<script setup lang="ts">
import SearchMenu from './component/SearchMenu.vue';
import ThemeSetting from './component/ThemeSetting.vue';
import AssemblySize from './component/AssemblySize.vue';
import Avatar from './component/Avatar.vue';
import Fullscreen from './component/FullScreen.vue';
</script>

<style scoped lang="less">
.tool-bar-ri {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 30px 0 0;
    .header-icon {
        display: flex;
        align-items: center;

        & > * {
            height: 20px;
            margin-left: 21px;
        }
        :deep(.toolBar-icon) {
            color: var(--light-ft-color);
            font-size: 20px;
            cursor: pointer;
        }
    }
    .username {
        color: var(--light-ft-color);
        margin: 0 20px;
        font-size: 15px;
    }
}
</style>
