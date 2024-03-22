import { ReviewData } from '../interfaces/productDetail/productDetail.interface';
import { authInstance } from './axios';

export const reviewRegistration = async ({contents, rating, productId}: ReviewData) => {
  console.log({contents, rating, productId});

  const { data } = await authInstance.post(`/api/v1/reviews/${productId}`, {contents, rating})
  return data;
};


