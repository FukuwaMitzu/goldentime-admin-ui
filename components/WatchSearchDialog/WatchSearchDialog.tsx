import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { SubmitHandler, useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import getAllWatchRequest, {
  GetAllWatchQueryKey,
} from "../../api/watch/getAllWatchRequest";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import CardActionArea from "@mui/material/CardActionArea";
import ShoesSearchDialogItem from "./WatchSearchDialogItem";
import { Watch } from "../../api/watch/watch";
import Box from "@mui/material/Box";
import { useEffect } from "react";

interface WatchSearchDialogProps {
  open: boolean;
  onItemSelected?: (watch: Watch) => void;
  onClose?: () => void;
}

interface SearchShoesFormInputs {
  SKU: string;
}
const ShoesSearchDialog: React.FC<WatchSearchDialogProps> = (props) => {
  const searchForm = useForm<SearchShoesFormInputs>({
    defaultValues: {
      SKU: "",
    },
  });

  //====Queries==============
  const getWatchQuery = useQuery(
    [GetAllWatchQueryKey],
    () =>
      getAllWatchRequest({
        limit: 8,
        SKU: searchForm.getValues("SKU"),
      }),
    {
      select: ({ data }) => data.data,
    }
  );

  useEffect(() => {
    const delay = setTimeout(() => {
      getWatchQuery.refetch();
    }, 250);
  }, [searchForm.watch("SKU")]);

  const handleClose = () => {
    if (props.onClose) props.onClose();
  };
  const handleSelect = (watch: Watch) => {
    if (props.onItemSelected) props.onItemSelected(watch);
  };
  const handleSubmit: SubmitHandler<SearchShoesFormInputs> = (data) => {
    getWatchQuery.refetch();
  };
  return (
    <Dialog open={props.open} maxWidth={"lg"} fullWidth>
      <DialogTitle>Tìm kiếm đồng hồ</DialogTitle>
      <DialogContent>
        <Box sx={{ paddingY: "10px" }}>
          <form onSubmit={searchForm.handleSubmit(handleSubmit)}>
            <Stack
              direction={"row"}
              gap={1}
              sx={{ maxWidth: "550px", width: "100%" }}
            >
              <TextField
                label={"Mã đơn vị lưu kho"}
                {...searchForm.register("SKU")}
                fullWidth
              ></TextField>
              <Button
                variant="contained"
                type={"submit"}
                sx={{ flexShrink: 0 }}
              >
                Tìm kiếm
              </Button>
            </Stack>
          </form>
          <Stack
            direction={"row"}
            flexWrap={"wrap"}
            columnGap={2}
            rowGap={3}
            sx={{ marginY: "25px" }}
          >
            {getWatchQuery.isSuccess &&
              getWatchQuery.data.map((watch) => (
                <Box
                  key={watch.watchId}
                  sx={{ maxWidth: "250px", width: "100%" }}
                >
                  {watch.quantity > 0 ? (
                    <CardActionArea onClick={() => handleSelect(watch)}>
                      <ShoesSearchDialogItem {...watch}></ShoesSearchDialogItem>
                    </CardActionArea>
                  ) : (
                    <Box sx={{filter:"brightness(80%) grayscale(60%)"}}>
                        <ShoesSearchDialogItem {...watch}></ShoesSearchDialogItem>
                    </Box>
                  )}
                </Box>
              ))}
          </Stack>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button color={"error"} onClick={handleClose}>
          Huỷ
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default ShoesSearchDialog;
