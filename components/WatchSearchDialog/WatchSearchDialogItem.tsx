import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import Big from "big.js";
import currencyFormater from "../../util/currencyFormater";
import Image from "next/image";
import { GOLDENTIME_API_DOMAIN } from "../../config/domain";

interface WatchSearchDialogItemProps {
    watchId: string,
    watchName: string
    watchImage: string,
    price: number,
    sale: number,
    quantity: number,
}


const ShoesSearchDialogItem: React.FC<WatchSearchDialogItemProps> = (shoes) => {
    const price = new Big(shoes.price);
    const sale = new Big(shoes.sale);


    const niemYet = price;
    const khuyenMai = price.mul((new Big(100)).minus(sale).div(100));
  return (
    <Card sx={{width:"100%"}}>
      <CardHeader
        title={
          <Typography
            sx={{
              height: "48px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: "2",
              WebkitBoxOrient: "vertical",
            }}
          >
            {shoes.watchName}
          </Typography>
        }
      />
      <Image
        layout="responsive"
        width={"100%"}
        height={"75px"}
        objectFit={"cover"}
        src={`${GOLDENTIME_API_DOMAIN}/${shoes.watchImage}`}
        alt={shoes.watchName}
      />
      <CardContent>
        {shoes.quantity > 0 ? (
          <>
            <Typography
              color="GrayText"
              sx={{
                textDecorationLine: "line-through",
                opacity: shoes.sale != 0 ? 1 : 0,
              }}
            >{`${currencyFormater.format(niemYet.toNumber())}`}</Typography>
            <Typography color={"error"} variant={"h6"}>
              {currencyFormater.format(khuyenMai.toNumber())}
            </Typography>
          </>
        ) : (
          <>
            <Typography
              color="GrayText"
              sx={{ textDecorationLine: "line-through", opacity: 0 }}
            >{`${currencyFormater.format(niemYet.toNumber())}`}</Typography>
            <Typography color={"error"} variant={"h6"}>
              Hết hàng
            </Typography>
          </>
        )}
      </CardContent>
    </Card>
  );
};
export default ShoesSearchDialogItem;