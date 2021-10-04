<template>
  <div style="width: 100%" class="label_bound">
    <el-form-item :prop="formProps">
      <el-input
        :type="inputType"
        :model-value="modelValue"
        @focus="isFocus = true"
        @blur="isFocus = false"
        @input="onChange"
        :show-password="inputType === 'password'"
        :disabled="disabled"
      >
      </el-input>
      <label
        class="label_middle"
        :class="{ label_above: isFocus || modelValue }"
      >{{ formLabel }}</label>
    </el-form-item>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: String,
    inputType: {
      type: String,
      default: 'text',
    },
    formProps: {
      type: String,
      required: true,
    },
    formLabel: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
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
    },
  },
};
</script>
