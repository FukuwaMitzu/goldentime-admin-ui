import { Watch } from "../watch/watch";
import { Order } from "./order";

export interface OrderDetail{
    orderId: string;
    watchId: string;
    order: Partial<Order>;
    watch: Watch;
    quantity: number;
    price: number;
    sale: number;
}