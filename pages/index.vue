<template>
  <div class="h-full">
    <ShareMoviesCarousel
      v-if="!error"
      :is-loading="isLoading"
      title="Our recommendation:"
      :movies="searchMovies"
    />
    <div v-else-if="error === 'network'">
      Something went wrong! Try again later.
    </div>
    <div v-else>Nothing was found!</div>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useMovieStore } from "@/stores/movies";

export default defineComponent({
  setup() {
    console.log(process.env);

    const store = useMovieStore();
    const { searchMovies } = storeToRefs(store);
    const isLoading = ref(true);
    const error = ref<string | null>(null);

    return { isLoading, searchMovies, error };
  },
  async created() {
    const store = useMovieStore();
    try {
      this.error = null;
      this.isLoading = true;
      await store.fetchByTitle("neon");
    } catch (e) {
      this.error = e instanceof Error ? "network" : "value";
    } finally {
      this.isLoading = false;
    }
  },
});
</script>
