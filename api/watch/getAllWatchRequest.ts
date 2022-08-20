import axios from "axios";
import { GOLDENTIME_API_DOMAIN } from "../../config/domain";
import { ApiRequestHandler, RequestWithPagination } from "../../interfaces/ApiRequestHandler";
import { JsonCollection } from "../../interfaces/JsonCollection";
import { Watch } from "./watch";
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
    SKU?:string
}


const getAllWatchRequest: ApiRequestHandler<GetAllWatchParam, JsonCollection<Watch>> = (data)=> axios.get(GOLDENTIME_API_DOMAIN + "/watch",{
    params:{
        ...data
    },
    paramsSerializer: params => {
        return qs.stringify(params, {arrayFormat: 'brackets'})
    }
});
export default getAllWatchRequest;