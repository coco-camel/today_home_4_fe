import { ReviewData } from '../interfaces/productDetail/productDetail.interface';
import { authInstance } from './axios';
import { ReivewInput } from '../interfaces/modal/ReviewModal.interface';

export const postAddReview = async ({
  contents,
  rating,
  productId,
}: ReviewData) => {
  console.log({ contents, rating, productId });

  const { data } = await authInstance.post(
    `/api/v1/reviews/${productId}`,
    { contents, rating },
  );
  return data;
};

export const putModifyReview = async ({
  contents,
  rating,
  id,
}: ReivewInput) => {
  const { data } = await authInstance.put(
    `/api/v1/reviews/${id}`,
    { contents, rating },
  );
  return data;
};
