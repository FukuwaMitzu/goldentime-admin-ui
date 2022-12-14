import axios from "axios"
import { GOLDENTIME_API_DOMAIN } from "../../config/domain"
import { ApiRequestHandler, RequestWithAuth } from "../../interfaces/ApiRequestHandler"
import { JsonAction } from "../../interfaces/JsonAction"

interface DeleteManyWatchParam extends RequestWithAuth{
    ids: string[]
}

const deleteManyWatchRequest: ApiRequestHandler<DeleteManyWatchParam, JsonAction> = (data)=> axios.delete<JsonAction>(GOLDENTIME_API_DOMAIN+"/watch",{
    data:{
        ...data
    },
    headers: {
        "Authorization": `Bearer ${data.accessToken}`
    }
});
export default deleteManyWatchRequest;