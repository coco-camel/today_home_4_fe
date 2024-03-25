import { authInstance } from './axios';

export const scrapList = async (page: number) => {
  try {
    const res = await authInstance.get(
      '/api/v1/members/bookmarks',
      {
        params: {
          page,
          size: 10,
        },
      },
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};
