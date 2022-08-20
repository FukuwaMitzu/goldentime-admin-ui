import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import MuiLink from "@mui/material/Link";
import { CustomNextPage } from "../../_app";
import { useSession } from "next-auth/react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useMutation, useQuery } from "@tanstack/react-query";
import createWatchRequest from "../../../api/watch/createWatchRequest";
import Button from "@mui/material/Button";
import { ChangeEvent, useRef } from "react";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import getAllCategoryRequest from "../../../api/category/getAllCategoryRequest";
import getAllBrandRequest from "../../../api/brand/getAllBrandRequest";
import Autocomplete from "@mui/material/Autocomplete";
import InputAdornment from "@mui/material/InputAdornment";
import LoadingButton from "@mui/lab/LoadingButton";

type CreateWatchFormInputs = {
    watchName: string;
    description: string;
    watchImage: unknown;
    SKU: string;
    categories: string[];
    brandId?: string;
    price: number;
    importPrice: number;
    sale: number;
    quantity: number;
}

const CreateWatchPage: CustomNextPage = () => {
    const session = useSession();
    const router = useRouter();

    const { enqueueSnackbar } = useSnackbar();
    const imageRef: any = useRef();
    //========Queries============================
    const createWatchQuery = useMutation((data: FormData) => createWatchRequest({
        formData: data,
        accessToken: session.data?.user?.accessToken
    }), {
        onSuccess: () => {
            router.back();
            enqueueSnackbar("Khởi tạo thành công", { variant: "success" });
        },
        onError: () => {
            enqueueSnackbar("Khởi tạo thất bại", { variant: "error" });
        }
    });

    const getAllCategory = useQuery(["getAllCategory"], () => getAllCategoryRequest({}), {
        select: (data) => data.data
    });
    const getAllBrand = useQuery(["getAllBrand"], () => getAllBrandRequest({}), {
        select: (data) => data.data
    });

    //======Callbacks==================================
    const createWatchForm = useForm<CreateWatchFormInputs>();
    const handleCreateShoes: SubmitHandler<CreateWatchFormInputs> = (data) => {
        const form = new FormData();
        for (var key in data) {
            form.append(key, (data as any)[key]);
        }
        form.append("categories", JSON.stringify(data.categories));
        createWatchQuery.mutate(form);
    }
    function onFileSelected(event: ChangeEvent<HTMLInputElement>) {
        if (!event.target.files) return;
        var selectedFile = event.target.files[0];
        if (!selectedFile) return;
        var reader = new FileReader();
        imageRef.current.title = selectedFile.name;

        reader.onload = function (event) {
            imageRef.current.src = event.target?.result;
        };

        reader.readAsDataURL(selectedFile);
    }
    //=================================
    return (
        <Box>
            <Breadcrumbs sx={{ marginBottom: "15px" }}>
                <Link href="/admin/dashboard" passHref>
                    <MuiLink underline="hover" color="inherit">Dashboard</MuiLink>
                </Link>
                <Link href="/admin/watch" passHref>
                    <MuiLink underline="hover" color="inherit">Đồng hồ</MuiLink>
                </Link>
                <Typography color="text.primary">Thêm Đồng hồ</Typography>
            </Breadcrumbs>
            <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: "25px" }}>Thêm Đồng hồ</Typography>
            <form onSubmit={createWatchForm.handleSubmit(handleCreateShoes)}>
                <Stack direction={"row"} spacing={4} sx={{ marginBottom: "50px" }}>
                    <Stack spacing={2}>
                        <Controller
                            name="watchImage"
                            control={createWatchForm.control}
                            render={({ field }) => (
                                <Stack direction={"column"} spacing={2} width={"250px"}>
                                    <img width={250} height={250} ref={imageRef}></img>
                                    <Button component={"label"} startIcon={<CameraAltIcon />} variant={"text"}>Tải ảnh lên <input type="file" hidden onChange={(e) => {
                                        onFileSelected(e);
                                        if (e.target.files) field.onChange(e.target.files[0]);
                                    }} /></Button>
                                </Stack>
                            )}
                        />
                        <LoadingButton variant="contained" type="submit">Khởi tạo</LoadingButton>
                    </Stack>
                    <Stack direction={"column"} spacing={2} width={"475px"}>
                        <TextField label={"Tên đồng hồ"} {...createWatchForm.register("watchName")}></TextField>
                        <TextField label={"Mã đơn vị lưu kho"} {...createWatchForm.register("SKU")}></TextField>
                        <Controller
                            name="categories"
                            control={createWatchForm.control}
                            render={
                                ({ field }) => (
                                    <Autocomplete
                                        multiple
                                        getOptionLabel={(option: any) => option.categoryName}
                                        filterSelectedOptions
                                        options={getAllCategory.data?.data ?? []}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Thể loại"
                                            />
                                        )}
                                        onChange={(e, data) => field.onChange(data.map((a) => a.categoryId))}
                                    />
                                )
                            }
                        />
                        <Controller
                            name="brandId"
                            control={createWatchForm.control}
                            render={
                                ({ field }) => (
                                    <Autocomplete
                                        getOptionLabel={(option: any) => option.brandName}
                                        filterSelectedOptions
                                        options={getAllBrand.data?.data ?? []}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Thương hiệu"
                                            />
                                        )}
                                        onChange={(e, option) => field.onChange(option?.brandId)}
                                    />
                                )
                            }
                        />
                    </Stack>
                    <Stack spacing={2}>
                        <TextField label={"Đơn giá nhập"}
                            {...createWatchForm.register("importPrice")}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">VND</InputAdornment>
                            }}
                        ></TextField>
                        <TextField label={"Đơn giá bán"}
                            {...createWatchForm.register("price")}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">VND</InputAdornment>
                            }}
                        ></TextField>
                        <TextField label={"Khuyến mãi"}
                            {...createWatchForm.register("sale")}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">%</InputAdornment>
                            }}
                        ></TextField>
                        <TextField label={"Số lượng trong kho"}
                            {...createWatchForm.register("quantity")}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">Chiếc</InputAdornment>
                            }}
                        ></TextField>
                    </Stack>
                </Stack>
                <Box>
                    <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: "25px" }}>Mô tả</Typography>
                    <TextField
                        fullWidth
                        multiline
                        {...createWatchForm.register("description")}
                        maxRows={20}
                        rows={15}
                    />
                </Box>
            </form>
        </Box>
    )
}

CreateWatchPage.layout = "manager";
CreateWatchPage.auth = {
    role: ["admin", "employee"]
}
export default CreateWatchPage;