import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Image from "next/image";
import { GOLDENTIME_API_DOMAIN } from "../../config/domain";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {
  ChangeEventHandler,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";
import { Category } from "../../api/category/category";
import Chip from "@mui/material/Chip";
import { Brand } from "../../api/brand/brand";
import currencyFormater from "../../util/currencyFormater";
import Big from "big.js";
import stringToColor from "../../util/stringToColor";
interface DetailOrderItemProps {
  watchId: string;
  watchImage: string;
  watchName: string;
  quantity: number;
  buyQuantity: number;
  price: number;
  sale: number;
  brand?: Brand;
  categories?: Category[];
  disabled?: boolean;
  onChange?: (shoesId: string, quantity: number) => void;
  onDelete?: (shoesId: string) => void;
}

const Subheader = styled(Stack)(({ theme }) => ({
  alignItems: "center",
  color: theme.palette.text.primary,
}));

const DetailOrderItem: React.FC<DetailOrderItemProps> = (props) => {
  const [buyQuantity, setQuantity] = useState(props.buyQuantity);

  

  const price = new Big(props.price);
  const buy = new Big(buyQuantity);
  const sale = new Big(props.sale);

  const niemYet = price.mul(buy);

  const khuyenMai = price.mul(buy.mul(new Big(100).minus(sale)).div(100));

  const handleQuantityInput: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    const number = Number.parseInt(e.target.value);
    if (isNaN(number)) return;
    setQuantity(Math.min(Math.max(number, 1), props.quantity));
  };

  useEffect(()=>{
    setQuantity(props.buyQuantity);
  }, [props.buyQuantity]);

  useEffect(() => {
    if (props.onChange) props.onChange(props.watchId, buyQuantity);
  }, [buyQuantity]);

  const handleDeleteShoes: MouseEventHandler<HTMLButtonElement> = (e) => {
    if (props.onDelete) props.onDelete(props.watchId);
  };

  return (
    <Box>
      <Stack direction={"row"} gap={2}>
        <Box>
          <Image
            height={"150px"}
            width={"150px"}
            src={`${GOLDENTIME_API_DOMAIN}/${props.watchImage}`}
            alt={props.watchName}
          ></Image>
        </Box>
        <Stack sx={{ flex: 1 }}>
          <Typography>{props.watchName}</Typography>
          <Stack
            direction="row"
            spacing={1}
            marginTop={"7px"}
            marginBottom={"7px"}
          >
            {props.brand && (
              <Chip
                sx={{
                  bgcolor: stringToColor(props.brand?.brandName),
                  color: "white",
                }}
                label={props.brand?.brandName}
                size="small"
              />
            )}
            {props.categories?.map((category) => (
              <Chip
                key={category.categoryId}
                label={category.categoryName}
                size="small"
              />
            ))}
          </Stack>
          <Typography sx={{ marginY: "5px" }} color="GrayText">
            Còn {props.quantity - buyQuantity} sản phẩm
          </Typography>
          <Box sx={{ marginTop: "5px" }}>
            {props.sale > 0 && (
              <Typography
                color="GrayText"
                sx={{ textDecorationLine: "line-through" }}
              >{`${currencyFormater.format(niemYet.toNumber())}`}</Typography>
            )}
            <Typography color={"error"} variant={"h6"}>
              {currencyFormater.format(khuyenMai.toNumber())}
            </Typography>
          </Box>
          <Box sx={{ flex: 1 }}></Box>
          <Stack
            direction={"row"}
            gap={2}
            marginTop={"15px"}
            alignItems={"center"}
          >
            <TextField
              disabled={props.disabled}
              label="Số lượng"
              type={"number"}
              size="small"
              sx={{ width: "15ch" }}
              value={buyQuantity}
              onChange={handleQuantityInput}
            ></TextField>
            <Box sx={{ flex: 1 }}></Box>
            {
              !props.disabled &&
              <Button color="error" onClick={handleDeleteShoes}>
                Xoá
            </Button>
            }
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};
export default DetailOrderItem;
