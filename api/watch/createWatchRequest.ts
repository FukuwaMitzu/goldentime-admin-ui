import axios from "axios";
import { GOLDENTIME_API_DOMAIN } from "../../config/domain";
import { ApiRequestHandler, RequestWithAuth } from "../../interfaces/ApiRequestHandler";
import { JsonAction } from "../../interfaces/JsonAction";

interface CreateWatchParam extends RequestWithAuth{
    formData: FormData
}

const createWatchRequest: ApiRequestHandler<CreateWatchParam, JsonAction> = (data)=> axios.post<JsonAction>(GOLDENTIME_API_DOMAIN+"/watch", data.formData, {
    headers: {
        "Authorization": `Bearer ${data.accessToken}`
    }
});

export default createWatchRequest;