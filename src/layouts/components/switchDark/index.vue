<template>
    <el-switch
        v-model="globalStore.isDark"
        @change="switchDark"
        inline-prompt
        :active-icon="Sunny"
        :inactive-icon="Moon"
    />
</template>

<script setup lang="ts" name="SwitchDark">
import { useGlobalStore } from '@/store/module/global';
import { Sunny, Moon } from '@element-plus/icons-vue';
import { useTheme } from '@/hooks/useTheme';

const { switchDark } = useTheme();

const globalStore = useGlobalStore();
</script>
