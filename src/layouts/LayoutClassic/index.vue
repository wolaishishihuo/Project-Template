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
                <div></div>
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
import { useGlobalStore } from '@/store/module/global';
import { useAuthStore } from '@/store/module/auth';
const globalStore = useGlobalStore();
const authStore = useAuthStore();
// 没有login页面 所以这里获取菜单
authStore.getAuthMenuList();

const route = useRoute();
const activeMenu = computed<any>(() =>
    route.meta.activeMenu ? route.meta.activeMenu : route.path
);
const isCollapse = computed<boolean>(() => {
    return globalStore.themeConfig.isCollapse;
});
const menuList = computed(() => {
    return authStore.showMenuListGet;
});
</script>
<style scoped lang="less">
@import './index.less';
</style>
