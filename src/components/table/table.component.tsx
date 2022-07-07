import React, { FunctionComponent } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useEffect, useState } from "react";
import TablePagination from "@mui/material/TablePagination";
import { formatDateTime, returnItemRows } from "../../core/shared/functions";
import { TableComponentInterface } from "../../core/interfaces/components/table";

const TableComponent: FunctionComponent<TableComponentInterface> = ({
  items,
  handleTableSplitView,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const itemList = items?.map((i: Item) => {
    const item = i.entity.data;
    const createItem = {
      id: item.id,
      number: item.number,
      summary: item.summary,
      isPrivate: item.isPrivate === true,
      status: item.status === null ? { id: null, name: "-" } : item.status,
      service: item.service === null ? { id: null, name: "-" } : item.service,
      author: item.author.name,
      createdOn: item.createdOn,
      updatedOn: item.updatedOn,
      type: item.type,
    };
    return returnItemRows(createItem);
  });

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpenSplitView = (item: FormatedItem) => {
    handleTableSplitView(item);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
        <Table sx={{ minWidth: 650 }} stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell align="left">Summary</TableCell>
              <TableCell align="left">Private</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="left">Service</TableCell>
              <TableCell align="left">Author</TableCell>
              <TableCell align="left">Created</TableCell>
              <TableCell align="left">Updated</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {itemList
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((i: FormatedItem) => (
                <TableRow
                  key={i.number}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  onClick={(e) => handleOpenSplitView(i)}
                >
                  <TableCell component="th" scope="row">
                    {i.number}
                  </TableCell>
                  <TableCell align="left">{i.summary}</TableCell>
                  <TableCell align="left">
                    {i.isPrivate ? <CheckCircleIcon /> : <CancelIcon />}
                  </TableCell>
                  <TableCell align="left">{i.status.name}</TableCell>
                  <TableCell align="left">{i.service.name}</TableCell>
                  <TableCell align="left">{i.author}</TableCell>
                  <TableCell align="left">
                    {formatDateTime(i.createdOn)}
                  </TableCell>
                  <TableCell align="left">
                    {formatDateTime(i.updatedOn)}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={itemList?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default TableComponent;
