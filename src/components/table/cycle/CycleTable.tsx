import styles from "./CycleTable.module.css";
import { CycleResponse } from "../../../dto/cycle/filter/CycleResponse";
import { CycleBalanceResponse } from "../../../dto/cycle/filter/CycleBalanceResponse";
import { Table, TableCell, TableContainer, TableRow, TableHead, TableBody, Paper } from "@mui/material"
import formatUtils from "../../../utils/format/FormatUtils";
import { cycleTableHeader } from "./CycleTableHeader";
import { tableEmpty, tableLoading, tableWithData } from "./CycleTableBody";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

interface CycleTableProps {
    data: CycleResponse | null,
    loading: boolean,
    activeCycle: number,
    onBalanceFieldChange: <K extends keyof CycleBalanceResponse>(
        productId: number,
        field: K,
        newValue: CycleBalanceResponse[K]
    ) => void;
    pdfClassName: string;
    onPdfIconClick: () => void;
}

const CycleTable = ({
    data, loading, activeCycle, onBalanceFieldChange, pdfClassName, onPdfIconClick
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
            <div className={styles.pdfIconContainer}>
                <PictureAsPdfIcon
                    className={pdfClassName}
                    onClick={onPdfIconClick}
                />
            </div>
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