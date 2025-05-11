import styles from './BaseTable.module.css';
import { Table, TableCell, TableContainer, TableRow, TableHead, TableBody, Paper, CircularProgress, Box, colors } from "@mui/material"

interface BaseTableProps<T> {
    headers: string[]
    rows: T[]
    rowKey: keyof T
    width: string
    height: string
    overflow: string
    loading?: boolean
}

const BaseTable = <T extends Record<string, any>>({
    headers,
    rows,
    rowKey,
    width,
    height,
    overflow,
    loading = false
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
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={headers.length}>
                                    <Box display="flex"
                                        justifyContent="center"
                                        alignItems="center" 
                                        height="100px"
                                        sx={{ color: 'white' }}
                                    >
                                        <CircularProgress color='inherit'/>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ) : (
                            rows.map((row) => (
                                <TableRow key={row[rowKey] as React.Key}>
                                    {headers.map((header) => (
                                        <TableCell key={header} className={styles.bodyCell}>
                                            {row[header]}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )
}

export default BaseTable