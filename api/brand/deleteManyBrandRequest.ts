import axios from "axios";
import { GOLDENTIME_API_DOMAIN } from "../../config/domain";
import { ApiRequestHandler, RequestWithAuth } from "../../interfaces/ApiRequestHandler";
import { JsonAction } from "../../interfaces/JsonAction";


interface DeleteManyBrandParam extends RequestWithAuth{
    ids: string[]
}

const deleteManyBrandRequest: ApiRequestHandler<DeleteManyBrandParam, JsonAction> = (data)=> axios.delete(GOLDENTIME_API_DOMAIN + "/brand",{
    data:{
        ids:data.ids
    },
    headers: {
        "Authorization": `Bearer ${data.accessToken}`
    }
});
export default deleteManyBrandRequest;