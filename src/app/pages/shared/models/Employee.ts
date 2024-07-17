export interface ApiResponse<T> {
  message?: string;
  data: T;
}

export interface IEmployee {
  _id?: string;
  name: string;
  category: string;
  quantity: number;
  remaining: number;
  price: number;
  sellingPrice: number;
}
