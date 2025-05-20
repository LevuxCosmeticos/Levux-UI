import { useState, useEffect } from "react";
import styles from './Cycle.module.css';
import FilteredSelect from "../../components/select/FilteredSelect";
import { CycleCustomerFilterResponse } from "../../dto/cycle/filter/CycleCustomerFilterResponse";
import { useToaster } from "../../components/toaster/ToasterProvider";
import formatUtils from "../../utils/format/FormatUtils";
import { CycleFilterResponse } from "../../dto/cycle/filter/CycleFilterResponse";
import SearchIcon from '@mui/icons-material/Search';
import cycleLogic from "./CycleLogic";
import { CycleResponse } from "../../dto/cycle/filter/CycleResponse";
import { CycleBalanceResponse } from "../../dto/cycle/filter/CycleBalanceResponse";
import CycleTable from "../../components/table/cycle/CycleTable";

const Cycle: React.FC = () => {

    const toaster = useToaster();

    const [customerFilterOptions, setCustomerFilterOptions] = useState<CycleCustomerFilterResponse[]>([]);
    const [selectedCustomer, setSelectedCustomer] = useState<CycleCustomerFilterResponse | null>(null);

    const [cycleFilterOptions, setCycleFilterOptions] = useState<CycleFilterResponse[]>([]);
    const [selectedCycle, setSelectedCycle] = useState<CycleFilterResponse | null>(null);

    const [loadingFilters, setLoadingFilters] = useState(false);

    const [cycleResponse, setCycleResponse] = useState<CycleResponse | null>(null);

    const [loadingTable, setLoadingTable] = useState(false);

    const fetchFilters = (strSearch: string) => {
        cycleLogic.fetchFilters(
            strSearch,
            setCustomerFilterOptions,
            setLoadingFilters,
            toaster
        );
    }

    const handleCustomerChange = (value: CycleCustomerFilterResponse) => {
        setSelectedCustomer(value);
        setSelectedCycle(null);
        setCycleResponse(null);
        cycleLogic.handleCustomerFilterSelectChange(
            value,
            setCycleFilterOptions,
            setCustomerFilterOptions,
            setLoadingFilters,
            toaster
        );
    }

    const handleFilterSubmit = async () => {
        setLoadingTable(true);
        if (cycleLogic.filterFormConcluded(selectedCycle, selectedCustomer)) {
            const response = await cycleLogic.fetchCycleInformation(
                selectedCycle,
                selectedCustomer,
                toaster
            );
            setCycleResponse(response);
        }
        setLoadingTable(false);
    }

    const handleCycleChange = (value: CycleFilterResponse) => {
        setSelectedCycle(value);
        setCycleResponse(null);
    }

    useEffect(() => {
        fetchFilters('');
    }, []);

    const handleBalanceFieldChange = <K extends keyof CycleBalanceResponse>(
        productId: number,
        field: K,
        newValue: CycleBalanceResponse[K]
    ) => {
        cycleLogic.updateBalanceField(
            cycleResponse,
            setCycleResponse,
            productId,
            field,
            newValue
        );
    };

    return (
        <div>
            <form className={styles.filterForm} >
                <FilteredSelect
                    options={customerFilterOptions}
                    getOptionLabel={(option) => option.customerName}
                    getOptionSubLabel={(option) => formatUtils.formatCNPJ(option.taxId)}
                    noOptionsText="Nenhuma empresa encontrada"
                    className={styles.customerSelect}
                    fontSize="100%"
                    textChange={(value) => { fetchFilters(value) }}
                    selectChange={(value) => { handleCustomerChange(value) }}
                    loading={loadingFilters}
                    label='Empresa'
                />
                <div className={styles.formButton}>
                    <FilteredSelect
                        options={cycleFilterOptions}
                        getOptionLabel={(option) => option.label}
                        noOptionsText="Nenhum ciclo encontrado"
                        className={styles.cycleSelect}
                        fontSize="100%"
                        value={selectedCycle}
                        selectChange={(value) => { handleCycleChange(value) }}
                        label='Ciclo'
                    />
                    <SearchIcon
                        onClick={() => { handleFilterSubmit() }}
                        className={
                            cycleLogic.filterFormConcluded(selectedCycle, selectedCustomer)
                                ? styles.searchIcon
                                : styles.searchIconDisabled
                        }
                        fontSize="large"
                    />
                </div>
            </form>
            <CycleTable
                data={cycleResponse}
                loading={loadingTable}
                activeCycle={selectedCustomer ? selectedCustomer.actualCycle : 0}
                onBalanceFieldChange={handleBalanceFieldChange}
            />
        </div>
    )
}

export default Cycle;