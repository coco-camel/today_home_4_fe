interface StarRatingProps {
  totalStars: number;
}

export interface ReivewInputData {
  contents: string;
  rating: number;
}

export interface ReivewInput {
  id: number;
  contents: string;
  rating: number;
}

export interface Reviews {
  contents: string;
  nickname: string;
  rating: number;
}
