<template>
    <div
        ref="ref_tank_seamless_scroll"
        class="tank_seamless_scroll"
        :style="{ height: parentHeight + 'px' }"
    >
        <div class="debugger" v-if="debug">
            copyCount:{{ loopCount.length }}
            <br />
            translateY:{{ Math.round(val * 1000) / 1000 }}px
            <br />
            fps:{{ currentFps }}
        </div>
        <div ref="ref_warp" class="warp">
            <template v-for="i in loopCount.length" :key="'ss_' + i">
                <div ref="ref_warpLine" class="warpLine">
                    <slot name="default"></slot>
                </div>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, nextTick, ref } from 'vue';
const loopCount = ref(new Array(5));
const prop = defineProps({
    stepLength: {
        type: Number,
        default: 60,
        validator: value => (value as number) >= 0
    },
    debug: {
        type: Boolean,
        default: false
    },
    limitFps: {
        type: Number,
        default: 32
    }
});
const ref_tank_seamless_scroll = ref(null);
const ref_warpLine = ref(null);
const ref_warp = ref(null);
const translateY = ref();
let parentHeight = ref(0);
let warpLineHeight;

const getTime = () => new Date().getTime();
let lastTime = getTime();
const val = ref();
const currentFps = ref(64);
const updateScroll = () => {
    const limitHeight = -warpLineHeight * ((loopCount.value.length / 3) * 2);
    const currentTime = getTime();
    currentFps.value = Math.ceil(1000 / (currentTime - lastTime));
    const len = (currentTime - lastTime) * (prop.stepLength / 1000);
    lastTime = currentTime;
    translateY.value += -1 * len;
    translateY.value =
        translateY.value < limitHeight
            ? Math.sign(translateY.value) *
              (Math.abs(translateY.value % warpLineHeight) + warpLineHeight)
            : translateY.value;
    val.value = translateY.value;
    ref_warp.value.style.transform = `translate3d(0px ,${translateY.value}px,0px)`;
    // 使用 requestAnimationFrame 来继续更新滚动
    requestAnimationFrame(updateScroll);
};
onMounted(() => {
    // 在 onMounted 中获取容器高度和子元素高度
    nextTick(() => {
        const tankSeamlessScroll = ref_tank_seamless_scroll.value;
        const warpLine = ref_warpLine.value[0];
        parentHeight.value = tankSeamlessScroll.parentElement.getBoundingClientRect().height;
        warpLineHeight = warpLine.getBoundingClientRect().height;
        translateY.value = -warpLineHeight;
        updateScroll();
        // 添加窗口尺寸监听器，以便在高度变化时更新
        window.addEventListener('resize', () => {
            parentHeight.value = tankSeamlessScroll.parentElement.getBoundingClientRect().height;
            warpLineHeight = warpLine.getBoundingClientRect().height;
        });
    });
});
</script>

<style scoped>
.tank_seamless_scroll {
    position: relative;
    overflow: hidden;
}

.tank_seamless_scroll,
.warpLine,
.warp {
    padding: 0;
    margin: 0;
    transition: 0s;
    overflow: hidden;
}

.debugger {
    position: relative;
    top: 5px;
    left: 10.5%;
    width: 75%;
    height: auto;
    padding: 5px 2.5%;
    background-color: rgba(0, 0, 0, 0.8);
    color: #999999;
    z-index: 88;
    border-radius: 10px;
    border: solid 1px #999999;
}
</style>
