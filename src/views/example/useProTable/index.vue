<template>
    <div class="proTable">
        <h1>自定义封装可搜索表格1111</h1>
        <el-button type="primary" @click="router.push(HOME_URL)">返回首页</el-button>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { HOME_URL } from '@/config/config';
const router = useRouter();
</script>
<style scoped lang="less"></style>
