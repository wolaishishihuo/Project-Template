<template>
    <div class="screenDisplayEffect" ref="screenDisplayEffectRef">
        <div class="fixed" v-if="displayType == DisplayType.FIXED" :style="effectTypeStyle">
            <div
                v-for="(data, index) in displayData"
                :key="index"
                :style="`width:${100 / columnNum}%;`"
            >
                <slot :data="data" :count="index"></slot>
            </div>
        </div>
        <div class="fixed" v-else-if="displayType == DisplayType.SWITCH" :style="effectTypeStyle">
            <div
                v-for="(data, index) in currentPageData"
                :key="index"
                :style="`width:${100 / columnNum}%;`"
            >
                <slot :data="data" :count="index"></slot>
            </div>
        </div>
        <div ref="scrollRef" class="scroll" v-else :style="{ ...effectTypeStyle }">
            <div
                v-for="(data, index) in displayData"
                :key="index"
                :style="`width:${100 / columnNum}%;`"
            >
                <slot :data="data" :count="index"></slot>
            </div>
        </div>
        <template v-if="displayType == DisplayType.SCROLL">
            <div v-show="isScrolling" ref="scrollRef1" :style="{ ...effectTypeStyle }">
                <div
                    v-for="(data, index) in displayDataCopy"
                    :key="index"
                    :style="`width:${100 / columnNum}%;`"
                >
                    <slot :data="data" :count="index"></slot>
                </div>
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
import { nextTick, onUnmounted } from 'vue';
import { watch, toRefs, computed, CSSProperties, ref } from 'vue';
import { debounce } from 'lodash';

enum DisplayType {
    SCROLL = 0,
    SWITCH,
    FIXED
}
const props = withDefaults(
    defineProps<{
        displayType: number;
        effectType?: 'normal' | 'largeContainer';
        displayData: Array<any>;
        rowNum?: number;
        columnNum?: number;
        scrollStep?: number;
        scrollDirection?: string;
        switchStep?: number;
    }>(),
    {
        effectType: 'normal',
        scrollDirection: 'top',
        displayType: 2,
        displayData: () => [],
        rowNum: 5,
        columnNum: 5,
        scrollStep: 1,
        switchStep: 5
    }
);

const {
    displayType,
    displayData,
    rowNum,
    effectType,
    columnNum,
    scrollStep,
    scrollDirection,
    switchStep
} = toRefs(props);
const effectTypeStyle = computed<CSSProperties>(() => {
    const style: CSSProperties = {
        display: 'flex',
        flexDirection: effectType.value === 'largeContainer' ? 'row' : 'column'
    };
    if (effectType.value === 'largeContainer' || scrollDirection.value !== 'top') {
        style.flexWrap = 'wrap';
    }
    return style;
});

const screenDisplayEffectRef = ref<HTMLDivElement | null>(null);
const scrollRef = ref<HTMLDivElement | null>(null);
const scrollRef1 = ref<HTMLDivElement | null>(null);

// 切换 / 滚动 开始数值
let startNum = 0;
// 分页大小
let switchSize = 0;
// 数据拷贝
const displayDataCopy = ref([]);
// 当前页
const currentPage = ref(1);
// 是否滚动
const isScrolling = ref(false);
// 区域内动画展示时长
const areaShowTime = 5;
const animationTime = computed(() => areaShowTime + (1 - scrollStep.value));

const displayTypeFnMap = {
    /**
     * @description 切换效果
     */
    [DisplayType.SWITCH]: () => {
        switchSize = Math.ceil(displayData.value.length / startNum);
        runSwitch();
    },
    /**
     * @description 滚动效果
     */
    [DisplayType.SCROLL]: () => {
        nextTick(() => {
            const scrollHeight = scrollRef.value.offsetHeight;
            const effectHeight = screenDisplayEffectRef.value.offsetHeight;
            isScrolling.value = scrollHeight > effectHeight;
            const animationDuration =
                animationTime.value +
                (scrollHeight - effectHeight) * (animationTime.value / effectHeight);
            scrollRef.value.classList.toggle('animate_up', isScrolling.value);
            scrollRef1.value.classList.toggle('animate_up', isScrolling.value);
            scrollRef.value.style.animationDuration = animationDuration + 's';
            scrollRef1.value.style.animationDuration = animationDuration + 's';
        });
    }
};

// 获取当前页的数据
const currentPageData = computed(() => {
    const startIndex = (currentPage.value - 1) * startNum;
    const endIndex = startIndex + startNum;
    return displayDataCopy.value.slice(startIndex, endIndex);
});
// 运行切换定时器
let switchTimer: ReturnType<typeof setInterval> | null = null;
const runSwitch = () => {
    if (switchTimer) {
        clearInterval(switchTimer);
        switchTimer = null;
    }
    switchTimer = setInterval(
        () => {
            currentPage.value++;
            if (currentPage.value > switchSize) {
                currentPage.value = 1; // 回到第一页
            }
        },
        switchStep.value ? switchStep.value * 1000 : 30000
    );
};

// 初始计算
const initialize = debounce(() => {
    displayDataCopy.value = [...displayData.value];
    startNum = rowNum.value * columnNum.value;
    displayTypeFnMap[displayType.value] && displayTypeFnMap[displayType.value]();
}, 1000);

// 监听props变化并触发初始计算
watch(
    [displayData, rowNum, columnNum, displayType],
    () => {
        if (displayData.value.length) {
            initialize();
        }
    },
    { immediate: true, deep: true } // 立即执行一次
);

onUnmounted(() => {
    if (switchTimer) {
        clearInterval(switchTimer);
        switchTimer = null;
    }
});
</script>
<style scoped lang="less">
.screenDisplayEffect {
    width: 100%;
    height: 100%;
    overflow: hidden;
}
.animate_up {
    animation-name: scrollUp;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    will-change: transform;
    transform: translate3d(0, 0, 0);
}
.animate_left {
    animation-name: scrollLeft;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    will-change: transform;
    transform: translate3d(0, 0, 0);
}

@keyframes scrollUp {
    0% {
        transform: translateY(0);
        -webkit-transform: translateY(0);
    }
    100% {
        transform: translateY(-100%);
        -webkit-transform: translateY(-100%);
    }
}
@keyframes scrollLeft {
    0% {
        transform: translateX(5%);
        -webkit-transform: translateX(5%);
    }
    100% {
        transform: translateX(-100%);
        -webkit-transform: translateX(-100%);
    }
}
</style>
