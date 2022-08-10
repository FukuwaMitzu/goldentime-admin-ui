import axios from "axios";
import { SHOESMARK_API_DOMAIN } from "../../config/domain";
import { ApiRequestHandler, RequestWithAuth } from "../../interfaces/ApiRequestHandler";
import { JsonAction } from "../../interfaces/JsonAction";

interface EditWatchParam extends RequestWithAuth{
    watchId: string,
    formData: FormData
}

const editWatchRequest: ApiRequestHandler<EditWatchParam, JsonAction> = (data)=> axios.put<JsonAction>(SHOESMARK_API_DOMAIN+"/watch/" + data.watchId, data.formData, {
    headers: {
        "Authorization": `Bearer ${data.accessToken}`
    }
});

export default editWatchRequest;