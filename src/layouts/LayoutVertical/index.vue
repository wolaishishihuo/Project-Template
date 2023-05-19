<!-- 纵向布局 -->
<template>
    <el-container class="layout">
        <el-aside>
            <div class="aside-box" :style="{ width: isCollapse ? '65px' : '210px' }">
                <div class="logo flx-center">
                    <img class="logo-img" src="@/assets/images/logo.svg" alt="logo" />
                    <span class="logo-text" v-show="!isCollapse">Geeker Admin</span>
                </div>
                <el-scrollbar>
                    <el-menu
                        :default-active="activeMenu"
                        :collapse="isCollapse"
                        :router="false"
                        :unique-opened="true"
                        :collapse-transition="false"
                    >
                        <SubMenu :menuList="menuList" />
                    </el-menu>
                </el-scrollbar>
            </div>
        </el-aside>
        <el-container>
            <el-header>
                <ToolBarLeft />
                <ToolBarRight />
            </el-header>
            <Main />
        </el-container>
    </el-container>
</template>

<script setup lang="ts" name="layoutVertical">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useGlobalStore } from '@/store/module/global';
import { useAuthStore } from '@/store/module/auth';
import SubMenu from '../components/menu/index.vue';
import Main from '../components/main/index.vue';
import ToolBarLeft from '../components/header/ToolBarLeft.vue';
import ToolBarRight from '../components/header/ToolBarRight.vue';

const route = useRoute();
const authStore = useAuthStore();
const globalStore = useGlobalStore();
const isCollapse = computed(() => globalStore.isCollapse);
const menuList = computed(() => authStore.showMenuListGet);
const activeMenu = computed(
    () => (route.meta.activeMenu ? route.meta.activeMenu : route.path) as string
);
</script>

<style scoped lang="less">
@import './index.less';
</style>
