import { CycleCustomerFilterResponse } from "../../dto/cycle/filter/CycleCustomerFilterResponse";
import { CycleFilterResponse } from "../../dto/cycle/filter/CycleFilterResponse";
import cycleService from "../../service/cycle/CycleService";
import { Severity, Variant } from '../../components/toaster/ToasterProvider';

class CycleLogic {

    handleCustomerFilterSelectChange = (
        value: CycleCustomerFilterResponse,
        setSelectedCycle: React.Dispatch<React.SetStateAction<CycleFilterResponse | null>>,
        setCycleFilterOptions: React.Dispatch<React.SetStateAction<CycleFilterResponse[]>>,
        setCustomerFilterOptions: React.Dispatch<React.SetStateAction<CycleCustomerFilterResponse[]>>,
        setLoadingFilters: React.Dispatch<React.SetStateAction<boolean>>,
        toaster: (message: string, autoHideDuration?: number, severity?: Severity, variant?: Variant) => void,
        setSelectedCustomer: React.Dispatch<React.SetStateAction<CycleCustomerFilterResponse | null>>
    ) => {
        setSelectedCycle(null);
        setSelectedCustomer(value);
        if (value == null) {
            this.fetchFilters(
                '',
                setCustomerFilterOptions,
                setLoadingFilters,
                toaster
            );
            setCycleFilterOptions([]);
        } else {
            const cycleOptions: CycleFilterResponse[] = [];
            for (let i = 1; i <= value.actualCycle; i++) {
                cycleOptions.push({
                    cycle: i,
                    label: `Ciclo ${i}`
                });
            };
            setCycleFilterOptions(cycleOptions);
        }
    }

    fetchFilters = async (
        strSearch: string,
        setCustomerFilterOptions: React.Dispatch<React.SetStateAction<CycleCustomerFilterResponse[]>>,
        setLoadingFilters: React.Dispatch<React.SetStateAction<boolean>>,
        toaster: (message: string, autoHideDuration?: number, severity?: Severity, variant?: Variant) => void,
    ) => {
        setLoadingFilters(true);
        const data = await cycleService.getCycleFilterList(strSearch, toaster);
        setCustomerFilterOptions(data);
        setLoadingFilters(false);
    }

    filterFormConcluded = (
        selectedCycle: CycleFilterResponse | null,
        selectedCustomer: CycleCustomerFilterResponse | null
    ) => {
        return selectedCustomer && selectedCycle;
    }
}

const cycleLogic = new CycleLogic();
export default cycleLogic;