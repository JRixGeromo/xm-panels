<template>
  <el-form
    class="custom-form"
    label-position="top"
    label-width="100px"
    :model="navItemForm"
    :rules="rules"
    ref="navItemForm"
    @keyup.enter="onSubmit($refs.navItemForm)"
  >
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="Link To" prop="navItemType">
          <el-radio-group v-model="navItemForm.navItemType">
            <el-radio label="Internal Page"></el-radio>
            <el-radio label="External Site"></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col :span="24" v-if="navItemForm.navItemType === 'Internal Page'">
        <el-form-item label="Internal Page" prop="dynamicPage">
          <el-select
            v-model="navItemForm.dynamicPage"
            placeholder="please select a page"
          >
            <el-option
              v-for="page in filterPageList"
              :key="page.pageId"
              :label="page.pageUrl"
              :value="page.pageUrl"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="24" v-if="navItemForm.navItemType === 'Internal Page'">
        <el-form-item label="Url">
          <el-input v-model="navItemForm.dynamicPage" readonly></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24" v-else>
        <el-form-item label="Url" prop="url">
          <el-input @change="handleNoSpaceEnter" v-model="navItemForm.url"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12" :xs="24">
        <el-form-item label="Title (En)" prop="titleEn">
          <el-input v-model="navItemForm.titleEn"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12" :xs="24">
        <el-form-item label="Title (Zh)" prop="titleZh">
          <el-input v-model="navItemForm.titleZh"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12" :xs="24">
        <el-form-item label="Inside Dropdown" prop="inDropdown">
          <el-radio-group v-model="navItemForm.inDropdown">
            <el-radio label="Yes"></el-radio>
            <el-radio label="No"></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col :span="12" :xs="24">
        <el-form-item label="View" prop="view">
          <el-radio-group v-model="navItemForm.view">
            <el-radio label="Public" va></el-radio>
            <el-radio label="Non Login" value="nonLogin"></el-radio>
            <el-radio label="Login" value="login"></el-radio>
          </el-radio-group>
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
import { mapActions, mapState } from 'vuex';
import { GET_PAGE_LIST } from '@/store/modules/page/actions-type';

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
  computed: {
    ...mapState('page', ['pageList']),
  },
  watch: {
    pageList(newPageList) {
      this.filterPageList = newPageList.filter((x) => x.pageUrl !== 'footer');
    },
  },
  methods: {
    ...mapActions('page', [GET_PAGE_LIST]),
    handleNoSpaceEnter(e) {
      this.$refs.navItemForm.model.url = e.replace(/\s/g, '');
    },
    submit() {
      this.$refs.navItemForm.validate((valid) => {
        if (valid) {
          const navItemDetails = {
            title: {
              en: this.$refs.navItemForm.model.titleEn,
              zh: this.$refs.navItemForm.model.titleZh,
            },
            url: this.$refs.navItemForm.model.navItemType === 'Internal Page' ? `/page/${this.$refs.navItemForm.model.dynamicPage}` : this.$refs.navItemForm.model.url,
            inDropdown: this.$refs.navItemForm.model.inDropdown === 'Yes' ?? false,
            view: this.$refs.navItemForm.model.view,
            allowDelete: true,
            isExternal: this.$refs.navItemForm.model.navItemType === 'External Site' ?? false,
          };
          this.onSubmit(navItemDetails);
        }
      });
    },
    resetForm() {
      if (this.isEditMode) {
        this.navItemForm = {
          ...this.defaultValue,
        };
      } else {
        this.$refs.navItemForm.resetFields();
      }
    },
  },
  mounted() {
    this.GET_PAGE_LIST();
  },
  data() {
    let formValue = {
      navItemType: 'Internal Page',
      dynamicPage: '',
      url: '',
      titleEn: '',
      titleZh: '',
      inDropdown: '',
      view: '',
    };

    if (this.isEditMode) {
      formValue = {
        ...this.defaultValue,
      };
    }

    return {
      navItemForm: formValue,
      rules: {
        navItemType: [
          {
            required: true,
          },
        ],
        dynamicPage: [
          {
            required: true,
            message: 'Please select a page',
          },
        ],
        url: [
          {
            required: true,
            message: 'Please enter nav item url',
          },
        ],
        titleEn: [
          {
            required: true,
            message: 'Please enter nav item english title',
          },
        ],
        titleZh: [
          {
            required: true,
            message: 'Please enter nav item chinese title',
          },
        ],
        inDropdown: [
          {
            required: true,
            message: 'Please select one',
          },
        ],
        view: [
          {
            required: true,
            message: 'Please select one',
          },
        ],
      },
      filterPageList: [],
    };
  },
};
</script>
