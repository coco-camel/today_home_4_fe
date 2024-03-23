import { instance } from './axios';

const productAPI = {
  getProductAll: () =>
    instance.get(`/api/v1/products?page=${1}`),
};

export default productAPI;
