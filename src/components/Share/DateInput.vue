<template>
  <div style="width: 100%" class="label_bound">
    <el-form-item :prop="formProps">
      <el-date-picker
        popper-class="custom-datepicker-popper"
        :type="inputType"
        v-model="date"
        :format="dateFormat"
        @focus="isFocus = true"
        @blur="isFocus = false"
        @change="onChange"
        :disabled="disabled"
      >
      </el-date-picker>
      <label
        class="label_middle"
        :class="{ label_above: isFocus || modelValue }">
          {{ formLabel }}
        </label>
    </el-form-item>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: String,
    inputType: {
      type: String,
      default: 'date',
    },
    dateFormat: {
      type: String,
      default: 'DD/MM/YYYY',
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
  data() {
    return {
      isFocus: false,
      date: this.modelValue,
    };
  },
  watch: {
    modelValue(newModelValue) {
      this.date = newModelValue;
    },
  },
  emits: ['update:modelValue'],
  methods: {
    onChange(value) {
      this.$emit('update:modelValue', value);
    },
  },
};
</script>
