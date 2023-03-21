<template>
    <!-- 经典布局 -->
    <el-container>
        <el-aside>
            <div class="menu">
                <div class="logo" :style="{ width: isCollapse ? '65px' : '210px' }">
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
                        <SubMenu :menu-list="menuList" />
                    </el-menu>
                </el-scrollbar>
            </div>
        </el-aside>
        <el-container>
            <el-header>Header</el-header>
            <Main />
        </el-container>
    </el-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import SubMenu from '../components/menu/index.vue';
import Main from '../components/main/index.vue';
import DynamicRouter from '@/assets/json/dynamicRouter.json';

const route = useRoute();
// 获取菜单列表;
const getAuthMenuListApi = () => {
    return DynamicRouter;
};
const activeMenu = computed<any>(() =>
    route.meta.activeMenu ? route.meta.activeMenu : route.path
);

const isCollapse = ref(false);
const menuList = getAuthMenuListApi().data;
</script>
<style scoped lang="less">
@import './index.less';
</style>
