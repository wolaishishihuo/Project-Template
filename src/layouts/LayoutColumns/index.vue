<!-- 分栏布局 -->
<template>
    <el-container class="layout">
        <div class="aside-split">
            <div class="logo flx-center">
                <img class="logo-img" src="@/assets/images/logo.svg" alt="logo" />
            </div>
            <el-scrollbar>
                <div class="split-list">
                    <div
                        class="split-item"
                        :class="{
                            'split-active':
                                splitActive === item.path ||
                                `/${splitActive.split('/')[1]}` === item.path
                        }"
                        v-for="item in menuList"
                        :key="item.path"
                        @click="changeSubMenu(item)"
                    >
                        <el-icon>
                            <component :is="item.meta.icon" />
                        </el-icon>
                        <span class="title">{{ item.meta.title }}</span>
                    </div>
                </div>
            </el-scrollbar>
        </div>
        <el-aside
            :class="{ 'not-aside': !subMenuList.length }"
            :style="{ width: isCollapse ? '65px' : '210px' }"
        >
            <div class="logo flx-center">
                <span class="logo-text" v-show="subMenuList.length">{{
                    isCollapse ? 'G' : 'Jname Admin'
                }}</span>
            </div>
            <el-scrollbar>
                <el-menu
                    :default-active="activeMenu"
                    :router="false"
                    :collapse="isCollapse"
                    :collapse-transition="false"
                    :unique-opened="true"
                >
                    <SubMenu :menuList="subMenuList" />
                </el-menu>
            </el-scrollbar>
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

<script setup lang="ts" name="layoutColumns">
import { ref, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useGlobalStore } from '@/store/module/global';
import { useAuthStore } from '@/store/module/auth';
import SubMenu from '../components/menu/index.vue';
import Main from '../components/main/index.vue';
import ToolBarLeft from '../components/header/ToolBarLeft.vue';
import ToolBarRight from '../components/header/ToolBarRight.vue';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const globalStore = useGlobalStore();
const isCollapse = computed(() => globalStore.isCollapse);

const menuList = computed(() => authStore.showMenuListGet);
const activeMenu = computed(
    () => (route.meta.activeMenu ? route.meta.activeMenu : route.path) as string
);

const subMenuList = ref<Menu.MenuOptions[]>([]);
const splitActive = ref('');
watch(
    () => [menuList, route],
    () => {
        // 当前菜单没有数据直接 return
        if (!menuList.value.length) return;
        splitActive.value = route.path;
        const menuItem = menuList.value.filter((item: Menu.MenuOptions) => {
            return route.path === item.path || `/${route.path.split('/')[1]}` === item.path;
        });
        console.log(menuItem);

        if (menuItem[0].children?.length) return (subMenuList.value = menuItem[0].children);
        subMenuList.value = [];
    },
    {
        deep: true,
        immediate: true
    }
);

// change SubMenu
const changeSubMenu = (item: Menu.MenuOptions) => {
    splitActive.value = item.path;
    if (item.children?.length) return (subMenuList.value = item.children);
    subMenuList.value = [];
    router.push(item.path);
};
</script>

<style scoped lang="less">
@import './index.less';
</style>
