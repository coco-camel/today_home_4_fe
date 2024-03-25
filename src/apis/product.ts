import { authInstance } from './axios';
const productAPI = {
  getProductAll: (pageParam: number) =>
    authInstance.get(`/api/v1/products`, {
      params: {
        page: pageParam,
        size: 20,
      },
    }),
};

export default productAPI;
