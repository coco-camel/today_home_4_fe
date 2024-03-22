import { authInstance, instance } from './axios';
import { ServerResponse } from '../interfaces/api/common.interface';
import {
  Product,
  ProductDetailResponse,
  Review,
} from '../interfaces/api/product/response/index.interface';
import axios from 'axios';

export const selectiveproduct = async (
  id?: string,
) => {
  const { data } = await instance.get<
    ServerResponse<ProductDetailResponse>
  >(`/api/v1/products/${id}`);
  return data;
};
