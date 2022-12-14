import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import MuiLink from "@mui/material/Link";
import { useSession } from "next-auth/react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useMutation, useQuery } from "@tanstack/react-query";
import Button from "@mui/material/Button";
import { ChangeEvent, useRef, useState } from "react";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import Autocomplete from "@mui/material/Autocomplete";
import InputAdornment from "@mui/material/InputAdornment";
import LoadingButton from "@mui/lab/LoadingButton";
import getAllCategoryRequest from "../../../../api/category/getAllCategoryRequest";
import getAllBrandRequest from "../../../../api/brand/getAllBrandRequest";
import { CustomNextPage } from "../../../_app";
import editWatchRequest from "../../../../api/watch/editWatchRequest";
import getWatchRequest from "../../../../api/watch/getWatchRequest";
import { GOLDENTIME_API_DOMAIN } from "../../../../config/domain";
import { ApiRequestError } from "../../../../interfaces/ApiRequestError";
import extractDiff from "../../../../util/extractDiff";
import { Category } from "../../../../api/category/category";
import { Brand } from "../../../../api/brand/brand";

type EditWatchFormInputs = {
    watchName: string;
    description: string;
    watchImage: unknown;
    SKU: string;
    categories: Category[];
    brand?: Brand;
    price: number;
    importPrice: number;
    sale: number;
    quantity: number;
}

