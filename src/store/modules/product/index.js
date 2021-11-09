import productServices from '@/services/product-service';
// import authServices from '@/services/auth-service';
// import accessServices from '@/services/access-service';
// import artistService from '@/services/artist-service';
import fileUploadServices from '@/services/file-upload-service';
import {
  GET_PRODUCT_LIST,
  GET_PRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  SEARCH_PRODUCT_IN_LIST,
  CREATE_DESIGN,
  PREVIEW_DESIGN,
  GET_DESIGNS,
  CREATE_SERIAL_NUMBER,
  GET_SERIAL_NUMBERS,
  SORT_PRODUCTS,
  FILTER_PRODUCT_IN_LIST,
  GET_PRODUCT_SERIES_LIST,
  GET_RELATED_PRODUCT_LIST,
  GET_SUSTAINABILITY_REPORT,
  CREATE_SUSTAINABILITY_REPORT,
} from '@/store/modules/product/actions-type';
import {
  GET_PRODUCT_LIST_START,
  GET_PRODUCT_LIST_SUCCESS,
  GET_PRODUCT_LIST_FAILURE,
  GET_PRODUCT_START,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_FAILURE,
  CREATE_PRODUCT_START,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAILURE,
  UPDATE_PRODUCT_START,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAILURE,
  SEARCHED_PRODUCT,
  SORTED_PRODUCTS,
  CREATE_DESIGN_START,
  CREATE_DESIGN_SUCCESS,
  CREATE_DESIGN_FAILURE,
  UPDATE_DESIGN_START,
  UPDATE_DESIGN_SUCCESS,
  UPDATE_DESIGN_FAILURE,
  GET_DESIGNS_START,
  GET_DESIGNS_SUCCESS,
  GET_DESIGNS_FAILURE,
  CREATE_SERIAL_NUMBER_START,
  CREATE_SERIAL_NUMBER_SUCCESS,
  CREATE_SERIAL_NUMBER_FAILURE,
  UPDATE_SERIAL_NUMBER_START,
  UPDATE_SERIAL_NUMBER_SUCCESS,
  UPDATE_SERIAL_NUMBER_FAILURE,
  GET_SERIAL_NUMBERS_START,
  GET_SERIAL_NUMBERS_SUCCESS,
  GET_SERIAL_NUMBERS_FAILURE,
  FILTERED_PRODUCT,
  GET_PRODUCT_SERIES_LIST_START,
  GET_PRODUCT_SERIES_LIST_SUCCESS,
  GET_PRODUCT_SERIES_LIST_FAILURE,
  CREATE_PRODUCT_SERIES_START,
  CREATE_PRODUCT_SERIES_SUCCESS,
  CREATE_PRODUCT_SERIES_FAILURE,
  GET_RELATED_PRODUCT_LIST_START,
  GET_RELATED_PRODUCT_LIST_SUCCESS,
  GET_RELATED_PRODUCT_LIST_FAILURE,
  PREVIEW_DESIGN_START,
  PREVIEW_DESIGN_SUCCESS,
  PREVIEW_DESIGN_FAILURE,
  CREATE_SUSTAINABILITY_REPORT_START,
  CREATE_SUSTAINABILITY_REPORT_SUCCESS,
  CREATE_SUSTAINABILITY_REPORT_FAILURE,
  GET_SUSTAINABILITY_REPORT_START,
  GET_SUSTAINABILITY_REPORT_SUCCESS,
  GET_SUSTAINABILITY_REPORT_FAILURE,
  UPDATE_SUSTAINABILITY_REPORT_START,
  UPDATE_SUSTAINABILITY_REPORT_SUCCESS,
  UPDATE_SUSTAINABILITY_REPORT_FAILURE,
} from '@/store/modules/product/mutations-type';
// import { DEFAULT_PROFILE_PICTURE } from '@/common/constants';
import { ElMessage, ElLoading } from 'element-plus';
import router from '@/router';

