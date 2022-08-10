import axios from "axios";
import { SHOESMARK_API_DOMAIN } from "../../config/domain";
import { ApiRequestHandler, RequestWithPagination } from "../../interfaces/ApiRequestHandler";
import { JsonCollection } from "../../interfaces/JsonCollection";
import { Shoes } from "./watch";
import * as qs from "qs";

export const GetAllWatchQueryKey = "GetAllWatch";

interface GetAllWatchParam extends RequestWithPagination{
    ids?: string[]
    watchName?: string
    categoryIds?: string[]
    price?: {
        from: number,
        to?: number
    }
}


const getAllWatchRequest: ApiRequestHandler<GetAllWatchParam, JsonCollection<Shoes>> = (data)=> axios.get(SHOESMARK_API_DOMAIN + "/watch",{
    params:{
        ...data
    },
    paramsSerializer: params => {
        return qs.stringify(params, {arrayFormat: 'brackets'})
    }
});
export default getAllWatchRequest;