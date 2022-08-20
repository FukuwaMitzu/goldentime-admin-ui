import axios from "axios";
import { GOLDENTIME_API_DOMAIN } from "../../config/domain";
import { ApiRequestHandler} from "../../interfaces/ApiRequestHandler";
import { JsonEntity } from "../../interfaces/JsonEntity";
import { Watch } from "./watch";

interface GetWatchParam{
    shoesId: string
}


const getWatchRequest: ApiRequestHandler<GetWatchParam, JsonEntity<Watch>> = (data)=> axios.get(GOLDENTIME_API_DOMAIN + "/watch/" + data.shoesId);
export default getWatchRequest;