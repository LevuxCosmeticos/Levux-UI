import styles from "./CycleTable.module.css";
import { TableCell, TableRow, CircularProgress, Box, TextField } from "@mui/material"
import { cycleTableHeader } from "./CycleTableHeader"
import { CycleResponse } from "../../../dto/cycle/filter/CycleResponse";
import { CycleBalanceResponse } from "../../../dto/cycle/filter/CycleBalanceResponse";
import colors from "../../../assets/colors/colors";

const headers = cycleTableHeader;

export const tableLoading = () => {
    return (
        <TableRow>
            <TableCell colSpan={headers.length} sx={{ borderBottom: `1px solid ${colors.gold}`}}>
                <Box display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100px"
                    sx={{ color: colors.gold }}
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
            <TableCell colSpan={headers.length} sx={{ borderBottom: `1px solid ${colors.gold}`}}>
                <Box display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100px"
                    sx={{ color: 'black' }}
                >
                    <h1 className={styles.emptyTable}>Sem dados, selecione uma opção e clique no botão de pesquisa.</h1>
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
        row: CycleBalanceResponse,
        max?: number
    ) => {
        return isActiveCycle ?
            <TextField
                type="number"
                value={value}
                onChange={(e) => {
                    if (row.initialBalance !== 0 || field === 'initialBalance') onBalanceFieldChange(productId, field, Number(e.target.value))
                }}
                inputProps={{
                    min: 0,
                    max: max
                }}
                sx={{
                    input: {
                        color: colors.gold,
                        fontSize: '100%',
                        '&:-webkit-autofill': {
                            WebkitTextFillColor: 'white',
                            boxShadow: '0 0 0 1000px transparent inset',
                            transition: 'background-color 9999s ease-in-out 0s',
                        },
                        textAlign: 'center',
                        width: `${Math.max(String(value).length, 8)}ch`,
                    },
                    label: { color: colors.gold },
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: colors.gold },
                        '&:hover fieldset': { borderColor: colors.gold },
                        '&.Mui-focused fieldset': { borderColor: colors.gold },
                    }
                }}
            /> :
            value
    }

    return rows?.map((row) => (
        <TableRow key={row.productId}>
            <TableCell className={styles.tableRow}>{row.productName}</TableCell>
            <TableCell className={styles.tableRow}>{row.isNew ? editableFields(row.initialBalance, row.productId, 'initialBalance', row) : row.initialBalance}</TableCell>
            <TableCell className={styles.tableRow}>{editableFields(row.lift, row.productId, 'lift', row, row.initialBalance)}</TableCell>
            <TableCell className={styles.tableRow}>{row.sold}</TableCell>
            <TableCell className={styles.tableRow}>{editableFields(row.replacement, row.productId, 'replacement', row)}</TableCell>
            <TableCell className={styles.tableRow}>{row.finalBalance}</TableCell>
        </TableRow>
    ));
}