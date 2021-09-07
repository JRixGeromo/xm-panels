<template>
  <el-form
    class="custom-form"
    label-position="top"
    label-width="100px"
    :model="serialNumberForm"
    :rules="rules"
    ref="serialNumberForm"
    @keyup.enter="onSubmit($refs.serialNumberForm)"
  >
    <el-row :gutter="20" class="form-bg-color" v-if="!afterSelectFile" style="padding: 30px 0px 30px 0px;">
      <el-col :span="18" :offset="3">
        <div style="font-size: 18px;
            font-weight: bold;
            }">
          <label>Upload Serial Numbers</label>
          <div style="margin-top: 10px; text-align:center" class="dropbox">
            <input type="file" @change="onFileChange" :auto-upload="false" class="input-file">
            <i class="el-icon-plus" style="padding-top:90px; font-size:20px"></i>
          </div>
        </div>
      </el-col>
    </el-row>
    <!-- <el-row :gutter="20" class="form-bg-color" style="padding-top: 30px;">
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
    </el-row> -->
    <el-row :gutter="20" class="form-bg-color" v-if="afterSelectFile"  style="padding: 30px 0px 30px 0px;">
      <el-col :span="6" v-for="(each) in serialNumberForm.serialNumbers" :key="each" @click="go('SN1234567890523456')">
        <div :style="{ padding: '5px' }">
        <el-card :body-style="{ padding: '0px' }">
          <div style="padding: 30px; text-align: center">
            <span style="font-size:22px" class="font-text">{{ each.serialNumber }}</span>
            <div class="bottom" style="padding-top:10px; font-size:18px">
              <span>{{ each.edition }}</span>
            </div>
          </div>
        </el-card>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="form-bg-color" v-if="afterSelectFile"  style="padding: 30px 0px 30px 0px;">
      <el-col :span="18" :offset="3">
        <div style="margin: 20px 0px 20px 0px;">
          <el-row justify="end">
            <el-button @click="changeFile">Select Another</el-button>
            <el-button
              type="success"
              @click="onSubmit($refs.serialNumberForm)"
              :loading="loading"
            >
              Create
            </el-button>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { GET_PRODUCT } from '@/store/modules/product/actions-type';
import readXlsxFile from 'read-excel-file';
import { ElMessage } from 'element-plus';

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
      xlsxTemp: [],
      afterSelectFile: false,
      serialNumberForm: {
        productId: this.$route.params.id,
        serialNumbers: [],
      },
    };
  },
  methods: {
    onFileChange(e) {
      this.afterSelectFile = true;
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
              edition: rows[i][1].toString(),
            });
          }
          this.serialNumberForm.serialNumbers = result;
          console.log(this.serialNumberForm.serialNumbers);
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
            result.push({
              serialNumber: eachLine[0],
              edition: eachLine[1].replace(/\r/g, ''),
            });
          }
        }
        this.serialNumberForm.serialNumbers = result;
        console.log(this.serialNumberForm.serialNumbers);
      }
    },
    error(m) {
      ElMessage.error({
        showClose: true,
        message: m,
      });
    },
    changeFile() {
      this.afterSelectFile = false;
      // this.serialNumberDetails.serialNumbers = [];
    },
    go(sn) {
      window.open(`https://xm-landing.bsg-dev.tk/productprovenance?id=${sn}`, '_blank');
    },
    ...mapActions('product', [GET_PRODUCT]),
  },
  computed: {
    ...mapState('product', ['productDetails']),
  },
  mounted() {
    this.GET_PRODUCT(this.$route.params.id);
    this.serialNumberForm.productId = this.$route.params.id;
  },
  watch: {
    productDetails() {
      // this.serialNumberForm.serialNumbers = this.productDetails.productSerialNumbers;
      console.log(this.serialNumberForm.serialNumbers);
    },
  },
};
</script>
<style lang="scss">
  .dropbox {
    outline: 2px dashed grey; /* the dash box */
    outline-offset: -10px;
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

  .dropbox:hover {
    background: lightblue; /* when mouse over to the drop zone, change color */
  }

  .dropbox p {
    font-size: 1.2em;
    text-align: center;
    padding: 50px 0;
  }

  .font-text {
    font-family: 'ocr a std'
  }
</style>
