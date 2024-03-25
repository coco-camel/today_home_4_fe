import { authInstance } from './axios';

const bookMarkAPI = {
  addBookMark: (productId: number) =>
    authInstance.post(
      `/api/v1/bookmarks/${productId}`,
    ),
  delBookMark: (productId: number) =>
    authInstance.delete(
      `/api/v1/bookmarks/${productId}`,
    ),
};

export default bookMarkAPI;
