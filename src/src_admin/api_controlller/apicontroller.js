import axios from 'axios';

import baseUrl from '../screen/url';

const getToken = () => localStorage.getItem('accessTokenAdmin');


console.log("getToken",getToken);
const authHeader = () => ({ Authorization: `Bearer ${getToken()}` });

const handleFormData = (product) => {
  const formData = new FormData();
  formData.append('product_name', product.productName);
  formData.append('ratio_between', product.ratioBetween);
  formData.append('price', product.price);
  formData.append('plan_id', product.plan_id);
  formData.append('plan_name', product.plan_name);

  if (product.productImg || product.image instanceof File) {
    formData.append('productImg', product.productImg || product.image);
  }
  if (product._id) formData.append('product_id', product._id);

  return formData;
};

const ProductApi = {
  getAllProducts: async () => {
    try {
      const { data } = await axios.get(`${baseUrl}getAllProducts`, {
        headers: authHeader(),
      });
      return data.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  getPlanRecords: async () => {
    try {
      const { data } = await axios.get(`${baseUrl}getPlanRecords`, {
        headers: authHeader(),
      });
      return data.data;
    } catch (error) {
      console.error('Error fetching plans:', error);
      throw error;
    }
  },

    addProduct: async (newProduct) => {
        try {
        const { data } = await axios.post(`${baseUrl}addProduct`, handleFormData(newProduct), {
            headers: {
            'Content-Type': 'multipart/form-data',
            ...authHeader(),
            },
        });
        return data;
        } catch (error) {
        console.error('Error adding product:', error);
        throw error;
        }
    },

  updateProduct: async (editProduct) => {
    try {
      const { data } = await axios.post(`${baseUrl}updateProduct`, handleFormData(editProduct), {
        headers: {
          'Content-Type': 'multipart/form-data',
          ...authHeader(),
        },
      });
      return data;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  },

  deleteProduct: async (productId) => {
    try {
      const { data } = await axios.delete(`${baseUrl}deleteProducts`, {
        headers: authHeader(),
        data: { product_id: productId },
      });
      return data;
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  },
};

export default ProductApi;
