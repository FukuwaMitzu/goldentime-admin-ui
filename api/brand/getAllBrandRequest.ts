import axios from "axios";
import { GOLDENTIME_API_DOMAIN } from "../../config/domain";
import { ApiRequestHandler, RequestWithPagination } from "../../interfaces/ApiRequestHandler";
import { JsonCollection } from "../../interfaces/JsonCollection";
import { Brand } from "./brand";

interface GetAllBrandParam extends RequestWithPagination{
    brandName?: string
}


const getAllBrandRequest: ApiRequestHandler<GetAllBrandParam, JsonCollection<Brand>> = (data)=> axios.get(GOLDENTIME_API_DOMAIN + "/brand",{
    params:{
        ...data
    }
});
export default getAllBrandRequest;