import styles from './BaseTable.module.css';
import { Table, TableCell, TableContainer, TableRow, TableHead, TableBody, Paper } from "@mui/material"

interface BaseTableProps<T> {
    headers: string[]
    rows: T[]
    rowKey: keyof T
    width: string
    height: string
    overflow: string
}

const BaseTable = <T extends Record<string, any>>({
    headers,
    rows,
    rowKey,
    width,
    height,
    overflow
}: BaseTableProps<T>) => {

    return (
        <Paper sx={{
            width: width, maxHeight: height, overflow: overflow
        }}>
            <TableContainer className={styles.tableContainer}>
                <Table stickyHeader className={styles.sticky}>
                    <TableHead>
                        <TableRow>
                            {headers.map((header => (
                                <TableCell key={header} className={styles.headerCell}>
                                    {header}
                                </TableCell>
                            )))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row[rowKey] as React.Key}>
                                {headers.map((header) => (
                                    <TableCell key={header} className={styles.bodyCell}>
                                        {row[header]}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )
}

export default BaseTable