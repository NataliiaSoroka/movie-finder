<template>
  <el-card>
    <el-form ref="ruleFormRef" :rules="rules" :model="form" label-width="120px">
      <h2 class="py-4 text-2xl text-center">
        <span
          class="bg-clip-text text-transparent bg-gradient-to-r from-blue to-red"
          >Create movie</span
        >
      </h2>
      <el-form-item prop="title" label="Title">
        <el-input v-model="form.title" size="large" />
      </el-form-item>
      <el-form-item prop="year" label="Year">
        <el-input v-model.number="form.year" type="number" size="large" />
      </el-form-item>
      <el-form-item prop="director" label="Director">
        <el-input v-model="form.director" size="large" />
      </el-form-item>
      <el-form-item prop="poster" label="Poster">
        <el-input v-model="form.poster" type="file" size="large" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit(ruleFormRef)">
          Create
        </el-button>
        <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import type { FormInstance, FormRules } from "element-plus";

interface RuleForm {
  title: string;
  year: number | null;
  director: string;
  poster: string;
}

const form = reactive<RuleForm>({
  title: "",
  year: null,
  poster: "",
  director: "",
});

const ruleFormRef = ref<FormInstance>();
const rules = reactive<FormRules<RuleForm>>({
  title: [
    { required: true, message: "Title is required", trigger: "blur" },
    {
      min: 3,
      message: "Length should be more than 3 characters",
      trigger: "blur",
    },
  ],
  year: [
    {
      required: true,
      message: "Year is required",
      trigger: "blur",
    },
    {
      type: "number",
      min: 1900,
      max: new Date().getFullYear(),
      message: `Year must be from 1900 ${new Date().getFullYear()}`,
      trigger: "blur",
    },
  ],
  poster: [
    {
      required: true,
      message: "Poster is required",
      trigger: "change",
    },
  ],
  director: [
    {
      required: true,
      message: "Director is required",
      trigger: "blur",
    },
  ],
});

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

const onSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid) => {
    if (!valid) return;
    // Send movie form
    ElNotification({
      title: "Success",
      message: "Movie was created!",
      type: "success",
    });
    resetForm(ruleFormRef.value);
  });
};
</script>

<style lang="scss" scoped>
:deep(.el-input__wrapper input[type="file"]) {
  position: relative;
  left: -14px;
}
</style>
