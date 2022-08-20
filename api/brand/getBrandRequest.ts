import axios from "axios";
import { GOLDENTIME_API_DOMAIN } from "../../config/domain";
import { ApiRequestHandler } from "../../interfaces/ApiRequestHandler";
import { JsonEntity } from "../../interfaces/JsonEntity";
import { Brand } from "./brand";



const getBrandRequest: ApiRequestHandler<string, JsonEntity<Brand>> = (id) => axios.get(GOLDENTIME_API_DOMAIN + `/brand/${id}`);
export default getBrandRequest;