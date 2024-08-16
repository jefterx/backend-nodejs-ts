import { SuccessResponse } from "./response.interface";

export interface ProductsForSaleRequest {}

interface Product {
  id: string;
  name: string;
  value: number;
}

export interface ProductsForSaleResponse
  extends SuccessResponse<Product[]> {}
