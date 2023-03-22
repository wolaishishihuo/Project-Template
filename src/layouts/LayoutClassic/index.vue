<template>
    <!-- 经典布局 -->
    <el-container class="layout">
        <el-aside>
            <div class="menu" :style="{ width: isCollapse ? '65px' : '210px' }">
                <div class="logo">
                    <img src="@/assets/images/logo.svg" alt="logo" />
                    <span v-show="!isCollapse">Jname Admin</span>
                </div>
                <el-scrollbar>
                    <el-menu
                        :default-active="activeMenu"
                        :router="false"
                        :collapse="isCollapse"
                        :collapse-transition="false"
                        :unique-opened="true"
                        background-color="#191a20"
                        text-color="#bdbdc0"
                        active-text-color="#ffffff"
                    >
                        <SubMenu :menuList="menuList" />
                    </el-menu>
                </el-scrollbar>
            </div>
        </el-aside>
        <el-container>
            <el-header>
                <ToolBarLeft />
                <!-- <ToolBarRight /> -->
            </el-header>
            <Main />
        </el-container>
    </el-container>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import SubMenu from '../components/menu/index.vue';
import Main from '../components/main/index.vue';
import ToolBarLeft from '../components/header/ToolBarLeft.vue';
import DynamicRouter from '@/assets/json/dynamicRouter.json';
import { useGlobalStore } from '@/store/global';
const globalStore = useGlobalStore();

const route = useRoute();
// 获取菜单列表;
const getAuthMenuListApi = () => {
    return DynamicRouter;
};
const activeMenu = computed<any>(() =>
    route.meta.activeMenu ? route.meta.activeMenu : route.path
);
const isCollapse = computed<boolean>(() => {
    return globalStore.themeConfig.isCollapse;
});

const menuList = getAuthMenuListApi().data;
</script>
<style scoped lang="less">
@import './index.less';
</style>
