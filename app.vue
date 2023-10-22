<template>
  <el-container direction="vertical" class="bg-black h-screen">
    <LayoutAHeader />
    <el-main style="overflow: visible" class="container my-4">
      <NuxtLoadingIndicator />
      <NuxtPage />
    </el-main>
    <LayoutAFooter />
  </el-container>
</template>
