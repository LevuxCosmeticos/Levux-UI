import { TableCell, TableRow, CircularProgress, Box } from "@mui/material"
import { cycleTableHeader } from "./CycleTableHeader"
import { CycleResponse } from "../../../dto/cycle/filter/CycleResponse";

const headers = cycleTableHeader;

export const tableLoading = () => {
    return (
        <TableRow>
            <TableCell colSpan={headers.length}>
                <Box display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100px"
                    sx={{ color: 'black' }}
                >
                    <CircularProgress color='inherit' />
                </Box>
            </TableCell>
        </TableRow>
    )
}

export const tableEmpty = () => {
    return (
        <TableRow>
            <TableCell colSpan={headers.length}>
                <Box display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100px"
                    sx={{ color: 'black' }}
                >
                    <h1>Sem dados, selecione uma opção e clique no botão de pesquisa.</h1>
                </Box>
            </TableCell>
        </TableRow>
    );
}

export const tableWithData = (data: CycleResponse) => {
    const rows = data?.balances;
    return rows?.map((row) => (
        <TableRow key={row.productId}>
            <TableCell>{row.productName}</TableCell>
            <TableCell>{row.initialBalance}</TableCell>
            <TableCell>{row.lift}</TableCell>
            <TableCell>{row.sold}</TableCell>
            <TableCell>{row.replacement}</TableCell>
            <TableCell>{row.finalBalance}</TableCell>
        </TableRow>
    ));
}