const state = {
  gettingProductList: false,
  newProductId: null,
  productList: [],
  productDetails: [],
  productSeriesList: [],
  designDetails: [],
  serialNumberDetails: [],
  creatingProduct: false,
  gettingProductDetails: false,
  gettingDesigns: false,
  gettingSerialNumbers: false,
  gettingProductSeries: false,
  updatingProduct: false,
  creatingDesign: false,
  updatingDesign: false,
  creatingSerialNumber: false,
  updatingSerialNumber: false,
  relatedProductList: [],
  gettingRelatedProductList: false,
  updateResult: null,
  updateSustainabilityResult: null,
  updateDesignResult: null,
  gettingPreviewDesign: false,
  previewDesign: [],
  gettingSustainabilityReportList: false,
  sustainabilityReportInfo: [],
  creatingSustainabilityReport: false,
  gettingSustainabilityReportDetails: false,
  updatingSustainabilityReport: false,
  newSustainabilityReportId: null,
  newDesignId: null,
};

const getters = {
  getProducts: (state) => (parmas) => {
    const paginationDetails = {
      itemPerPage: parmas.itemPerPage,
      totalRecord: state.productList.length,
      currentPage: parmas.currentPage,
    };
    const data = {
      pagination: paginationDetails,
      data: state.productList.slice(
        (parmas.itemPerPage * parmas.currentPage),
        (parmas.itemPerPage * (parmas.currentPage + 1)),
      ),
    };

    return data;
  },
  getProductSerials: (state) => (parmas) => {
    const paginationDetails = {
      itemPerPage: parmas.itemPerPage,
      totalRecord: state.productDetails.productSerialNumbers.length,
      currentPage: parmas.currentPage,
    };
    const data = {
      pagination: paginationDetails,
      data: state.productDetails.productSerialNumbers.slice(
        (parmas.itemPerPage * parmas.currentPage),
        (parmas.itemPerPage * (parmas.currentPage + 1)),
      ),
    };

    return data;
  },
};

