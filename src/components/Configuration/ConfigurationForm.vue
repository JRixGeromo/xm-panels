<template>
  <el-form
    class="custom-form"
    label-position="top"
    label-width="100px"
    :model="configForm"
    :rules="rules"
    ref="configForm"
    @keyup.enter="onSubmit($refs.configForm)"
  >
    <el-row :gutter="20">
      <el-col :span="12" :xs="24">
        <el-form-item label="Platform Royalty Type" prop="platformRoyaltyType">
          <el-select
            v-model="configForm.platformRoyaltyType"
            placeholder="please select platform royalty type"
          >
            <el-option label="Percent" value="percent"></el-option>
            <el-option label="Fixed" value="fixed"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12" :xs="24">
        <el-form-item label="Platform Royalty Amount (%)" prop="platformRoyaltyAmount"  v-if="configForm.platformRoyaltyType === 'percent'">
          <el-input type="number" v-model="configForm.platformRoyaltyAmount" ></el-input>
        </el-form-item>
        <el-form-item label="Platform Royalty Amount (ADA)" prop="platformRoyaltyAmount"  v-else>
          <el-input type="number" v-model="configForm.platformRoyaltyAmount" ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12" :xs="24">
        <el-form-item label="Platform Transaction Fee Type" prop="platformTransactionFeeType">
          <el-select
            v-model="configForm.platformTransactionFeeType"
            placeholder="please select platform transaction fee type"
          >
            <el-option label="Percent" value="percent"></el-option>
            <el-option label="Fixed" value="fixed"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12" :xs="24">
        <el-form-item
          label="Platform Transaction Fee Amount (%)"
          prop="platformTransactionFeeAmount"
          v-if="configForm.platformTransactionFeeType === 'percent'"
        >
          <el-input type="number" v-model="configForm.platformTransactionFeeAmount" ></el-input>
        </el-form-item>
        <el-form-item label="Platform Transaction Fee Amount (ADA)" prop="platformTransactionFeeAmount" v-else>
          <el-input type="number" v-model="configForm.platformTransactionFeeAmount" ></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item class="button-wrapper">
      <el-button @click="resetForm">Reset</el-button>
      <el-button
        type="primary"
        @click="onSubmit($refs.configForm)"
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
      required: true,
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
    resetForm() {
      this.configForm = {
        ...this.defaultValue,
      };
    },
  },
  data() {
    return {
      configForm: this.defaultValue,
      rules: {
        platformRoyaltyType: [
          {
            required: true,
            message: 'Please select platform royalty type',
          },
        ],
        platformRoyaltyAmount: [
          {
            required: true,
            message: 'Please enter platform royalty amount',
          },
        ],
        platformTransactionFeeType: [
          {
            required: true,
            message: 'Please select platform transaction fee type',
          },
        ],
        platformTransactionFeeAmount: [
          {
            required: true,
            message: 'Please enter platform transaction fee amount',
          },
        ],
      },
    };
  },
};
</script>
