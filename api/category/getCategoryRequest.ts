import axios from "axios";
import { GOLDENTIME_API_DOMAIN } from "../../config/domain";
import { ApiRequestHandler } from "../../interfaces/ApiRequestHandler";
import { JsonEntity } from "../../interfaces/JsonEntity";
import { Category } from "./category";



const getCategoryRequest: ApiRequestHandler<string, JsonEntity<Category>> = (id) => axios.get(GOLDENTIME_API_DOMAIN + `/category/${id}`);
export default getCategoryRequest;