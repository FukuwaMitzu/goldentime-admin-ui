import axios from "axios";
import { GOLDENTIME_API_DOMAIN } from "../../config/domain";
import { ApiRequestHandler, RequestWithAuth } from "../../interfaces/ApiRequestHandler";
import { JsonEntity } from "../../interfaces/JsonEntity";
import { OrderDetail } from "./orderDetail";

export interface CreateMyOrderDetailParam extends RequestWithAuth{
    orderId: string;
    watchId: string;
    quantity: number;
}

const createMyOrderDetailRequest: ApiRequestHandler<CreateMyOrderDetailParam, JsonEntity<OrderDetail>> = ({accessToken,...data})=> axios.post(GOLDENTIME_API_DOMAIN+`/order/me/${data.orderId}/detail`, {
    ...data
},{
    headers: {
        "Authorization": `Bearer ${accessToken}`
    }
});

export default createMyOrderDetailRequest;