<template>
  <el-form
    class="custom-form"
    label-position="top"
    label-width="100px"
    :model="serialNumberForm"
    :rules="rules"
    ref="serialNumberForm"
  >
    <el-row :gutter="20" class="form-bg-color"
      v-if="showUpload"
      style="padding: 30px 0px 30px 0px;">
      <el-col :span="18" :offset="3">
        <div style="font-size: 18px;
            font-weight: bold;
            }">
          <span class="img-label">Upload Serial Numbers</span>
          <div style="margin-top: 10px; text-align:center" class="dropbox">
            <input type="file" @change="onFileChange" :auto-upload="false" accept=".csv,.xls,.xlsx" class="input-file">
            <i class="el-icon-upload" style="padding-top:60px; font-size:67px"></i>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="form-bg-color" style="padding-top: 30px;" v-if="showRemote">
      <el-col :span="18" :offset="3">
          <el-pagination
          class="table-pagination"
          layout="prev, pager, next"
          :total="pagination.totalRecord"
          :page-size="pagination.itemPerPage"
          @current-change="paginationCallback"
          :current-page="pagination.currentPage + 1"
        >
        </el-pagination>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="form-bg-color" style="padding: 30px 0px 30px 0px;" v-if="localData.length > 0">
      <el-col :span="18" :offset="3">
        <el-row>
          <!-- <el-col v-for="(each) in localData" :key="each" :xs="8" :sm="6" :md="4" :lg="3"> -->
          <el-col :span="6" v-for="(each) in localData" :key="each" :xs="24" :sm="12" :md="10" :lg="8" :xl="6">
          <div :style="{ padding: '5px' }">
          <el-card :body-style="{ padding: '0px' }">
            <div style="padding: 30px 0px 30px 0px; text-align: center">
              <span style="font-size: 22px;" class="font-text">{{ each.serialNumber }}</span>
              <div class="bottom font-text" style="padding-top:10px; font-size:18px">
              </div>
            </div>
          </el-card>
          </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="form-bg-color" style="padding: 30px 0px 30px 0px;" v-if="showRemote">
      <el-col :span="18" :offset="3">
        <el-row>
          <el-col :span="6" v-for="(each) in remoteData" :key="each" :xs="24" :sm="12" :md="10" :lg="8" :xl="6">
            <div :style="{ padding: '5px' }">
              <el-card :body-style="{ padding: '0px' }">
                <div class="checkbox">
                  <input type="checkbox"
                  :id="each.productSerialNumberId"
                  @change="mark(each.productSerialNumberId, $event)"
                  :checked="isActive(each.status)"
                  style="margin-left:5px; width: auto;">
                </div>
                <div style="padding: 30px 0px 30px 0px; text-align: center" @click="go(each.serialNumber)">
                  <span style="font-size: 22px" class="font-text">{{ each.serialNumber }}</span>
                  <div class="bottom font-text" style="padding-top:10px; font-size:18px">
                    <span>EDITION {{ each.edition }}/ {{ each.total }}</span>
                  </div>
                </div>
              </el-card>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="form-bg-color" style="padding: 30px 0px 30px 0px; text-align:right">
      <el-col :span="18" :offset="3">
        <div style="margin: 20px 0px 20px 0px;">
          <el-button
          @click="changeFile"
          class="custom-btn upload-btn"
          v-if="showUploadBut && !serialNumberForm.forDeleteSN.length > 0"
          >Upload Another</el-button>
          <el-button
            type="danger"
              v-if="serialNumberForm.forDeleteSN.length > 0"
            @click="onSubmit($refs.serialNumberForm)"
            :loading="loading"
          >
            Deactivate
          </el-button>
          <el-button
            type="success"
            class="custom-btn submit-btn"
              v-if="localData.length > 0"
            @click="onSubmit($refs.serialNumberForm)"
            :loading="loading"
          >
            Create
          </el-button>
        </div>
      </el-col>
    </el-row>
  </el-form>
</template>
<script>
import { mapActions, mapState, mapGetters } from 'vuex';
import { GET_PRODUCT } from '@/store/modules/product/actions-type';
import readXlsxFile from 'read-excel-file';
import { ElMessage } from 'element-plus';

const defaultPagination = {
  itemPerPage: 25,
  totalRecord: 0,
  currentPage: 0,
};

