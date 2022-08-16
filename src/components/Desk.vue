<script setup lang="ts">import { useMouse } from '@/composables/mouse';
import { ref, watch, watchEffect } from 'vue';

const deskWidth = 20;
const deskHeight = 20;

const { bounds, ...props } = defineProps<{
    x: number,
    y: number,
    bounds: { x: number, y: number, width: number, height: number }
    index: number
}>()

const emit = defineEmits<{
    (e: 'updatePosition', index: number, x: number, y: number): void
}>()

const x = ref(props.x)
const y = ref(props.y)

const mouse = useMouse()

const isDragging = ref(false)

const isWithinBounds = (x: number, y: number) => {
    if (x < bounds.x + deskWidth / 2) return false;
    if (y < bounds.y + deskHeight / 2) return false;
    if (x > bounds.width + bounds.x - deskWidth / 2) return false;
    if (y > bounds.height + bounds.y - deskHeight / 2) return false;
    return true;
}

watchEffect(() => {
    if (isDragging.value) {
        if (isWithinBounds(mouse.x.value, mouse.y.value)) {
            x.value = mouse.x.value;
            y.value = mouse.y.value;
        }
    }
})

watch(isDragging, () => {
    if (!isDragging.value) {
        emit('updatePosition', props.index, props.x, props.y)
    }
})

</script>

<template>
    <div class="desk" @click.stop v-on:mousedown="isDragging = true" v-on:mouseup="isDragging = false"
        :style="{ left: x - deskWidth / 2 + 'px', top: y - deskHeight / 2 + 'px', width: deskWidth + 'px', height: deskHeight + 'px' }">
    </div>
</template>

<style scoped>
.desk {
    position: fixed;
    border-radius: 50%;
    background-color: blue;
}
</style>