const actions = {
  [GET_PRODUCT_LIST]({ commit }) {
    const fullpageLoader = ElLoading.service({
      fullscreen: true,
    });
    commit(GET_PRODUCT_LIST_START);
    productServices.getProducts().then(
      (data) => {
        const sortedProducts = data.sort((a, b) => {
          const atime = new Date(a.productCreatedDate).getTime();
          const btime = new Date(b.productCreatedDate).getTime();
          let val = 0;
          val = btime - atime;
          return val;
        });
        commit(GET_PRODUCT_LIST_SUCCESS, sortedProducts);
      },
      () => {
        commit(GET_PRODUCT_LIST_FAILURE);
      },
    ).finally(() => {
      fullpageLoader.close();
    });
  },
  [GET_PRODUCT]({ commit }, productId) {
    const fullpageLoader = ElLoading.service({
      fullscreen: true,
    });
    commit(GET_PRODUCT_START);
    productServices.getProduct(productId).then(
      (data) => {
        commit(GET_PRODUCT_SUCCESS, data);
      },
      () => {
        commit(GET_PRODUCT_FAILURE);
      },
    ).finally(() => {
      fullpageLoader.close();
    });
  },
  async [CREATE_PRODUCT]({ commit }, productDetails) {
    const fullpageLoader = ElLoading.service({
      fullscreen: true,
    });

    // upload
    let productPicUrl = productDetails.productDisplayPhotoFilePath;
    if (productDetails.productImageFile) {
      await fileUploadServices.uploadFile(productDetails.productImageFile).then(
        (uploadData) => {
          productPicUrl = process.env.VUE_APP_FILE_DOMAIN + uploadData;
        },
      );
    }
    let productCoverPicUrl = productDetails.productDisplayPhotoFilePath;
    if (productDetails.productCoverImageFile) {
      await fileUploadServices.uploadFile(productDetails.productCoverImageFile).then(
        (uploadData) => {
          productCoverPicUrl = process.env.VUE_APP_FILE_DOMAIN + uploadData;
        },
      );
    }
    const productImagesUrl = [];
    if (productDetails.productImagesFile) {
      /* eslint-disable no-await-in-loop */
      for (let i = 0; i < productDetails.productImagesFile.length; i++) {
        await fileUploadServices.uploadFile(productDetails.productImagesFile[i]).then(
          (uploadData) => {
            productImagesUrl.push(process.env.VUE_APP_FILE_DOMAIN + uploadData);
          },
        );
      }
      /* eslint-enable no-await-in-loop */
    }
    // end of: upload

    const productDetailsSource = {
      ...productDetails,
      productImages: productImagesUrl,
      productDisplayImage: productPicUrl,
      productBackgroundImage: productCoverPicUrl,
    };
    const productDetailsArray = [];
    productDetailsArray.push(productDetailsSource);
    commit(CREATE_PRODUCT_START);
    productServices.createProduct(productDetailsArray).then(
      (data) => {
        ElMessage.success({
          showClose: true,
          message: 'Product created successfully',
        });
        commit(CREATE_PRODUCT_SUCCESS, data[0]);
        // router.push('/allproducts');
      },
      (error) => {
        ElMessage.error({
          showClose: true,
          message: error,
        });
        commit(CREATE_PRODUCT_FAILURE);
      },
    ).finally(() => {
      fullpageLoader.close();
    });
  },
  async [UPDATE_PRODUCT]({ commit }, productDetails) {
    const fullpageLoader = ElLoading.service({
      fullscreen: true,
    });
    // upload
    let productPicUrl = productDetails.productImageUrl;

    if (productDetails.productImageFile) {
      await fileUploadServices.uploadFile(productDetails.productImageFile).then(
        (uploadData) => {
          productPicUrl = process.env.VUE_APP_FILE_DOMAIN + uploadData;
        },
      );
    }
    let productCoverPicUrl = productDetails.oriProductCoverImageUrl;

    if (productDetails.productCoverImageFile) {
      await fileUploadServices.uploadFile(productDetails.productCoverImageFile).then(
        (uploadData) => {
          productCoverPicUrl = process.env.VUE_APP_FILE_DOMAIN + uploadData;
        },
      );
    }
    const newProductImagesUrl = [];
    if (productDetails.productImagesFile) {
      /* eslint-disable no-await-in-loop */
      for (let i = 0; i < productDetails.productImagesFile.length; i++) {
        await fileUploadServices.uploadFile(productDetails.productImagesFile[i]).then(
          (uploadData) => {
            newProductImagesUrl.push(process.env.VUE_APP_FILE_DOMAIN + uploadData);
          },
        );
      }
      /* eslint-enable no-await-in-loop */
    }

    let existing = [];
    if (productDetails.forDeleteImages.length > 0) {
      for (let i = 0; i < productDetails.existingImages.length; i++) {
        const exist = productDetails.forDeleteImages.includes(productDetails.existingImages[i]);
        if (!exist) {
          existing.push(productDetails.existingImages[i]);
        }
      }
    } else {
      existing = productDetails.existingImages;
    }

    const productImagesUrl = newProductImagesUrl.concat(existing);

    // end of: upload
    const productDetailsSource = {
      ...productDetails,
      productImages: productImagesUrl,
      productDisplayImage: productPicUrl,
      productBackgroundImage: productCoverPicUrl,
    };

    productServices.updateProduct(productDetailsSource).then(
      () => {
        ElMessage.success({
          showClose: true,
          message: 'Product updated successfully',
        });
        let def = false;
        if ((productDetails.licenseId !== productDetails.oriLicenseId) || (productDetails.licenseId !== productDetails.oriLicenseId)) {
          def = true;
        }
        const result = [];
        result.push({
          defaultRelationship: def,
          next: productDetails.next,
        });
        commit(UPDATE_PRODUCT_SUCCESS, result);
        // router.push(`/product/${productDetailsSource.productId}/details`);
      },
      (error) => {
        ElMessage.error({
          showClose: true,
          message: error,
        });
        commit(UPDATE_PRODUCT_FAILURE);
      },
    ).finally(() => {
      fullpageLoader.close();
    });
  },
  [SEARCH_PRODUCT_IN_LIST]({ commit, state }, searchKeyword) {
    const productList = [...state.oriProductList];
    const searchedList = searchKeyword ?
      productList.filter((x) => x.productName.toLowerCase().includes(searchKeyword.toLowerCase())) :
      productList;
    commit(SEARCHED_PRODUCT, searchedList);
  },
  [FILTER_PRODUCT_IN_LIST]({ commit, state }, licenseId) {
    const productList = [...state.oriProductList];
    const filteredList = licenseId ?
      productList.filter((x) => x.character.license.licenseId.toLowerCase().includes(licenseId.toLowerCase())) :
      productList;
    commit(FILTERED_PRODUCT, filteredList);
  },
  [SORT_PRODUCTS]({ commit, state }, sortBy) {
    const productList = [...state.oriProductList];
    const sortedProducts = productList.sort((a, b) => {
      const atime = new Date(a.productCreatedDate).getTime();
      const btime = new Date(b.productCreatedDate).getTime();
      let val = 0;
      if (sortBy === 'newest') {
        val = btime - atime;
      } else {
        val = atime - btime;
      }
      return val;
    });
    commit(SORTED_PRODUCTS, sortedProducts);
  },

  async [CREATE_DESIGN]({ commit }, designDetails) {
    const fullpageLoader = ElLoading.service({
      fullscreen: true,
    });
    // delete existing design
    if (designDetails.inputs.length > 0) {
      /* eslint-disable no-await-in-loop */
      for (let i = 0; i < designDetails.forDelete.length; i++) {
        await productServices.deleteDesign(designDetails.forDelete[i].designId).then(() => {
          /*
          */
        });
      }
      /* eslint-enable no-await-in-loop */
    }
    // end of: delete

    // upload
    const updateDesigns = [];
    const newDesigns = [];
    const selectedProductId = designDetails.productId;
    if (designDetails.inputs.length > 0) {
      /* eslint-disable no-await-in-loop */
      for (let i = 0; i < designDetails.inputs.length; i++) {
        // handle existing image here
        let designImageFileDefault = designDetails.inputs[i].designImageUrl;
        let designFileTypeDefault = designDetails.inputs[i].designFileType;
        if (designDetails.inputs[i].designImageFile) {
          await fileUploadServices.uploadFile(designDetails.inputs[i].designImageFile).then(
            (uploadData) => {
              designImageFileDefault = process.env.VUE_APP_FILE_DOMAIN + uploadData;
              designFileTypeDefault = designDetails.inputs[i].designImageFile.type;
            },
          );
        }
        if (designDetails.inputs[i].designId) {
          updateDesigns.push({
            productId: selectedProductId,
            designFilePath: designImageFileDefault,
            designFileType: designFileTypeDefault,
            designConcept: designDetails.inputs[i].designConcept,
            designArtistId: designDetails.inputs[i].designArtistId,
            designId: designDetails.inputs[i].designId,
          });
        } else {
          newDesigns.push({
            productId: selectedProductId,
            designFilePath: designImageFileDefault,
            designFileType: designFileTypeDefault,
            designConcept: designDetails.inputs[i].designConcept,
            designArtistId: designDetails.inputs[i].designArtistId,
            designId: designDetails.inputs[i].designId,
          });
        }
        // end of: handle existing image here
      }
      /* eslint-enable no-await-in-loop */
    }
    // end of: upload

    if (newDesigns.length > 0) {
      commit(CREATE_DESIGN_START);
      await productServices.createDesign(newDesigns).then(
        (data) => {
          ElMessage.success({
            showClose: true,
            message: 'Design created successfully',
          });
          commit(CREATE_DESIGN_SUCCESS, data[0]);
          router.push(`/product/${designDetails.productId}/designs`);
        },
        (error) => {
          ElMessage.error({
            showClose: true,
            message: error,
          });
          commit(CREATE_DESIGN_FAILURE);
        },
      ).finally(() => {
        if (updateDesigns.length === 0) {
          fullpageLoader.close();
        }
      });
    }

    if (updateDesigns.length > 0) {
      for (let i = 0; i < updateDesigns.length; i++) {
        /* eslint-disable no-await-in-loop */
        commit(UPDATE_DESIGN_START);
        await productServices.updateDesign(updateDesigns[i]).then(
          () => {
            if (i === (updateDesigns.length - 1)) {
              ElMessage.success({
                showClose: true,
                message: 'Design updated successfully',
              });
            }
            const result = [];
            result.push({
              next: designDetails.next,
            });
            commit(UPDATE_DESIGN_SUCCESS, result);
            // router.push(`/product/${designDetails.productId}/designs`);
          },
          (error) => {
            ElMessage.error({
              showClose: true,
              message: error,
            });
            commit(UPDATE_DESIGN_FAILURE);
          },
        ).finally(() => {
          fullpageLoader.close();
        });
        /* eslint-disable no-await-in-loop */
      }
    }
  },
  [GET_DESIGNS]({ commit }, productId) {
    // const fullpageLoader = ElLoading.service({
    //   fullscreen: true,
    // });
    commit(GET_DESIGNS_START);
    productServices.getDesigns(productId).then(
      (data) => {
        commit(GET_DESIGNS_SUCCESS, data);
      },
      () => {
        commit(GET_DESIGNS_FAILURE);
      },
    );
    // .finally(() => {
    //   fullpageLoader.close();
    // });
  },
  [GET_PRODUCT_SERIES_LIST]({ commit }, licenseId) {
    const fullpageLoader = ElLoading.service({
      fullscreen: true,
    });
    commit(GET_PRODUCT_SERIES_LIST_START);
    productServices.getProductSeries(licenseId).then(
      (data) => {
        // const sortedProducts = data.sort((a, b) => {
        //   const atime = new Date(a.productCreatedDate).getTime();
        //   const btime = new Date(b.productCreatedDate).getTime();
        //   let val = 0;
        //   val = btime - atime;
        //   return val;
        // });
        commit(GET_PRODUCT_SERIES_LIST_SUCCESS, data);
      },
      () => {
        commit(GET_PRODUCT_SERIES_LIST_FAILURE);
      },
    ).finally(() => {
      fullpageLoader.close();
    });
  },
  async [CREATE_SERIAL_NUMBER]({ commit }, serialNumberDetails) {
    // serialNumberDetails.serialNumbers.shift();
    const fullpageLoader = ElLoading.service({
      fullscreen: true,
    });
    commit(CREATE_SERIAL_NUMBER_START);
    if (serialNumberDetails.forDeleteSN.length > 0) {
      // delete existing design
      /* eslint-disable no-await-in-loop */
      const sn = [];
      for (let i = 0; i < serialNumberDetails.forDeleteSN.length; i++) {
        sn.push(serialNumberDetails.forDeleteSN[i]);
      }
      const productSerialNumberIds = {
        productSerialNumberIds: sn,
      };

      await productServices.deactivateSerialNumber(productSerialNumberIds).then(
        () => {
          ElMessage.success({
            showClose: true,
            message: 'Serial numbers updated successfully',
          });
          commit(CREATE_SERIAL_NUMBER_SUCCESS);
          router.push(`/product/${serialNumberDetails.productId}/details`);
        },
        (error) => {
          ElMessage.error({
            showClose: true,
            message: error,
          });
          commit(CREATE_SERIAL_NUMBER_FAILURE);
        },
      ).finally(() => {
        fullpageLoader.close();
      });
      /* eslint-enable no-await-in-loop */
      // end of: delete
    } else {
      await productServices.createSerialNumber(serialNumberDetails.serialNumbers, serialNumberDetails.productId).then(
        () => {
          ElMessage.success({
            showClose: true,
            message: 'Serial numbers created successfully',
          });
          commit(CREATE_SERIAL_NUMBER_SUCCESS);
          router.push(`/product/${serialNumberDetails.productId}/details`);
        },
        (error) => {
          ElMessage.error({
            showClose: true,
            message: error,
          });
          commit(CREATE_SERIAL_NUMBER_FAILURE);
        },
      ).finally(() => {
        fullpageLoader.close();
      });
    }
  },
  [GET_SERIAL_NUMBERS]({ commit }, productId) {
    // const fullpageLoader = ElLoading.service({
    //   fullscreen: true,
    // });
    commit(GET_DESIGNS_START);
    productServices.getDesigns(productId).then(
      (data) => {
        commit(GET_DESIGNS_SUCCESS, data);
      },
      () => {
        commit(GET_DESIGNS_FAILURE);
      },
    );
    // .finally(() => {
    //   fullpageLoader.close();
    // });
  },
  [GET_RELATED_PRODUCT_LIST]({ commit }, criteria) {
    const fullpageLoader = ElLoading.service({
      fullscreen: true,
    });
    commit(GET_RELATED_PRODUCT_LIST_START);
    productServices.getRelatedProducts(criteria).then(
      (data) => {
        commit(GET_RELATED_PRODUCT_LIST_SUCCESS, data);
      },
      () => {
        commit(GET_RELATED_PRODUCT_LIST_FAILURE);
      },
    ).finally(() => {
      fullpageLoader.close();
    });
  },
  [PREVIEW_DESIGN]({ commit }, previewForm) {
    const fullpageLoader = ElLoading.service({
      fullscreen: true,
    });
    commit(PREVIEW_DESIGN_START);
    productServices.previewDesign(previewForm).then(
      (data) => {
        commit(PREVIEW_DESIGN_SUCCESS, data);
      },
      () => {
        commit(PREVIEW_DESIGN_FAILURE);
      },
    ).finally(() => {
      fullpageLoader.close();
    });
  },
  [GET_SUSTAINABILITY_REPORT]({ commit }, productId) {
    const fullpageLoader = ElLoading.service({
      fullscreen: true,
    });
    commit(GET_SUSTAINABILITY_REPORT_START);
    productServices.getSustainabilityReport(productId).then(
      (data) => {
        commit(GET_SUSTAINABILITY_REPORT_SUCCESS, data);
      },
      () => {
        commit(GET_SUSTAINABILITY_REPORT_FAILURE);
      },
    ).finally(() => {
      fullpageLoader.close();
    });
  },
  async [CREATE_SUSTAINABILITY_REPORT]({ commit }, sustainabilityReportInfo) {
    const fullpageLoader = ElLoading.service({
      fullscreen: true,
    });
    /* Update */
    if (sustainabilityReportInfo.sustainabilityReportId) {
      let reportImage = sustainabilityReportInfo.displayImageUrl;
      if (sustainabilityReportInfo.displayImageFile) {
        await fileUploadServices.uploadFile(sustainabilityReportInfo.displayImageFile).then(
          (uploadData) => {
            reportImage = process.env.VUE_APP_FILE_DOMAIN + uploadData;
          },
        );
      }
      let reportFile = sustainabilityReportInfo.reportFileUrl;
      if (sustainabilityReportInfo.reportFile) {
        await fileUploadServices.uploadFile(sustainabilityReportInfo.reportFile).then(
          (uploadData) => {
            reportFile = process.env.VUE_APP_FILE_DOMAIN + uploadData;
          },
        );
      }
      const sustainabilityReports = {
        productId: sustainabilityReportInfo.productId,
        sustainabilityReportDescription: sustainabilityReportInfo.summary,
        sustainabilityReportDetail: JSON.stringify(sustainabilityReportInfo.resourcesSaved),
        sustainabilityReportImg: reportImage,
        sustainabilityReportFile: reportFile,
      };
      commit(UPDATE_SUSTAINABILITY_REPORT_START);
      productServices.updateSustainabilityReport(sustainabilityReports).then(
        () => {
          ElMessage.success({
            showClose: true,
            message: 'SustainabilityReport updated successfully',
          });
          const result = [];
          result.push({
            next: sustainabilityReportInfo.next,
          });
          commit(UPDATE_SUSTAINABILITY_REPORT_SUCCESS, result);
          // router.push('/allproducts');
        },
        (error) => {
          ElMessage.error({
            showClose: true,
            message: error,
          });
          commit(UPDATE_SUSTAINABILITY_REPORT_FAILURE);
        },
      ).finally(() => {
        fullpageLoader.close();
      });
    } else { /* Create */
      let reportImage = null;
      await fileUploadServices.uploadFile(sustainabilityReportInfo.displayImageFile).then(
        (uploadData) => {
          reportImage = process.env.VUE_APP_FILE_DOMAIN + uploadData;
        },
      );
      let reportFile = null;
      await fileUploadServices.uploadFile(sustainabilityReportInfo.reportFile).then(
        (uploadData) => {
          reportFile = process.env.VUE_APP_FILE_DOMAIN + uploadData;
        },
      );

      // array.filter(value => Object.keys(value).length !== 0);
      const reportInfo = sustainabilityReportInfo.resourcesSaved
        .filter((value) => (Object.keys(value.totalSave).length !== 0 && Object.keys(value.resourceAndSaveMethod).length !== 0));

      const sustainabilityReports = {
        productId: sustainabilityReportInfo.productId,
        sustainabilityReportDescription: sustainabilityReportInfo.summary,
        sustainabilityReportDetail: JSON.stringify(reportInfo),
        // sustainabilityReportDetail: sustainabilityReportInfo.resourcesSaved,
        sustainabilityReportImg: reportImage,
        sustainabilityReportFile: reportFile,
      };
      commit(CREATE_SUSTAINABILITY_REPORT_START);
      productServices.createSustainabilityReport(sustainabilityReports).then(
        (data) => {
          ElMessage.success({
            showClose: true,
            message: 'SustainabilityReport created successfully',
          });
          commit(CREATE_SUSTAINABILITY_REPORT_SUCCESS, data[0]);
          // router.push('/allproducts');
        },
        (error) => {
          ElMessage.error({
            showClose: true,
            message: error,
          });
          commit(CREATE_SUSTAINABILITY_REPORT_FAILURE);
        },
      ).finally(() => {
        fullpageLoader.close();
      });
    }
  },
};

