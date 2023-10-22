<template>
  <el-header class="shadow-layout">
    <div class="container h-full flex items-center justify-between">
      <NuxtLink to="/">
        <div class="text-5xl font-extrabold">
          <span
            class="bg-clip-text text-transparent bg-gradient-to-r from-blue to-red"
          >
            Movie Finder
          </span>
        </div>
      </NuxtLink>
      <div class="flex">
        <el-input
          v-model="input"
          placeholder="Search"
          @keyup.enter="handleSearch"
        />
        <el-button class="ml-2" :icon="Search" circle @click="handleSearch" />

        <el-button
          type="primary"
          plain
          class="ml-2"
          @click="$router.push('/create')"
          >Add movie</el-button
        >
      </div>
    </div>
  </el-header>
</template>

<script>
import { ref } from "vue";
import { Search } from "@element-plus/icons-vue";

export default defineComponent({
  setup() {
    const input = ref("");

    const handleSearch = () => {
      const title = input.value;
      if (!title) return;
      input.value = "";
      return navigateTo({
        name: "results",
        query: { title },
      });
    };
    return { input, handleSearch, Search };
  },
});
</script>
