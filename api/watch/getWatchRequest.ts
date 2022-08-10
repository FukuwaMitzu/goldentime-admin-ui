import axios from "axios";
import { SHOESMARK_API_DOMAIN } from "../../config/domain";
import { ApiRequestHandler} from "../../interfaces/ApiRequestHandler";
import { JsonEntity } from "../../interfaces/JsonEntity";
import { Shoes } from "./watch";

interface GetWatchParam{
    shoesId: string
}


const getWatchRequest: ApiRequestHandler<GetWatchParam, JsonEntity<Shoes>> = (data)=> axios.get(SHOESMARK_API_DOMAIN + "/watch/" + data.shoesId);
export default getWatchRequest;