const mutations = {
  [GET_PRODUCT_LIST_START](state) {
    state.gettingProductList = true;
  },
  [GET_PRODUCT_LIST_SUCCESS](state, data) {
    state.gettingProductList = false;
    state.productList = data;
    state.oriProductList = data;
  },
  [GET_PRODUCT_LIST_FAILURE](state) {
    state.productList = [];
    state.gettingProductList = false;
    state.oriProductList = [];
  },
  [GET_PRODUCT_START](state) {
    state.gettingProductDetails = true;
  },
  [GET_PRODUCT_SUCCESS](state, data) {
    state.gettingProductDetails = false;
    state.productDetails = data;
    state.oriProduct = data;
  },
  [GET_PRODUCT_FAILURE](state) {
    state.productDetails = [];
    state.gettingProductDetails = false;
    state.oriProduct = [];
  },

  ///
  [PREVIEW_DESIGN_START](state) {
    state.gettingPreviewDesign = true;
  },
  [PREVIEW_DESIGN_SUCCESS](state, data) {
    state.gettingPreviewDesign = false;
    state.previewDesign = data;
  },
  [PREVIEW_DESIGN_FAILURE](state) {
    state.gettingPreviewDesign = false;
  },
  ///
  [GET_RELATED_PRODUCT_LIST_START](state) {
    state.gettingRelatedProductList = true;
  },
  [GET_RELATED_PRODUCT_LIST_SUCCESS](state, data) {
    state.gettingRelatedProductList = false;
    state.relatedProductList = data;
    state.oriRelatedProductList = data;
  },
  [GET_RELATED_PRODUCT_LIST_FAILURE](state) {
    state.relatedProductList = [];
    state.gettingRelatedProductList = false;
    state.oriRelatedProductList = [];
  },
  ///

  [GET_PRODUCT_SERIES_LIST_START](state) {
    state.gettingProductSeriesList = true;
  },
  [GET_PRODUCT_SERIES_LIST_SUCCESS](state, data) {
    state.gettingProductSeriesList = false;
    state.productSeriesList = data;
    state.oriProductSeriesList = data;
  },
  [GET_PRODUCT_SERIES_LIST_FAILURE](state) {
    state.productSeriesList = [];
    state.gettingProductSeriesList = false;
    state.oriProductSeriesList = [];
  },
  [CREATE_PRODUCT_SERIES_START](state) {
    state.creatingProductSeries = true;
  },
  [CREATE_PRODUCT_SERIES_SUCCESS](state) {
    state.creatingProductSeries = false;
  },
  [CREATE_PRODUCT_SERIES_FAILURE](state) {
    state.creatingProductSeries = false;
  },

  ///
  [GET_DESIGNS_START](state) {
    state.gettingDesigns = true;
  },
  [GET_DESIGNS_SUCCESS](state, data) {
    state.gettingDesigns = false;
    state.designDetails = data;
    state.oriDesign = data;
  },
  [GET_DESIGNS_FAILURE](state) {
    state.designDetails = [];
    state.gettingDesigns = false;
    state.oriDesign = [];
  },
  [CREATE_DESIGN_START](state) {
    state.creatingDesign = true;
  },
  [CREATE_DESIGN_SUCCESS](state, data) {
    state.creatingDesign = false;
    state.newDesignId = data;
  },
  [CREATE_DESIGN_FAILURE](state) {
    state.creatingDesign = false;
  },
  [UPDATE_DESIGN_START](state) {
    state.updatingDesign = true;
  },
  [UPDATE_DESIGN_SUCCESS](state, data) {
    state.updatingDesign = false;
    state.updateDesignResult = data;
  },
  [UPDATE_DESIGN_FAILURE](state) {
    state.updatingDesign = false;
  },
  ///

  ///
  [GET_SERIAL_NUMBERS_START](state) {
    state.gettingSerialNumbers = true;
  },
  [GET_SERIAL_NUMBERS_SUCCESS](state, data) {
    state.gettingSerialNumbers = false;
    state.serialNumberDetails = data;
    state.oriSerialNumber = data;
  },
  [GET_SERIAL_NUMBERS_FAILURE](state) {
    state.serialNumberDetails = [];
    state.gettingSerialNumbers = false;
    state.oriSerialNumber = [];
  },
  [CREATE_SERIAL_NUMBER_START](state) {
    state.creatingSerialNumber = true;
  },
  [CREATE_SERIAL_NUMBER_SUCCESS](state) {
    state.creatingSerialNumber = false;
  },
  [CREATE_SERIAL_NUMBER_FAILURE](state) {
    state.creatingSerialNumber = false;
  },
  [UPDATE_SERIAL_NUMBER_START](state) {
    state.updatingSerialNumber = true;
  },
  [UPDATE_SERIAL_NUMBER_SUCCESS](state) {
    state.updatingSerialNumber = false;
  },
  [UPDATE_SERIAL_NUMBER_FAILURE](state) {
    state.updatingSerialNumber = false;
  },
  ///

  [CREATE_PRODUCT_START](state) {
    state.creatingProduct = true;
  },
  [CREATE_PRODUCT_SUCCESS](state, data) {
    state.creatingProduct = false;
    state.newProductId = data;
  },
  [CREATE_PRODUCT_FAILURE](state) {
    state.creatingProduct = false;
  },
  [UPDATE_PRODUCT_START](state) {
    state.updatingProduct = true;
  },
  [UPDATE_PRODUCT_SUCCESS](state, data) {
    state.updatingProduct = false;
    state.updateResult = data;
  },
  [UPDATE_PRODUCT_FAILURE](state) {
    state.updatingProduct = false;
  },
  [SEARCHED_PRODUCT](state, data) {
    state.productList = data;
  },
  [SORTED_PRODUCTS](state, data) {
    state.productList = data;
  },
  [FILTERED_PRODUCT](state, data) {
    state.productList = data;
  },
  [GET_SUSTAINABILITY_REPORT_START](state) {
    state.gettingSustainabilityReportDetails = true;
  },
  [GET_SUSTAINABILITY_REPORT_SUCCESS](state, data) {
    state.gettingSustainabilityReportDetails = false;
    state.sustainabilityReportInfo = data;
    state.oriSustainabilityReport = data;
  },
  [GET_SUSTAINABILITY_REPORT_FAILURE](state) {
    state.sustainabilityReportInfo = [];
    state.gettingSustainabilityReportDetails = false;
    state.oriSustainabilityReport = [];
  },
  [CREATE_SUSTAINABILITY_REPORT_START](state) {
    state.creatingSustainabilityReport = true;
  },
  [CREATE_SUSTAINABILITY_REPORT_SUCCESS](state, data) {
    state.newSustainabilityReportId = data;
    state.creatingSustainabilityReport = false;
  },
  [CREATE_SUSTAINABILITY_REPORT_FAILURE](state) {
    state.creatingSustainabilityReport = false;
  },
  [UPDATE_SUSTAINABILITY_REPORT_START](state) {
    state.updatingSustainabilityReport = true;
  },
  [UPDATE_SUSTAINABILITY_REPORT_SUCCESS](state, data) {
    state.updatingSustainabilityReport = false;
    state.updateSustainabilityResult = data;
  },
  [UPDATE_SUSTAINABILITY_REPORT_FAILURE](state) {
    state.updatingSustainabilityReport = false;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
