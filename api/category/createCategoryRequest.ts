import axios from "axios";
import { GOLDENTIME_API_DOMAIN } from "../../config/domain";
import { ApiRequestHandler, RequestWithAuth } from "../../interfaces/ApiRequestHandler";
import { JsonAction } from "../../interfaces/JsonAction";

interface CreateCategoryParam extends RequestWithAuth{
    categoryName: string,
    description?: string,
}

const createCategoryRequest: ApiRequestHandler<CreateCategoryParam, JsonAction> = (data)=> axios.post<JsonAction>(GOLDENTIME_API_DOMAIN+"/category", {
    categoryName: data.categoryName,
    description: data.description
}, {
    headers: {
        "Authorization": `Bearer ${data.accessToken}`
    }
});

export default createCategoryRequest;