import axios from "axios";
import { GOLDENTIME_API_DOMAIN } from "../../config/domain";
import { ApiRequestHandler, RequestWithOrderSession } from "../../interfaces/ApiRequestHandler";
import { JsonEntity } from "../../interfaces/JsonEntity";
import { OrderDetail } from "./orderDetail";

export interface CreateAnonymousOrderDetailParam extends RequestWithOrderSession{
    watchId: string;
    quantity: number;
}

const createAnonymousOrderDetailRequest: ApiRequestHandler<CreateAnonymousOrderDetailParam, JsonEntity<OrderDetail>> = ({orderSessionToken,...data})=> axios.post(GOLDENTIME_API_DOMAIN+"/order/anonymous/detail", {
    ...data
},{
    headers: {
        "order-session": orderSessionToken
    }
});

export default createAnonymousOrderDetailRequest;