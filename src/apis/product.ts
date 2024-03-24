import { instance } from './axios';

const productAPI = {
  getProductAll: (page: number) =>
    instance.get(`/api/v1/products?page=${page}`)
};

export default productAPI;
