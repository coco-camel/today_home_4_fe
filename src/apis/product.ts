import { instance } from './axios';

const productAPI = {
  getProductAll: (pageParam: number) =>
    instance.get(`/api/v1/products`, {
      params: {
        page: pageParam,
        size: 20,
      },
    }),
};

export default productAPI;
