import axios from "axios";
import { GOLDENTIME_API_DOMAIN } from "../../config/domain";
import { ApiRequestHandler, RequestWithAuth } from "../../interfaces/ApiRequestHandler";
import { JsonAction } from "../../interfaces/JsonAction";

interface CreateBrandParam extends RequestWithAuth{
    brandName: string
}

const createBrandRequest: ApiRequestHandler<CreateBrandParam, JsonAction> = (data)=> axios.post<JsonAction>(GOLDENTIME_API_DOMAIN+"/brand", {
    brandName: data.brandName,
}, {
    headers: {
        "Authorization": `Bearer ${data.accessToken}`
    }
});

export default createBrandRequest;