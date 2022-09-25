export interface initialValues {
  id?: number;
  title: string;
  category: string;
  price: number;
  rating: number;
  description: string;
  image: string;
}

export interface field {
  id: number;
  label: string;
  name: string;
  type: string;
  options?: string[];
}

export interface button {
  id: number;
  name: string;
  label: string;
}
