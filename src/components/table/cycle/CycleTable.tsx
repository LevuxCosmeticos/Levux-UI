import { CycleResponse } from "../../../dto/cycle/filter/CycleResponse";
import { Table, TableCell, TableContainer, TableRow, TableHead, TableBody, Paper } from "@mui/material"
import formatUtils from "../../../utils/format/FormatUtils";
import { cycleTableHeader } from "./CycleTableHeader";
import { tableEmpty, tableLoading, tableWithData } from "./CycleTableBody";

interface CycleTableProps {
    data: CycleResponse | null,
    loading: boolean
}

const CycleTable = ({
    data, loading
}: CycleTableProps) => {

    const headers = cycleTableHeader;

    let tableBody;
    if (loading) {
        tableBody = tableLoading();
    } else if (data) {
        tableBody = tableWithData(data);
    } else {
        tableBody = tableEmpty();
    }

    return (
        <Paper>
            {
                data &&
                <h1>{data.customerName} - {formatUtils.formatCNPJ(data.taxId)}</h1>
            }
            <TableContainer>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            {headers.map((header) => (
                                <TableCell key={header.key} >
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
    )

}

export default CycleTable;