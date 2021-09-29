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

  <el-dialog
    custom-class="custom-dialog"
    :title="modalTitle"
    v-model="addDialog"
    :destroy-on-close="true"
  >
    <TextInput
      v-model="newSeries"
      :formProps="formProps"
      :formLabel="modalInputLabel"
    />
    <el-form-item class="button-wrapper">
      <el-button @click="discardAdd">DISCARD</el-button>
      <el-button @click="addDialog = false">
        SAVE
      </el-button>
    </el-form-item>
  </el-dialog>
</template>

<script>
import TextInput from '@/components/Share/TextInput.vue';

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
    modalTitle: {
      type: String,
      required: true,
    },
    modalInputLabel: {
      type: String,
      required: true,
    },
  },
  components: {
    TextInput,
  },
  emits: ['update:modelValue'],
  data() {
    return {
      isFocus: false,
      addDialog: false,
      newSeries: '',
    };
  },
  watch: {
    newSeries(newVal) {
      this.$emit('update:modelValue', newVal);
    },
  },
  methods: {
    onChange(value) {
      let newValue = value;
      if (value === ' ') {
        newValue = '';
        this.addDialog = !this.addDialog;
      }

      this.$emit('update:modelValue', newValue);
      if (this.onChangeFunc !== null) {
        this.onChangeFunc();
      }
    },
    discardAdd() {
      this.$emit('update:modelValue', '');
      this.addDialog = false;
    },
  },
};
</script>
