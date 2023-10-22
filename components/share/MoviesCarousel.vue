<template>
  <div class="h-full">
    <div v-if="isLoading" class="h-full">
      <el-skeleton>
        <template #template>
          <el-skeleton-item class="my-4" variant="h3" style="width: 20%" />
        </template>
      </el-skeleton>
      <el-carousel
        :autoplay="false"
        indicator-position="none"
        trigger="click"
        :interval="5000"
        type="card"
        height="90%"
        class="h-full"
        arrow="always"
      >
        <el-carousel-item
          v-for="(_, index) in 3"
          :key="index"
          :class="{ 'pointer-events-none': index !== currentSlide }"
        >
          <el-card
            class="h-full w-2/3 m-auto flex flex-col p-0"
            body-class="h-full p-0"
          >
            <el-skeleton class="h-full">
              <template #template>
                <el-skeleton-item
                  variant="image"
                  style="height: 90%"
                  class="h-5/6 h-full w-full"
                />
                <div class="p-3.5">
                  <el-skeleton-item variant="p" style="width: 50%" />
                  <div
                    style="
                      display: flex;
                      align-items: center;
                      justify-items: space-between;
                    "
                  >
                    <el-skeleton-item
                      variant="text"
                      style="margin-right: 16px"
                    />
                    <el-skeleton-item variant="text" style="width: 30%" />
                  </div>
                </div>
              </template>
            </el-skeleton>
          </el-card>
        </el-carousel-item>
      </el-carousel>
    </div>
    <template v-else>
      <h2
        v-if="title"
        class="py-3 text-2xl w-fit bg-clip-text text-transparent bg-gradient-to-r from-blue to-red"
      >
        {{ title }}
      </h2>
      <el-carousel
        :autoplay="false"
        indicator-position="none"
        trigger="click"
        :interval="5000"
        type="card"
        height="90%"
        class="h-full"
        :initial-index="currentSlide"
        arrow="always"
        @change="setActiveSlide"
      >
        <el-carousel-item
          v-for="(item, index) in movies"
          :key="item.imdbID"
          :class="{ 'pointer-events-none': index !== currentSlide }"
        >
          <el-card
            class="h-full w-2/3 m-auto flex flex-col p-0 cursor-pointer"
            body-class="h-5/6 p-0"
            @click.stop="$router.push(`details/${item.imdbID}`)"
          >
            <img
              v-if="item.Poster !== 'N/A'"
              :src="item.Poster"
              class="h-full w-full object-cover"
            />
            <div class="p-3.5">
              <strong>Title:</strong> {{ item.Title }}
              <div><strong>Year:</strong> {{ item.Year }}</div>
              <div><strong>Type:</strong> {{ item.Type }}</div>
            </div>
          </el-card>
        </el-carousel-item>
      </el-carousel>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { MovieShort } from "../../types";

defineProps({
  movies: {
    type: Array<MovieShort>,
    default: () => [],
  },
  title: {
    type: String,
    default: "",
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
});

const currentSlide = ref(1);

const setActiveSlide = (index: number) => {
  currentSlide.value = index;
};
</script>

<style lang="scss" scoped>
:deep(.el-carousel__mask) {
  background: none;
}

:deep(.el-carousel__item--card.is-in-stage) {
  cursor: auto;
}
</style>
