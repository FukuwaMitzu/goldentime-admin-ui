import axios from "axios";
import { GOLDENTIME_API_DOMAIN } from "../../config/domain";
import {
  ApiRequestHandler,
  RequestWithAuth,
} from "../../interfaces/ApiRequestHandler";
import { JsonEntity } from "../../interfaces/JsonEntity";
import { OrderDetail } from "./orderDetail";

interface CreateOrderDetailParam extends RequestWithAuth {
  orderId: string;
  watchId: string;
  quantity: number;
  sale: number;
  price: number;
}

const createOrderDetailRequest: ApiRequestHandler<
  CreateOrderDetailParam,
  JsonEntity<OrderDetail>
> = ({ accessToken, ...data }) =>
  axios.post(
    GOLDENTIME_API_DOMAIN + `/order/${data.orderId}/detail`,
    {
      ...data,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

export default createOrderDetailRequest;
