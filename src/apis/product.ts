import { instance } from './axios';

const productAPI = {
  getProductAll: (pageParam: number) =>
    instance.get(
      `/api/v1/products?page=${pageParam}`,
    ),
};

export default productAPI;
