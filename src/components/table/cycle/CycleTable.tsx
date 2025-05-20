import styles from "./CycleTable.module.css";
import { CycleResponse } from "../../../dto/cycle/filter/CycleResponse";
import { CycleBalanceResponse } from "../../../dto/cycle/filter/CycleBalanceResponse";
import { Table, TableCell, TableContainer, TableRow, TableHead, TableBody, Paper } from "@mui/material"
import formatUtils from "../../../utils/format/FormatUtils";
import { cycleTableHeader } from "./CycleTableHeader";
import { tableEmpty, tableLoading, tableWithData } from "./CycleTableBody";

interface CycleTableProps {
    data: CycleResponse | null,
    loading: boolean,
    activeCycle: number,
    onBalanceFieldChange: <K extends keyof CycleBalanceResponse>(
        productId: number,
        field: K,
        newValue: CycleBalanceResponse[K]
    ) => void;
}

const CycleTable = ({
    data, loading, activeCycle, onBalanceFieldChange
}: CycleTableProps) => {

    const headers = cycleTableHeader;

    let tableBody;
    if (loading) {
        tableBody = tableLoading();
    } else if (data) {
        tableBody = tableWithData(data, activeCycle, onBalanceFieldChange);
    } else {
        tableBody = tableEmpty();
    }

    return (
        <div className={styles.tableWrapper}>
            {data &&
                <h1 className={styles.title}>{data.customerName} - {formatUtils.formatCNPJ(data.taxId)}</h1>
            }
            <Paper className={styles.paper}>
                <TableContainer className={styles.tableContainer}>
                    <Table stickyHeader className={styles.sticky}>
                        <TableHead>
                            <TableRow>
                                {headers.map((header) => (
                                    <TableCell key={header.key} className={styles.headerCell}>
                                        {header.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tableBody}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </div>
    )

}

export default CycleTable;