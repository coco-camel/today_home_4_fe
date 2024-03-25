export interface ProductDetailResponse {
  product: Product;
  reviews: Reviews[];
}

export interface Product {
  brand: string;
  createdAt: string;
  discount: number;
  imageUrl: string;
  isFreeDelivery: boolean;
  isSpecialPrice: boolean;
  name: string;
  price: number;
  productId: string;
}

export interface Reviews {
  nickname: string;
  contents: string;
  rating: number;
  reviewId : number;
  createdAt: string;
}
