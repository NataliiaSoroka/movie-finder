<template>
  <div>
    <el-card v-if="!error">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="w-fit">
            <img
              v-if="selectedMovie.Poster !== 'N/A'"
              class="w-full"
              :src="selectedMovie.Poster"
            />
            <div class="bg-orange-100 p-2 rounded text-orange w-fit mt-4">
              Ratings:
              <el-row :gutter="10" class="mb-2">
                <el-col
                  v-for="(rating, index) in selectedMovie.Ratings"
                  :key="index"
                >
                  <el-tag size="small" effect="dark" type="warning">
                    {{ rating.Source }}
                  </el-tag>
                  <span class="ml-2">{{ rating.Value }}</span>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-col>
        <el-col :span="18">
          <div class="w-full p-9">
            <h3 class="text-2xl text-center">
              <span
                class="bg-clip-text text-transparent bg-gradient-to-r from-blue to-red"
              >
                {{ selectedMovie.Title }} ({{ selectedMovie.Year }})
              </span>
            </h3>
            <p class="my-6">{{ selectedMovie.Plot }}</p>
            <el-row :gutter="20" class="mb-2">
              <el-col :span="4">Director:</el-col>
              <el-col :span="20">{{ selectedMovie.Director }}</el-col>
            </el-row>
            <el-row :gutter="20" class="mb-2">
              <el-col :span="4">Actors:</el-col>
              <el-col :span="20">{{ selectedMovie.Actors }}</el-col>
            </el-row>
            <el-row :gutter="20" class="mb-2">
              <el-col :span="4">Genre:</el-col>
              <el-col :span="20">{{ selectedMovie.Genre }}</el-col>
            </el-row>
            <el-row :gutter="20" class="mb-2">
              <el-col :span="4">Country:</el-col>
              <el-col :span="20">{{ selectedMovie.Country }}</el-col>
            </el-row>
            <el-row :gutter="20" class="mb-2">
              <el-col :span="4">Writer:</el-col>
              <el-col :span="20">{{ selectedMovie.Writer }}</el-col>
            </el-row>
            <el-row :gutter="20" class="mb-2">
              <el-col :span="4">Released:</el-col>
              <el-col :span="20">{{ selectedMovie.Released }}</el-col>
            </el-row>
            <el-row :gutter="20" class="mb-2">
              <el-col :span="4">Language:</el-col>
              <el-col :span="20">{{ selectedMovie.Language }}</el-col>
            </el-row>
            <el-row :gutter="20" class="mb-2">
              <el-col :span="4">Runtime:</el-col>
              <el-col :span="20">{{ selectedMovie.Runtime }}</el-col>
            </el-row>
            <el-row v-if="selectedMovie.BoxOffice" :gutter="20" class="mb-2">
              <el-col :span="4">Box office:</el-col>
              <el-col :span="20">{{ selectedMovie.BoxOffice }}</el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <div v-else-if="error === 'network'">
      Something went wrong! Try again later.
    </div>
    <div v-else>Movie isn't found!</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  async setup() {
    const route = useRoute();
    const store = useMovieStore();
    const { selectedMovie } = storeToRefs(store);
    const error = ref<string | null>(null);

    const { imdbID } = route.params;
    try {
      error.value = null;
      await store.getMovieByIbmId(imdbID as string);
    } catch (e) {
      error.value = e instanceof Error ? "network" : "value";
    }
    return { selectedMovie, error };
  },
});
</script>
