<template>
  <div>
    <h2>Select a file</h2>
    <input type="file" @change="onFileChange">
  </div>
</template>

<script>
import readXlsxFile from 'read-excel-file';
import { ElMessage } from 'element-plus';

export default {
  components: {
  },
  data() {
    return {
      files: '',
      serialNumberForm: {
        productId: this.$route.params.id,
        serialNumbers: [],
      },
    };
  },
  watch: {
    sourceCSV() {
      console.log(this.sourceCSV);
    },
  },
  methods: {
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
        readXlsxFile(f).then((rows) => {
          this.serialNumberForm.serialNumbers = rows;
          console.log(this.serialNumberForm.serialNumbers);
        });
      } else {
        this.error('Cannot read file !');
      }
    },
    csvJSON(csv) {
      const numberOfLines = csv.split('\n');
      if (numberOfLines[0].split(',').length !== 2) {
        this.error('You CSV file has wrong number of columns, it has to be 2 columns, named "Serial Number" and "Created By"');
      } else {
        let eachLine = [];
        const result = [];
        for (let i = 0; i < numberOfLines.length; i++) {
          eachLine = numberOfLines[i].split(',');
          for (let c = 1; c < eachLine.length; c++) {
            result.push([eachLine[0], eachLine[1].replace(/\r/g, '')]);
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
  },
};
</script>
