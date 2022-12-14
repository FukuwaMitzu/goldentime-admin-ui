import axios from "axios";
import { GOLDENTIME_API_DOMAIN } from "../../config/domain";
import { ApiRequestHandler, RequestWithAuth, RequestWithPagination } from "../../interfaces/ApiRequestHandler";
import { JsonCollection } from "../../interfaces/JsonCollection";
import { Order } from "./order";


export const GetManyOrderQueryKey = "GetManyOrderKey";

interface GetManyOrderParam extends RequestWithPagination, RequestWithAuth{
    ownerIds?: string[]
    fullName?: string
    onlyAnonymous?: boolean
}

const getManyOrderRequest: ApiRequestHandler<GetManyOrderParam, JsonCollection<Order>> = ({accessToken,...data}) => axios.get(GOLDENTIME_API_DOMAIN + "/order", {
    params:{
        ...data
    },
    headers: {
        "Authorization": `Bearer ${accessToken}`
    },
});

export default getManyOrderRequest;