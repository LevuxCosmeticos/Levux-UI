import styles from "./CycleTable.module.css";
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
                    sx={{ color: 'white' }}
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
                sx={{
                    input: {
                        color: 'white',
                        fontSize: '100%',
                        '&:-webkit-autofill': {
                            WebkitTextFillColor: 'white',
                            boxShadow: '0 0 0 1000px transparent inset',
                            transition: 'background-color 9999s ease-in-out 0s',
                        },
                        textAlign: 'center',
                        width: `${Math.max(String(value).length, 8)}ch`,
                    },
                    label: { color: 'white' },
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: 'white' },
                        '&:hover fieldset': { borderColor: 'white' },
                        '&.Mui-focused fieldset': { borderColor: 'white' },
                    }
                }}
            /> :
            value
    }

    return rows?.map((row) => (
        <TableRow key={row.productId}>
            <TableCell className={styles.tableRow}>{row.productName}</TableCell>
            <TableCell className={styles.tableRow}>{row.isNew ? editableFields(row.initialBalance, row.productId, 'initialBalance') : row.initialBalance}</TableCell>
            <TableCell className={styles.tableRow}>{editableFields(row.lift, row.productId, 'lift', row.initialBalance)}</TableCell>
            <TableCell className={styles.tableRow}>{row.sold}</TableCell>
            <TableCell className={styles.tableRow}>{editableFields(row.replacement, row.productId, 'replacement')}</TableCell>
            <TableCell className={styles.tableRow}>{row.finalBalance}</TableCell>
        </TableRow>
    ));
}