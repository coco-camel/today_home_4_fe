export interface Root {
  status: boolean;
  message: string;
  data: Data;
}

export interface Data {
  products: Product[];
}

export interface Product {
  productId: number;
  brand: string;
  name: string;
  discount: number;
  price: number;
  imageUrl: string;
  isFreeDelivery: true;
  isSpecialPrice: true;
  isBookmarked: true;
  countReview: number;
  averageRating: number;
  createdAt: string;
  modifiedAt: string;
}
