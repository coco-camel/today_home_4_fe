import { instance } from './axios';
import { ServerResponse } from '../interfaces/api/common.interface';
import { ProductDetailResponse } from '../interfaces/api/product/response/index.interface';

export const selectiveproduct = async (
  id?: string,
) => {
  const { data } = await instance.get<
    ServerResponse<ProductDetailResponse>
  >(`/api/v1/products/${id}`);
  return data;
};
