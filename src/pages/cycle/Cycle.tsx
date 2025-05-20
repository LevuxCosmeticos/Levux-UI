import { useState, useEffect } from "react";
import styles from './Cycle.module.css';
import FilteredSelect from "../../components/select/FilteredSelect";
import { CycleCustomerFilterResponse } from "../../dto/cycle/filter/CycleCustomerFilterResponse";
import { useToaster } from "../../components/toaster/ToasterProvider";
import formatUtils from "../../utils/format/FormatUtils";
import { CycleFilterResponse } from "../../dto/cycle/filter/CycleFilterResponse";
import cycleLogic from "./CycleLogic";

const Cycle: React.FC = () => {

    const toaster = useToaster();

    const [customerFilterOptions, setCustomerFilterOptions] = useState<CycleCustomerFilterResponse[]>([]);

    const [cycleFilterOptions, setCycleFilterOptions] = useState<CycleFilterResponse[]>([]);
    const [selectedCycle, setSelectedCycle] = useState<CycleFilterResponse | null>(null);

    const [loadingFilters, setLoadingFilters] = useState(false);

    const fetchFilters = (strSearch: string) => {
        cycleLogic.fetchFilters(
            strSearch,
            setCustomerFilterOptions,
            setLoadingFilters,
            toaster
        );
    }

    const handleCustomerChange = (value: CycleCustomerFilterResponse) => {
        cycleLogic.handleCustomerFilterSelectChange(
            value,
            setSelectedCycle,
            setCycleFilterOptions,
            setCustomerFilterOptions,
            setLoadingFilters,
            toaster
        );
    }

    useEffect(() => {
        fetchFilters('');
    }, []);

    return (
        <div>
            <form className={styles.filterForm}>
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
                <FilteredSelect
                    options={cycleFilterOptions}
                    getOptionLabel={(option) => option.label}
                    noOptionsText="Nenhum ciclo encontrado"
                    className={styles.cycleSelect}
                    fontSize="100%"
                    value={selectedCycle}
                    selectChange={(value) => { setSelectedCycle(value) }}
                    label='Ciclo'
                />
            </form>
        </div>
    )
}

export default Cycle;