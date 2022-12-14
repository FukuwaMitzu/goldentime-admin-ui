import { Watch } from "../watch/watch";
import { User } from "../user/user";

interface ImportOrderDetail {
    importOrderId: string;
    shoesId: string;
    importOrder: ImportOrder | {importOrderId:string};
    shoes: Watch;
    quantity: number;
}
export interface ImportOrder {
    importOrderId: string;
    creator?: User;
    note: string;
    details: ImportOrderDetail[];
    createdAt: string;
    updatedAt: string;
}