<script setup lang="ts">
import { useMouse } from "@/composables/mouse";
import { computed } from "vue";
import { ref } from "vue";
import DeskItem from "./DeskItem.vue";
interface Desk {
  x: number;
  y: number;
}
const mouse = useMouse();
const mapContainer = ref<HTMLDivElement | null>(null);

const bounds = computed(() => mapContainer.value?.getBoundingClientRect());

const desks = ref<Desk[]>([]);
const createDesk = () => {
  desks.value.push({ x: mouse.x.value, y: mouse.y.value });
};
const updateDeskPosition = (index: number, x: number, y: number): void => {
  const desk = desks.value[index];
  desk.x = x;
  desk.y = y;
};
</script>

<template>
  <img
    ref="mapContainer"
    class="map"
    @mousedown.stop.prevent
    @mouseup.stop.prevent
    @click.self="createDesk"
    draggable="false"
    src="https://wpmedia.roomsketcher.com/content/uploads/2021/12/09160214/RoomSketcher-Office-Floor-Plan-PID3529710-2D-bw-with-Labels.jpg"
  />
  <div v-for="(desk, index) in desks" :key="index">
    <DeskItem
      :x="desk.x"
      :y="desk.y"
      :bounds="bounds!"
      :index="index"
      @update-position="updateDeskPosition"
    />
  </div>
</template>

<style scoped>
.map {
  user-select: none;
  -moz-user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}
</style>
