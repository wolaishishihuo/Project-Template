<template>
    <div ref="wrapperRef" style="height: 500px" @scroll="onScroll">
        <div class="inner" ref="innerRef" style="height: 500000px">
            <div class="list" ref="virtualListRef">
                <div
                    v-for="(item, index) in clientData"
                    :key="index + state.start"
                    :id="index === clientData.length - 1 ? '_bottom' : index === 0 ? '_top' : ''"
                >
                    {{ item }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch, computed, unref, nextTick } from 'vue';

const state = reactive<any>({
    start: 0,
    end: 20,
    scrollOffset: 0
});

const observerInstance = ref();
const data = [...new Array(100).keys()];
console.log(data);

//当前可视的数据。
const clientData = computed(() => {
    return data.slice(state.start, state.end);
});

//主要通过监听end的变化，去更换当前观察的元素。
watch(
    () => state.end,
    () => {
        console.log(1);

        clearObserver();
        initObserver();
    }
    // { immediate: true }
);
const clearObserver = () => {
    //停止观察。
    nextTick(() => {
        unref(observerInstance)?.unobserve(document.getElementById('_top'));
        unref(observerInstance)?.unobserve(document.getElementById('_bottom'));
    });
};
const initObserver = () => {
    //开始观察
    observerInstance.value = new IntersectionObserver(observerCallback, { threshold: 0.1 });
    console.log(1);

    nextTick(() => {
        unref(observerInstance).observe(document.getElementById('_top'));
        unref(observerInstance).observe(document.getElementById('_bottom'));
    });
};

const observerCallback = (entries: any[]) => {
    entries.forEach((entry: any) => {
        if (entry.isIntersecting && entry.target.id === '_bottom') {
            //向下滚动
            state.end = state.end + 10;
            //设置两倍，类似于无缝滚动。
            state.start = state.end - 20;
            state.scrollOffset = state.start * 50;
        }

        if (entry.isIntersecting && entry.target.id === '_top') {
            //向上滚动
            state.end = state.end === 20 ? 20 : state.end - 10 > 20 ? state.end - 10 : 20;
            state.start = state.start === 0 ? 0 : state.start - 10 > 0 ? state.start - 10 : 0;
        }
        state.scrollOffset = state.start * 50;
    });
};
const cacheCount = 5;
const onScroll = e => {
    const { scrollTop } = e.target;
    if (state.scrollOffset === scrollTop) return;

    let startIndex = Math.floor(scrollTop / 50);

    const endIndex = startIndex + 10 + cacheCount;

    if (startIndex > cacheCount) {
        startIndex = startIndex - cacheCount;
    }

    // 偏移量
    const offset = scrollTop - (scrollTop % 50);

    Object.assign(state, {
        start: startIndex,
        end: endIndex,
        scrollOffset: offset
    });
    console.log(state);
};
</script>
<style scoped lang="less"></style>
