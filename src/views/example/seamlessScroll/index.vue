<template>
    <div class="demo" :style="{ height: `${height}px` }">
        <el-button @click="add">添加数据</el-button>
        <el-button @click="reflash">刷新数据</el-button>
        <tank-seamless-scroll :virtual="true" :step-length="stepLength" :debug="debug">
            <div v-for="(v, i) in count" :key="i">value:{{ v }},key:{{ i }}</div>
        </tank-seamless-scroll>
        <tank-seamless-scroll :virtual="true" :step-length="stepLength" :debug="debug">
            <div v-for="(v, i) in count" :key="i">value:{{ v }},key:{{ i }}</div>
        </tank-seamless-scroll>
        <tank-seamless-scroll :virtual="true" :step-length="stepLength" :debug="debug">
            <div v-for="(v, i) in count" :key="i">value:{{ v }},key:{{ i }}</div>
        </tank-seamless-scroll>
        <tank-seamless-scroll :virtual="true" :step-length="stepLength" :debug="debug">
            <div v-for="(v, i) in count" :key="i">value:{{ v }},key:{{ i }}</div>
        </tank-seamless-scroll>
        <tank-seamless-scroll :virtual="true" :step-length="stepLength" :debug="debug">
            <div v-for="(v, i) in count" :key="i">value:{{ v }},key:{{ i }}</div>
        </tank-seamless-scroll>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import TankSeamlessScroll from '@/components/Virtual/virtual.vue';
const prop = defineProps({
    stepLength: {
        type: Number,
        default: 60
    },

    debug: {
        type: Boolean,
        default: true
    },
    height: {
        type: Number,
        default: 300
    }
});
const count = ref([1, 2, 3, 4, 5]);
const add = () => {
    count.value.push(count.value.length + 1);
};
const reflash = () => {
    count.value = new Array(500).fill(null);
};
</script>
<style scoped>
h2 {
    color: #01092c;
    text-align: center;
}
.demo {
    color: #fff;
    text-shadow: black;
    height: 100px;
}

.demo div {
    padding: 10px 0px;
    background-color: #ffea5e;
    margin: 5px;
    box-sizing: border-box;
    text-align: center;
    border-radius: 5px;
}

.demo div:nth-child(2n) {
    background-color: #ff6625;
}
</style>
