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
  GET_DESIGNS,
  CREATE_SERIAL_NUMBER,
  GET_SERIAL_NUMBERS,
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
} from '@/store/modules/product/mutations-type';
// import { DEFAULT_PROFILE_PICTURE } from '@/common/constants';
import { ElMessage, ElLoading } from 'element-plus';
import router from '@/router';

const state = {
  gettingProductList: false,
  productList: [],
  productDetails: [],
  designDetails: [],
  serialNumberDetails: [],
  creatingProduct: false,
  gettingProductDetails: false,
  gettingDesigns: false,
  gettingSerialNumbers: false,
  updatingProduct: false,
  creatingDesign: false,
  updatingDesign: false,
  creatingSerialNumber: false,
  updatingSerialNumber: false,
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
        commit(GET_PRODUCT_LIST_SUCCESS, data);
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
    console.log(productDetailsSource);
    const productDetailsArray = [];
    productDetailsArray.push(productDetailsSource);
    commit(CREATE_PRODUCT_START);
    productServices.createProduct(productDetailsArray).then(
      () => {
        ElMessage.success({
          showClose: true,
          message: 'Product created successfully',
        });
        commit(CREATE_PRODUCT_SUCCESS);
        router.push('/allproducts');
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
        commit(UPDATE_PRODUCT_SUCCESS);
        router.push('/allproducts');
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

    console.log(updateDesigns);
    console.log(newDesigns);

    if (newDesigns.length > 0) {
      commit(CREATE_DESIGN_START);
      await productServices.createDesign(newDesigns).then(
        () => {
          ElMessage.success({
            showClose: true,
            message: 'Design created successfully',
          });
          commit(CREATE_DESIGN_SUCCESS);
          router.push('/allproducts');
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
            commit(UPDATE_DESIGN_SUCCESS);
            router.push('/allproducts');
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

  async [CREATE_SERIAL_NUMBER]({ commit }, serialNumberDetails) {
    // serialNumberDetails.serialNumbers.shift();
    // console.log(serialNumberDetails);
    const fullpageLoader = ElLoading.service({
      fullscreen: true,
    });
    commit(CREATE_SERIAL_NUMBER_START);
    await productServices.createSerialNumber(serialNumberDetails.serialNumbers, serialNumberDetails.productId).then(
      () => {
        ElMessage.success({
          showClose: true,
          message: 'Design created successfully',
        });
        commit(CREATE_SERIAL_NUMBER_SUCCESS);
        router.push('/allproducts');
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
  [CREATE_DESIGN_SUCCESS](state) {
    state.creatingDesign = false;
  },
  [CREATE_DESIGN_FAILURE](state) {
    state.creatingDesign = false;
  },
  [UPDATE_DESIGN_START](state) {
    state.updatingDesign = true;
  },
  [UPDATE_DESIGN_SUCCESS](state) {
    state.updatingDesign = false;
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
  [CREATE_PRODUCT_SUCCESS](state) {
    state.creatingProduct = false;
  },
  [CREATE_PRODUCT_FAILURE](state) {
    state.creatingProduct = false;
  },
  [UPDATE_PRODUCT_START](state) {
    state.updatingProduct = true;
  },
  [UPDATE_PRODUCT_SUCCESS](state) {
    state.updatingProduct = false;
  },
  [UPDATE_PRODUCT_FAILURE](state) {
    state.updatingProduct = false;
  },
  [SEARCHED_PRODUCT](state, data) {
    state.productList = data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
