<template>
    <div class="tabs-box">
        <div class="tabs-menu">
            <el-tabs
                v-model="tabsMenuValue"
                type="card"
                @tab-click="tabClick"
                @tab-remove="tabRemove"
            >
                <el-tab-pane
                    v-for="item in tabsMenuList"
                    :key="item.path"
                    :label="item.title"
                    :name="item.path"
                    :closable="item.close"
                >
                    <template #label>
                        <el-icon class="tabs-icon" v-show="item.icon && themeConfig.tabsIcon">
                            <component :is="item.icon" />
                        </el-icon>
                        {{ item.title }}
                    </template>
                </el-tab-pane>
            </el-tabs>
            <MoreButton />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import Sortable from 'sortablejs';
import { useRoute, useRouter } from 'vue-router';
import { useTabStore } from '@/store/module/tabs';
import { useAuthStore } from '@/store/module/auth';
import MoreButton from './MoreButton.vue';
import { TabsPaneContext, TabPaneName } from 'element-plus';
import { useGlobalStore } from '@/store/module/global';
const globalStore = useGlobalStore();
const themeConfig = computed(() => globalStore.themeConfig);
const route = useRoute();
const router = useRouter();
const tabStore = useTabStore();
const authStore = useAuthStore();
const tabsMenuList = computed(() => tabStore.tabsMenuList);

const tabsMenuValue = ref(route.fullPath);

// Tab Click
const tabClick = (tabItem: TabsPaneContext) => {
    const fullPath = tabItem.props.name as string;
    router.push(fullPath);
};

// Remove Tab
const tabRemove = (fullPath: TabPaneName) => {
    // const name = tabStore.tabsMenuList.filter(item => item.path == fullPath)[0].name || '';
    // keepAliveStore.removeKeepAliveName(name);
    tabStore.removeTabs(fullPath as string, fullPath == route.fullPath);
};

// 监听路由的变化（防止浏览器后退/前进不变化 tabsMenuValue）
watch(
    () => route.fullPath,
    () => {
        if (route.meta.isFull) return;
        tabsMenuValue.value = route.fullPath;
        const tabsParams = {
            icon: route.meta.icon as string,
            title: route.meta.title as string,
            path: route.fullPath,
            name: route.name as string,
            close: !route.meta.isAffix
        };
        tabStore.addTabs(tabsParams);
        // route.meta.isKeepAlive && keepAliveStore.addKeepAliveName(route.name as string);
    },
    {
        immediate: true
    }
);
// 初始化需要固定的标签
const initTabs = () => {
    authStore.flatMenuListGet.forEach(item => {
        if (item.meta.isAffix && !item.meta.isHide && !item.meta.isFull) {
            const tabsParams = {
                icon: item.meta.icon,
                title: item.meta.title,
                path: item.path,
                name: item.name,
                close: !item.meta.isAffix
            };
            tabStore.addTabs(tabsParams);
        }
    });
};
// 标签拖拽排序
const tabsDrop = () => {
    Sortable.create(document.querySelector('.el-tabs__nav') as HTMLElement, {
        draggable: '.el-tabs__item',
        animation: 300,
        onEnd({ newIndex, oldIndex }: { newIndex: number; oldIndex: number }) {
            const tabsList = [...tabStore.tabsMenuList];
            const currRow = tabsList.splice(oldIndex as number, 1)[0];
            tabsList.splice(newIndex as number, 0, currRow);
            tabStore.setTabs(tabsList);
        }
    });
};
onMounted(() => {
    tabsDrop();
    initTabs();
});
</script>
<style scoped lang="less">
@import './index.less';
</style>
