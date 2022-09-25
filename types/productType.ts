export interface Welcome {
  id: number;
  title: string;
  price: number;
  description: string;
  category: category;
  image: string;
  rating: Rating;
}

export interface Rating {
  rate: number;
  count: number;
}

export interface category {
  id: number | null;
  name: string;
}
