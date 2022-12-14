import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import {
  DataGrid,
  GridColumns,
  GridRowId,
  GridRowIdGetter,
  GridRowsProp,
  GridSelectionModel,
} from "@mui/x-data-grid";
import { ChangeEvent, MouseEventHandler, useState } from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import CustomPagination from "../../../components/CustomPagination/CustomPagination";

interface CustomDataGridProps {
  pagination: {
    limit: number;
    offset: number;
    total: number;
  };
  columns: GridColumns;
  rows: GridRowsProp;
  error?: boolean;
  loading?: boolean;
  rowHeight?: number;
  allowAdding?: boolean;
  getRowId?: GridRowIdGetter;
  onPageChange?: (e: ChangeEvent<any>, page: number) => void;
  onDeleteDenied?: MouseEventHandler<HTMLButtonElement>;
  onCreate?: MouseEventHandler<HTMLButtonElement>;
  onDeleteConfirmed?: (
    event: React.MouseEvent<HTMLButtonElement>,
    selectedRows: Array<GridRowId>
  ) => void;
}

const CustomDataGrid: React.FC<CustomDataGridProps> = (props) => {
  const [selectedId, setSelectedId] = useState(new Array<GridRowId>());

  const [openConfirmDeleteDialog, setConfirmDeleteDialog] = useState(false);

  const handleSelectionChange = (selectionModel: GridSelectionModel) => {
    setSelectedId(selectionModel);
  };

  const triggerConfirmDeleteDialog = () => {
    setConfirmDeleteDialog(!openConfirmDeleteDialog);
  };
  const closeConfirmDeleteDialog = () => {
    setConfirmDeleteDialog(false);
  };
  const handleOnConfirmDelete: MouseEventHandler<HTMLButtonElement> = (
    data
  ) => {
    if (props.onDeleteConfirmed) props.onDeleteConfirmed(data, selectedId);
    closeConfirmDeleteDialog();
  };
  return (
    <Box>
      <Stack direction={"row"} spacing={1} marginBottom={"10px"}>
        {selectedId.length > 0 && (
          <>
            <Button
              onClick={triggerConfirmDeleteDialog}
              startIcon={<DeleteOutlineOutlinedIcon />}
              variant={"outlined"}
              color="error"
            >
              Xo?? {selectedId.length} ph???n t???
            </Button>
            <Dialog open={openConfirmDeleteDialog}>
              <DialogTitle>X??c nh???n xo??</DialogTitle>
              <DialogContent>
                B???n c?? th???c s??? mu???n xo?? {selectedId.length} ph???n t??? kh??ng?
              </DialogContent>
              <DialogActions>
                <Button color="inherit" onClick={handleOnConfirmDelete}>
                  Ch???p thu???n
                </Button>
                <Button onClick={closeConfirmDeleteDialog}>T??? ch???i</Button>
              </DialogActions>
            </Dialog>
          </>
        )}
        {(props.allowAdding ?? true) && (
          <Button
            onClick={props.onCreate}
            startIcon={<AddOutlinedIcon />}
            variant={"outlined"}
          >
            Th??m m???i
          </Button>
        )}
      </Stack>
      {
        <DataGrid
          autoHeight
          columns={props.columns}
          rows={props.rows}
          getRowId={props.getRowId}
          loading={props.loading}
          checkboxSelection
          disableSelectionOnClick
          rowHeight={props.rowHeight ?? 52}
          onSelectionModelChange={handleSelectionChange}
          components={{
            Pagination: () => (
              <CustomPagination
                limit={props.pagination.limit}
                offset={props.pagination.offset}
                total={props.pagination.total}
                onPageChange={props.onPageChange}
              />
            ),
          }}
        />
      }
    </Box>
  );
};

export default CustomDataGrid;
