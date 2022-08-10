import { Brand } from "../brand/brand";
import {Category} from "../category/category";

export interface Shoes{
  shoesId: string;
  shoesName: string;
  description: string;
  watchImage: string;
  SKU: string;
  categories: Category[];
  brand?: Brand;
  price: number;
  importPrice: number;
  sale: number;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}