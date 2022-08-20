import MuiLink from "@mui/material/Link";
import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "next/link";
import { CustomNextPage } from "../../_app";
import Typography from "@mui/material/Typography";
import CustomDataGrid from "../../../views/layout/CustomDataGrid/CustomDataGrid";
import { GridColDef, GridRenderCellParams, GridRowId } from "@mui/x-data-grid";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import LaunchOutlinedIcon from "@mui/icons-material/LaunchOutlined";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import useCustomPagination from "../../../components/CustomPagination/hooks/useCustomPagination";
import getAllWatchRequest from "../../../api/watch/getAllWatchRequest";
import { useMutation, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { GOLDENTIME_API_DOMAIN } from "../../../config/domain";
import dayjs from "dayjs";
import deleteManyWatchRequest from "../../../api/watch/deleteManyWatchRequest";
import { useSnackbar } from "notistack";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import Autocomplete from "@mui/material/Autocomplete";
import getAllCategoryRequest from "../../../api/category/getAllCategoryRequest";

const columns: GridColDef[] = [
    {
        field: "watchName",
        headerName: "Tên giày",
        width: 250
    },
    {
        field: "watchImage",
        headerName: "Ảnh giày",
        width: 100,
        renderCell: (params: GridRenderCellParams<string>) => (
            <Image width={150} height={150} src={GOLDENTIME_API_DOMAIN + "/" + params.value}></Image>
        )
    },
    {
        field: "quantity",
        headerName: "Số lượng",
        width: 100,
        align: "center"
    },

    {
        field: "price",
        headerName: "Đơn giá bán",
        width: 150,
        renderCell: (params: GridRenderCellParams<string>) => (
            <Typography>{new Intl.NumberFormat("vi", { style: "currency", currency: "VND" }).format(parseFloat(params.value ?? ""))}</Typography>
        )
    },
    {
        field: "createdAt",
        headerName: "Ngày khởi tạo",
        width: 240,
        renderCell: (params: GridRenderCellParams<string>) => (
            <Typography>{dayjs(params.value).format("LLL")}</Typography>
        )
    },
    {
        field: "updatedAt",
        headerName: "Cập nhật gần đây",
        width: 150,
        renderCell: (params: GridRenderCellParams<string>) => (
            <Typography>{dayjs(params.value).fromNow()}</Typography>
        )
    },
    {
        field: "action",
        headerName: "Chi tiết",
        sortable: false,
        renderCell: (params: GridRenderCellParams<string>) => (
            <Stack>
                <Link href={`/admin/giay/detail/${params.id}`} passHref><IconButton><LaunchOutlinedIcon></LaunchOutlinedIcon></IconButton></Link>
            </Stack>
        )
    }
]

interface WatchFormInputs {
    watchName: string
    categoryIds: string[]
}

const WatchPage: CustomNextPage = () => {
    const session = useSession();
    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();


    const searchForm = useForm<WatchFormInputs>({
        defaultValues: {
            watchName: "",
            categoryIds: [],
        }
    });

    const { handlePagination, pagination, setPagination } = useCustomPagination({ limit: 32, offset: 0, total: 0 });
    //=========Queries=========================
    const getAllWatchQuery = useQuery(["getAllWatch", pagination.offset, pagination.limit], () => getAllWatchRequest({
        limit: pagination.limit,
        offset: pagination.offset,
        watchName: searchForm.getValues("watchName"),
        categoryIds: searchForm.getValues("categoryIds"),
    }), {
        select: (data) => data.data,
        onSuccess: (data) => {
            setPagination({ ...pagination, total: data.total });
        }
    });
    const deleteSelectedQuery = useMutation((ids: string[]) => deleteManyWatchRequest({
        ids: ids,
        accessToken: session.data?.user?.accessToken
    }), {
        onSuccess: (data, variables) => {
            getAllWatchQuery.refetch();
            enqueueSnackbar(`Đã xoá ${variables.length} phần tử`, { variant: "success" });
        },
        onError: (error) => {
            enqueueSnackbar(`Xoá thất bại`, { variant: "error" });
        }
    });
    const getAllCategory = useQuery(["getAllCategory"], () => getAllCategoryRequest({}), {
        select: (data) => data.data
    });

    //=========Callbacks=====================
    const handleCreateShoes = () => {
        router.push(router.pathname + "/create");
    }
    const handleDeleteShoes = (e: React.MouseEvent<HTMLButtonElement>, selectedRows: Array<GridRowId>) => {
        if (deleteSelectedQuery.isLoading) return;
        deleteSelectedQuery.mutate(selectedRows.map((row) => row.toString()));
    }
    const handleSearchForm: SubmitHandler<WatchFormInputs> = (e) => {
        getAllWatchQuery.refetch();
    }
    return (
        <Box>
            <Breadcrumbs sx={{ marginBottom: "15px" }}>
                <Link href="/admin/dashboard" passHref>
                    <MuiLink underline="hover" color="inherit">Dashboard</MuiLink>
                </Link>
                <Typography color="text.primary">Đồng hồ</Typography>
            </Breadcrumbs>
            <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: "25px" }}>Quản lý Đồng hồ</Typography>
            <form onSubmit={searchForm.handleSubmit(handleSearchForm)}>
                <Stack direction={"column"} spacing={2} width={"475px"}>
                    <TextField fullWidth label="Tên đồng hồ" variant="outlined" {...searchForm.register("watchName")}></TextField>
                    <Controller
                        name="categoryIds"
                        control={searchForm.control}
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
                    <LoadingButton
                        loading={getAllWatchQuery.isLoading}
                        variant="contained" type="submit"
                    >Tìm kiếm</LoadingButton>
                </Stack>
            </form>

            <Box sx={{ marginTop: "55px" }}>
                <CustomDataGrid
                    columns={columns}
                    rows={getAllWatchQuery.data?.data ?? []}
                    pagination={pagination}
                    error={getAllWatchQuery.isError}
                    loading={getAllWatchQuery.isLoading}
                    getRowId={(row) => row.shoesId}
                    rowHeight={85}
                    onPageChange={handlePagination}
                    onCreate={handleCreateShoes}
                    onDeleteConfirmed={handleDeleteShoes}
                />
            </Box>
        </Box>

    )
}

WatchPage.layout = "manager";
WatchPage.auth = {
    role: ["admin", "employee"]
}
export default WatchPage;