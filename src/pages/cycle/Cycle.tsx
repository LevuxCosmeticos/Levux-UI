import { useState, useEffect } from "react";
import styles from './Cycle.module.css';
import FilteredSelect from "../../components/select/FilteredSelect";
import { CycleFilterResponse } from "../../dto/cycle/filter/CycleFilterResponse";
import { useToaster } from "../../components/toaster/ToasterProvider";
import cycleService from "../../service/cycle/CycleService";
import formatUtils from "../../utils/format/FormatUtils";

const Cycle: React.FC = () => {

    const toaster = useToaster();
    const [options, setOptions] = useState<CycleFilterResponse[]>([]);
    const [loadingFilters, setLoadingFilters] = useState(false);

    const fetchFilters = async (strSearch: string) => {
        setLoadingFilters(true);
        const data = await cycleService.getCycleFilterList(strSearch, toaster);
        setOptions(data);
        setLoadingFilters(false);
    }

    const handleSelectChange = (value: CycleFilterResponse) => {
        if (value == null) {
            fetchFilters('');
        }
    }

    useEffect(() => {
        fetchFilters('');
    }, []);

    return (
        <div>
            <FilteredSelect
                options={options}
                getOptionLabel={(option) => option.customerName}
                getOptionSubLabel={(option) => formatUtils.formatCNPJ(option.taxId)}
                noOptionsText="Nenhuma empresa encontrada"
                className={styles.companySelect}
                fontSize="100%"
                textChange={(value) => { fetchFilters(value) }}
                selectChange={(value) => { handleSelectChange(value) }}
                loading={loadingFilters}
            />
        </div>
    )
}

export default Cycle;