const DetailWatchPage: CustomNextPage = () => {
    const session = useSession();
    const router = useRouter();

    const { enqueueSnackbar } = useSnackbar();

    const [editMode, setEditMode] = useState(false);
    const imageRef: any = useRef();

    //========Queries============================
    const getWatchQuery = useQuery(["getWatch"], () => getWatchRequest({
        shoesId: router.query.id as string
    }), {
        refetchOnWindowFocus: false,
        select: (data) => data.data,
        onSuccess: ({ data }) => {
            editWatchForm.reset(data);
            imageRef.current.src = GOLDENTIME_API_DOMAIN + "/" + data.watchImage;
        }
    });
    const getAllCategory = useQuery(["getAllCategory"], () => getAllCategoryRequest({}), {
        select: (data) => data.data
    });
    const getAllBrand = useQuery(["getAllBrand"], () => getAllBrandRequest({}), {
        select: (data) => data.data
    });
    const editWatchQuery = useMutation((data: FormData) => editWatchRequest({
        watchId: router.query.id as string,
        formData: data,
        accessToken: session.data?.user?.accessToken
    }), {
        onSuccess: () => {
            router.back();
            enqueueSnackbar("C???p nh???t th??nh c??ng", { variant: "success" });
        },
        onError: (error: ApiRequestError) => {
            enqueueSnackbar(error.response?.data.message[0], { variant: "error" });
        }
    });
    //======Callbacks==================================
    const editWatchForm = useForm<EditWatchFormInputs>({
        defaultValues: {
            watchName: "",
            importPrice: 0,
            quantity: 0,
            sale: 0,
            SKU: "",
            price: 0,
            categories: [],
            brand: { brandId: "", brandName: "" }
        }
    });

    const handleCategoryEditDenied = () => {
        setEditMode(false);
        if (getWatchQuery.data) {
            const { data } = getWatchQuery.data;
            editWatchForm.reset();
            imageRef.current.src = GOLDENTIME_API_DOMAIN + "/" + data.watchImage;
        }
    }
    const handleEditShoes: SubmitHandler<EditWatchFormInputs> = (data) => {
        const form = new FormData();
        if (!getWatchQuery.data) return;
        const { brand, categories, ...diff } = extractDiff(getWatchQuery.data.data, data);
        for (var key in diff) {
            form.append(key, (data as any)[key]);
        }
        if (brand) form.append("brandId", brand.brandId);
        form.append("categories", JSON.stringify(data.categories.map((category) => category.categoryId)));
        editWatchQuery.mutate(form);
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
                    <MuiLink underline="hover" color="inherit">?????ng h???</MuiLink>
                </Link>
                <Typography color="text.primary">Chi ti???t ?????ng h???</Typography>
            </Breadcrumbs>
            <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: "25px" }}>Chi ti???t ?????ng h???</Typography>
            <form onSubmit={editWatchForm.handleSubmit(handleEditShoes)}>
                <Stack direction={"row"} spacing={4}>
                    <Stack spacing={2}>
                        <Controller
                            name="watchImage"
                            control={editWatchForm.control}
                            render={({ field }) => (
                                <Stack direction={"column"} spacing={2} width={"250px"}>
                                    <img width={250} height={250} ref={imageRef} crossOrigin="anonymous"></img>
                                    {editMode && <Button component={"label"} startIcon={<CameraAltIcon />} variant={"text"}>T???i ???nh l??n <input type="file" hidden onChange={(e) => {
                                        onFileSelected(e);
                                        if (e.target.files) field.onChange(e.target.files[0]);
                                    }} /></Button>}
                                </Stack>
                            )}
                        />
                        {
                            !editMode ?
                                <Button variant="contained" onClick={() => { setEditMode(true) }}>S???a</Button>
                                :
                                <Stack direction={"row"} spacing={1}>
                                    <Button color="error" onClick={handleCategoryEditDenied} fullWidth>Hu???</Button>
                                    <LoadingButton loading={editWatchQuery.isLoading} type={"submit"} fullWidth>L??u</LoadingButton>
                                </Stack>
                        }
                    </Stack>
                    <Stack direction={"column"} spacing={2} width={"475px"}>
                        <Controller
                            name="watchName"
                            control={editWatchForm.control}
                            render={({ field }) => (
                                <TextField disabled={!editMode} label={"T??n ?????ng h???"} {...field}></TextField>
                            )}
                        />
                        <Controller
                            name="SKU"
                            control={editWatchForm.control}
                            render={({ field }) => (
                                <TextField disabled={!editMode} label={"M?? ????n v??? l??u kho"} {...field}></TextField>
                            )}
                        />
                        <Controller
                            name="categories"
                            control={editWatchForm.control}
                            render={({ field }) => (
                                <Autocomplete
                                    disabled={!editMode}
                                    multiple
                                    {...field}
                                    isOptionEqualToValue={(option, value) => option.categoryId == value.categoryId}
                                    getOptionLabel={(option: any) => option.categoryName}
                                    filterSelectedOptions
                                    options={getAllCategory.data?.data ?? []}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Th??? lo???i"
                                        />
                                    )}
                                    onChange={(e, option) => field.onChange(option)}
                                />
                            )
                            }
                        />
                        <Controller
                            name="brand"
                            control={editWatchForm.control}
                            render={({ field }) => (
                                <Autocomplete
                                    disabled={!editMode}
                                    {...field}
                                    isOptionEqualToValue={(option, value) => option.brandId == value.brandId}
                                    getOptionLabel={(option: any) => option.brandName}
                                    filterSelectedOptions
                                    options={getAllBrand.data?.data ?? []}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Th????ng hi???u"
                                        />
                                    )}
                                    onChange={(e, option) => field.onChange(option)}
                                />
                            )
                            }
                        />
                    </Stack>
                    <Stack spacing={2}>                  
                        <Controller
                            name="importPrice"
                            control={editWatchForm.control}
                            render={({ field }) => (
                                <TextField label={"????n gi?? nh???p"}
                                    disabled={!editMode}
                                    {...field}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">VND</InputAdornment>
                                    }}
                                />
                            )}
                        />
                        <Controller
                            name="price"
                            control={editWatchForm.control}
                            render={({ field }) => (
                                <TextField label={"????n gi?? b??n"}
                                    disabled={!editMode}
                                    {...field}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">VND</InputAdornment>
                                    }}
                                ></TextField>
                            )}
                        />
                        <Controller
                            name="sale"
                            control={editWatchForm.control}
                            render={({ field }) => (
                                <TextField label={"Khuy???n m??i"}
                                    disabled={!editMode}
                                    {...field}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">%</InputAdornment>
                                    }}
                                ></TextField>
                            )}
                        />
                        <Controller
                            name="quantity"
                            control={editWatchForm.control}
                            render={({ field }) => (
                                <TextField label={"S??? l?????ng trong kho"}
                                    disabled={!editMode}
                                    {...field}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">Chi???c</InputAdornment>
                                    }}
                                ></TextField>
                            )}
                        />
                    </Stack>
                </Stack>
                <Box>
                    <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: "25px" }}>M?? t???</Typography>
                    <TextField
                        fullWidth
                        multiline
                        disabled={!editMode}
                        {...editWatchForm.register("description")}
                        maxRows={20}
                        rows={15}
                    />
                </Box>
            </form>
        </Box>
    )
}

DetailWatchPage.layout = "manager";
DetailWatchPage.auth = {
    role: ["admin", "employee"]
}
export default DetailWatchPage;

