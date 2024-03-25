import { authInstance } from './axios';

const bookMarkAPI = {
  addBookMark: async (productId:number) => {
    const { data } = await authInstance.post(
      `/api/v1/bookmarks/${productId}`
    );
    return data;
  },
  delBookMark: async (productId:number) => {
    const { data } = await authInstance.delete(
      `/api/v1/bookmarks/${productId}`
    );
    console.log('데이터다',productId);
    return data;
  }
};


export default bookMarkAPI;
