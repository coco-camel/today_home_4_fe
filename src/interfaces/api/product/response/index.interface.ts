export interface ProductDetailResponse {
  product: Product;
  review: Review;
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

export interface Review {
  contents: string;
  rating: number;
}
