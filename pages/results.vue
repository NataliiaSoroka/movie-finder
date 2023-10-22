<template>
  <div class="h-full">
    <ShareMoviesCarousel
      v-if="!error"
      :is-loading="isLoading"
      :movies="searchMovies"
      title="You have been looking for..."
    />
    <div v-else-if="error === 'network'">
      Something went wrong! Try again later.
    </div>
    <div v-else>Nothing was found!</div>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { computed, watch, ref } from "vue";
import { useMovieStore } from "@/stores/movies";

const route = useRoute();
const queryTitle = computed(() => route.query.title);
const store = useMovieStore();
const isLoading = ref(true);
const error = ref<string | null>(null);

const { searchMovies } = storeToRefs(store);

const loadData = async (): Promise<void> => {
  try {
    error.value = null;
    isLoading.value = true;
    await store.fetchByTitle(queryTitle.value as string);
  } catch (e) {
    error.value = e instanceof Error ? "network" : "value";
  } finally {
    isLoading.value = false;
  }
};
watch(() => queryTitle.value, loadData, { immediate: true });
</script>
