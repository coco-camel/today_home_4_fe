import { instance } from './axios';

const productAPI = {
  getProductAll: () =>
    instance.get('/api/v1/products'),
};

export default productAPI;