export default {
  props: {
    onSubmit: {
      type: Function,
      required: true,
    },
    resetForm: {
      type: Function,
      required: true,
    },
    loading: {
      type: Boolean,
      required: true,
    },
  },
  components: {
  },
  data() {
    return {
      files: '',
      active: false,
      xlsxTemp: [],
      localData: [],
      remoteData: [],
      showRemote: false,
      showUpload: false,
      showUploadBut: false,
      serialNumberForm: {
        productId: this.$route.params.id,
        serialNumbers: [],
        forDeleteSN: [],
      },
      forDeleteSN: [],
      pagination: defaultPagination,
      paginationTimeout: null,
      searchKeyword: '',
    };
  },
  methods: {
    isActive(thisSn) {
      let result = true;
      if (thisSn === 'Inactive') {
        result = false;
      }
      return result;
    },
    onFileChange(e) {
      this.files = e.target.files || e.dataTransfer.files;
      if (!this.files.length) {
        return;
      }
      this.createJSON(this.files[0]);
    },
    createJSON(f) {
      if (f.name.split('.').pop() === 'csv') { // CSV
        const vm = this;
        if (window.FileReader) {
          const reader = new FileReader();
          reader.readAsText(f);
          reader.onload = (event) => {
            const csv = event.target.result;
            vm.parse_csv = vm.csvJSON(csv);
          };
          reader.onerror = (evt) => {
            if (evt.target.error.name === 'NotReadableError') {
              this.error('Cannot read file !');
            }
          };
        } else {
          this.error('FileReader are not supported in this browser.');
        }
      } else if (f.name.split('.').pop() === 'xlsx') { // XLSX
        const result = [];
        readXlsxFile(f).then((rows) => {
          for (let i = 1; i < rows.length; i++) {
            result.push({
              serialNumber: rows[i][0].toString(),
              edition: parseInt(rows[i][1].toString(), 0),
            });
          }
          this.localData = result;
          this.serialNumberForm.serialNumbers = result;
          if (this.localData.length > 0) {
            this.showUpload = false;
            this.showUploadBut = true;
          }
          console.log(this.localData);
        });
      } else {
        this.error('Cannot read file !');
      }
    },
    csvJSON(csv) {
      const numberOfLines = csv.split('\n');
      if (numberOfLines[0].split(',').length !== 2) {
        this.error('You CSV file has wrong number of columns, it has to be 2 columns, named "Serial Number" and "Edition"');
      } else {
        let eachLine = [];
        const result = [];
        for (let i = 1; i < numberOfLines.length; i++) {
          eachLine = numberOfLines[i].split(',');
          if (eachLine[0].length > 0) {
            const edition = eachLine[1].replace(/\r/g, '').toString();
            result.push({
              serialNumber: eachLine[0],
              edition: parseInt(edition, 0),
            });
          }
        }
        this.localData = result;
        this.serialNumberForm.serialNumbers = result;
        if (this.localData.length > 0) {
          this.showUpload = false;
          this.showUploadBut = true;
        }
        // this.fromBackend = false;
        console.log(this.localData);
      }
    },
    paginationCallback(page) {
      const newPagination = {
        ...this.pagination,
        currentPage: page - 1,
      };
      const productDetails = this.getProductSerials({
        ...newPagination,
      });
      this.remoteData = [];
      this.paginationTimeout = setTimeout(() => {
        this.remoteData = productDetails.data;
      }, 1);
      this.pagination = productDetails.pagination;
    },
    error(m) {
      ElMessage.error({
        showClose: true,
        message: m,
      });
    },
    changeFile() {
      this.localData = [];
      this.showUpload = true;
      this.showUploadBut = false;
      this.showRemote = false;
    },
    mark(sn, e) {
      if (e.target.checked) {
        const i = this.serialNumberForm.forDeleteSN.indexOf(sn);
        if (i !== -1) {
          this.serialNumberForm.forDeleteSN.splice(i, 1);
        }
      } else {
        this.serialNumberForm.forDeleteSN.push(sn);
      }
      console.log(this.serialNumberForm.forDeleteSN);
    },
    go(sn) {
      if (sn.length > 0) {
        window.open(`https://xm-landing.bsg-dev.tk/productprovenance?id=${sn}`, '_blank');
      }
    },
    ...mapActions('product', [GET_PRODUCT]),
  },
  computed: {
    ...mapState('product', ['productDetails']),
    ...mapGetters('product', ['getProductSerials']),
  },
  mounted() {
    this.GET_PRODUCT(this.$route.params.id);
    // this.serialNumberForm.productId = this.$route.params.id;
  },
  beforeUnmount() {
    clearTimeout(this.paginationTimeout);
    // this.RESET_PRODUCT_STATE();
  },
  watch: {
    productDetails() {
      if (this.searchKeyword) {
        this.pagination = {
          ...this.pagination,
          currentPage: 0,
        };
      }
      const productDetails = this.getProductSerials({
        ...this.pagination,
      });
      this.remoteData = productDetails.data;
      this.pagination = productDetails.pagination;
      if (this.remoteData.length > 0) {
        this.showRemote = true;
        this.showUpload = false;
        this.showUploadBut = true;
      } else {
        this.showRemote = false;
        this.showUpload = true;
        this.showUploadBut = false;
      }
      this.showSaveBut = false;
    },
  },
};
</script>
<style lang="scss" scoped>
  .dropbox {
    // outline: 2px dashed grey;
    outline: 2px solid grey;
    // outline-offset: -10px;
    /* background: lightcyan; */
    color: dimgray;
    padding: 10px 10px;
    min-height: 200px; /* minimum height */
    position: relative;
    cursor: pointer;
  }

  .input-file {
    opacity: 0; /* invisible but it's there! */
    // width: 100%;
    height: 200px;
    position: absolute;
    cursor: pointer;
  }

  // .dropbox:hover {
  //   background: lightblue;
  // }

  .dropbox p {
    font-size: 1.2em;
    text-align: center;
    padding: 50px 0;
  }

  .font-text {
    font-family: 'gotham';
  }

</style>

<style scoped>
  .el-pagination button:disabled {
      background-color: #d5d5d5 !important;
      color: #2a2a2a !important;
      font-size: 18px !important;
  }
  .el-pager li.active {
      color: #d5d5d5 !important;
      cursor: default;
  }
  .bg {
    background-color:WHITE !important;
  }
  .checkbox {
    position:absolute !important;
    right: 10px !important;
    top: 8px;
  }
  .el-card {
    position: relative !important;
  }
</style>
