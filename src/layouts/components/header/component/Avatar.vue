<template>
    <div class="avatar">
        <img src="@/assets/images/avatar.gif" alt="avatar" />
    </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.avatar {
    width: 40px;
    height: 40px;
    overflow: hidden;
    cursor: pointer;
    border-radius: 50%;
    img {
        width: 100%;
        height: 100%;
    }
}
</style>
