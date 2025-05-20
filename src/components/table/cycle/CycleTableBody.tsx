import { TableCell, TableRow, CircularProgress, Box, TextField } from "@mui/material"
import { cycleTableHeader } from "./CycleTableHeader"
import { CycleResponse } from "../../../dto/cycle/filter/CycleResponse";
import { CycleBalanceResponse } from "../../../dto/cycle/filter/CycleBalanceResponse";

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

export const tableWithData = (
    data: CycleResponse,
    activeCycle: number,
    onBalanceFieldChange: <K extends keyof CycleBalanceResponse>(
        productId: number,
        field: K,
        newValue: CycleBalanceResponse[K]
    ) => void
) => {

    const rows = data.balances;
    const isActiveCycle = data?.cycle === activeCycle;

    const editableFields = (
        value: number, 
        productId: number, 
        field: keyof CycleBalanceResponse,
        max?: number
    ) => {
        return isActiveCycle ?
            <TextField
                type="number"
                value={value}
                onChange={(e) => onBalanceFieldChange(productId, field, Number(e.target.value))}
                inputProps={{
                    min: 0,
                    max: max
                }}
            /> :
            value
    }

    return rows?.map((row) => (
        <TableRow key={row.productId}>
            <TableCell>{row.productName}</TableCell>
            <TableCell>{row.isNew ? editableFields(row.initialBalance, row.productId, 'initialBalance') : row.initialBalance}</TableCell>
            <TableCell>{editableFields(row.lift, row.productId, 'lift', row.initialBalance)}</TableCell>
            <TableCell>{row.sold}</TableCell>
            <TableCell>{editableFields(row.replacement, row.productId, 'replacement')}</TableCell>
            <TableCell>{row.finalBalance}</TableCell>
        </TableRow>
    ));
}