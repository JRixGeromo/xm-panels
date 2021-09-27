<template>
  <div style="width: 100%" class="label_bound">
    <el-form-item :prop="formProps">
      <el-select
        :model-value="modelValue"
        @change="onChange"
      >
        <slot></slot>
      </el-select>
      <label
        class="label_middle"
        :class="{ label_above: isFocus || modelValue }"
      >
        {{ formLabel }}
      </label>
    </el-form-item>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: String,
    formProps: {
      type: String,
      required: true,
    },
    formLabel: {
      type: String,
      required: true,
    },
    onChangeFunc: {
      type: Function,
      default: null,
    },
  },
  emits: ['update:modelValue'],
  data() {
    return {
      isFocus: false,
    };
  },
  methods: {
    onChange(value) {
      this.$emit('update:modelValue', value);
      if (this.onChangeFunc !== null) {
        this.onChangeFunc();
      }
    },
  },
};
</script>
