<template>
    <el-dropdown trigger="click" :teleported="false">
        <el-button size="small" type="primary">
            更多<el-icon class="el-icon--right"><arrow-down /></el-icon>
        </el-button>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item @click="refresh">
                    <el-icon><Refresh /></el-icon>刷新当前页
                </el-dropdown-item>
                <!-- <el-dropdown-item @click="maximize">
                    <el-icon><FullScreen /></el-icon>{{ $t('tabs.maximize') }}
                </el-dropdown-item> -->
                <el-dropdown-item divided @click="closeCurrentTab">
                    <el-icon><Remove /></el-icon>关闭当前页
                </el-dropdown-item>
                <el-dropdown-item @click="closeOtherTab">
                    <el-icon><CircleClose /></el-icon>关闭其他页
                </el-dropdown-item>
                <el-dropdown-item @click="closeAllTab">
                    <el-icon><FolderDelete /></el-icon>关闭所有
                </el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script setup lang="ts">
import { inject, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useTabStore } from '@/store/module/tabs';
import { HOME_URL } from '@/config/config';
const tabStore = useTabStore();
const route = useRoute();
const router = useRouter();

const refreshCurrentPage: Function = inject('refresh') as Function;
const refresh = () => {
    setTimeout(() => {
        // keepAliveStore.removeKeepAliveName(route.name as string);
        refreshCurrentPage(false);
        nextTick(() => {
            // keepAliveStore.addKeepAliveName(route.name as string);
            refreshCurrentPage(true);
        });
    }, 0);
};

// Close Current
const closeCurrentTab = () => {
    if (route.meta.isAffix) return;
    tabStore.removeTabs(route.fullPath);
    // keepAliveStore.removeKeepAliveName(route.name as string);
};

// Close Other
const closeOtherTab = () => {
    tabStore.closeMultipleTab(route.fullPath);
    // keepAliveStore.setKeepAliveName([route.name] as string[]);
};

// Close All
const closeAllTab = () => {
    tabStore.closeMultipleTab();
    // keepAliveStore.setKeepAliveName();
    router.push(HOME_URL);
};
</script>
<style scoped lang="less"></style>
