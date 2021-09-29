<template>
  <el-form
    class="custom-form"
    label-position="top"
    label-width="100px"
    :model="productCategoryForm"
    :rules="rules"
    ref="productCategoryForm"
    @keyup.enter="onSubmit($refs.productCategoryForm)"
  >
    <el-row :gutter="20">
      <el-col :span="12" :xs="24">
        <el-form-item label="Name (En)" prop="nameEn">
          <el-input v-model="productCategoryForm.nameEn"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12" :xs="24">
        <el-form-item label="Name (Zh)" prop="nameZh">
          <el-input v-model="productCategoryForm.nameZh"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item class="button-wrapper">
      <el-button @click="resetForm">Reset</el-button>
      <el-button
        type="primary"
        @click="submit"
        :loading="loading"
      >
        Submit
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {
    defaultValue: {
      type: Object,
      default: null,
    },
    isEditMode: {
      type: Boolean,
      default: false,
    },
    onSubmit: {
      type: Function,
      required: true,
    },
    loading: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    submit() {
      this.$refs.productCategoryForm.validate((valid) => {
        if (valid) {
          const value = {
            en: this.$refs.productCategoryForm.model.nameEn,
            zh: this.$refs.productCategoryForm.model.nameZh,
          };

          const productCategoryDetails = {
            name: this.$refs.productCategoryForm.model.nameEn,
            value: JSON.stringify(value),
            dataType: 'string',
          };
          this.onSubmit(productCategoryDetails);
        }
      });
    },
    resetForm() {
      if (this.isEditMode) {
        this.productCategoryForm = {
          ...this.defaultValue,
        };
      } else {
        this.$refs.productCategoryForm.resetFields();
      }
    },
  },
  data() {
    let formValue = {
      nameEn: '',
      nameZh: '',
    };

    if (this.isEditMode) {
      formValue = {
        ...this.defaultValue,
      };
    }

    return {
      productCategoryForm: formValue,
      rules: {
        nameEn: [
          {
            required: true,
            message: 'Please enter category english name',
          },
        ],
        nameZh: [
          {
            required: true,
            message: 'Please enter category chinese name',
          },
        ],
      },
    };
  },
};
</script>
