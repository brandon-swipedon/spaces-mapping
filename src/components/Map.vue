<script setup lang="ts">
import { useMouse } from '@/composables/mouse';
import { onMounted, ref } from 'vue';
import Desk from './Desk.vue';
interface Desk {
    x: number,
    y: number
}
const mouse = useMouse()
const mapContainer = ref<HTMLDivElement>()
const mapDimensions = ref<{ x: number, y: number, width: number, height: number } | null>(null)

onMounted(() => {
    if (!mapContainer.value) throw Error('Map not mounted')
    const bounds = mapContainer.value.getBoundingClientRect();
    mapDimensions.value = { x: bounds.x, y: bounds.y, width: bounds.width, height: bounds.height }
})

const desks = ref<Desk[]>([])
const createDesk = () => {
    desks.value.push({ x: mouse.x.value, y: mouse.y.value })
}
const updateDeskPosition = (index: number, x: number, y: number): void => {
    const desk = desks.value[index];
    desk.x = x;
    desk.y = y;
}

</script>

<template>
    <div draggable="false" ref="mapContainer">
        <img class="map" @mousedown.stop.prevent @click.self="createDesk" draggable="false"
            src="https://wpmedia.roomsketcher.com/content/uploads/2021/12/09160214/RoomSketcher-Office-Floor-Plan-PID3529710-2D-bw-with-Labels.jpg" />
        <div v-for="(desk, index) in desks">
            <Desk :x="desk.x" :y="desk.y" :bounds="mapDimensions!" :index="index"
                @update-position="updateDeskPosition" />
        </div>
    </div>
</template>

<style scoped>
.map {
    -khtml-user-select: none;
    -o-user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    user-select: none;
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
}
</style>