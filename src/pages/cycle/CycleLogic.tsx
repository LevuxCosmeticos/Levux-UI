import { CycleCustomerFilterResponse } from "../../dto/cycle/filter/CycleCustomerFilterResponse";
import { CycleFilterResponse } from "../../dto/cycle/filter/CycleFilterResponse";
import { CycleResponse } from "../../dto/cycle/filter/CycleResponse";
import { CycleBalanceResponse } from "../../dto/cycle/filter/CycleBalanceResponse";
import cycleService from "../../service/cycle/CycleService";
import { Severity, Variant } from '../../components/toaster/ToasterProvider';
import { CycleBalanceUpdateRequest } from "../../dto/cycle/update/request/CycleBalanceUpdateRequest";
import { CycleUpdateRequest } from "../../dto/cycle/update/request/CycleUpdateRequest";

class CycleLogic {

    handleCustomerFilterSelectChange = (
        value: CycleCustomerFilterResponse,
        setCycleFilterOptions: React.Dispatch<React.SetStateAction<CycleFilterResponse[]>>,
        setCustomerFilterOptions: React.Dispatch<React.SetStateAction<CycleCustomerFilterResponse[]>>,
        setLoadingFilters: React.Dispatch<React.SetStateAction<boolean>>,
        toaster: (message: string, autoHideDuration?: number, severity?: Severity, variant?: Variant) => void,
    ) => {
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
        toaster: (message: string, autoHideDuration?: number, severity?: Severity, variant?: Variant) => void
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

    fetchCycleInformation = async (
        selectedCycle: CycleFilterResponse | null,
        selectedCustomer: CycleCustomerFilterResponse | null,
        toaster: (message: string, autoHideDuration?: number, severity?: Severity, variant?: Variant) => void
    ) => {
        const cycleInformation = await cycleService.getCycleInformation(
            selectedCustomer?.customerId,
            selectedCycle?.cycle,
            toaster
        );
        return cycleInformation;
    }

    updateBalanceField<K extends keyof CycleBalanceResponse>(
        cycleResponse: CycleResponse | null,
        setCycleResponse: React.Dispatch<React.SetStateAction<CycleResponse | null>>,
        productId: number,
        field: K,
        newValue: CycleBalanceResponse[K]
    ) {
        if (!cycleResponse) return;

        const updatedBalances = cycleResponse.balances.map((balance) =>
            balance.productId === productId ? {
                ...balance,
                [field]: newValue
            } : balance
        );

        updatedBalances.forEach((balance) => {
            if (balance.initialBalance < balance.lift) balance.lift = balance.initialBalance;
            if (balance.initialBalance === 0) balance.replacement = 0;
            balance.sold = balance.initialBalance - balance.lift;
            balance.finalBalance = balance.initialBalance - balance.sold + balance.replacement;
        });

        setCycleResponse({ ...cycleResponse, balances: updatedBalances });
    }

    saveCycleEdition = async (
        cycleResponse: CycleResponse | null,
        updatedProductIds: number[],
        setLoadingEdition: React.Dispatch<React.SetStateAction<boolean>>,
        toaster: (message: string, autoHideDuration?: number, severity?: Severity, variant?: Variant) => void,
        setCycleResponse: React.Dispatch<React.SetStateAction<CycleResponse | null>>,
        setUpdatedProductIds: React.Dispatch<React.SetStateAction<number[]>>
    ) => {
        setLoadingEdition(true);
        if (!cycleResponse) return;
        if (updatedProductIds.length === 0) return;

        const cycleBalanceUpdateRequest = cycleResponse.balances
            .filter((balance) => updatedProductIds.includes(balance.productId))
            .filter((balance) => balance.initialBalance !== 0)
            .map((balance) => {
                return {
                    productId: balance.productId,
                    initialBalance: balance.initialBalance,
                    lift: balance.lift,
                    replacement: balance.replacement
                }
            }) as CycleBalanceUpdateRequest[];

        const cycleUpdateRequest = {
            customerId: cycleResponse.customerId,
            cycleNumber: cycleResponse.cycle,
            cycleBalanceUpdates: cycleBalanceUpdateRequest
        } as CycleUpdateRequest;

        const response = await cycleService.updateCycle(
            cycleUpdateRequest,
            toaster
        );

        if (response) {
            setCycleResponse(response);
            setUpdatedProductIds([]);
        }

        setLoadingEdition(false);
    }

    closeCycle = async (
        cycleResponse: CycleResponse | null,
        setLoadingEndCycle: React.Dispatch<React.SetStateAction<boolean>>,
        toaster: (message: string, autoHideDuration?: number, severity?: Severity, variant?: Variant) => void,
        setSelectedCustomer: React.Dispatch<React.SetStateAction<CycleCustomerFilterResponse | null>>,
        setCycleResponse: React.Dispatch<React.SetStateAction<CycleResponse | null>>,
        setCycleFilterOptions: React.Dispatch<React.SetStateAction<CycleFilterResponse[]>>,
        setSelectedCycle: React.Dispatch<React.SetStateAction<CycleFilterResponse | null>>
    ) => {
        setLoadingEndCycle(true);
        if (!cycleResponse) return;

        const response = await cycleService.closeCycle(
            cycleResponse.customerId,
            cycleResponse.cycle,
            toaster
        );

        if (response) {
            const newCycle = response.cycle;
            const newFilterOption = {
                cycle: newCycle,
                label: `Ciclo ${newCycle}`
            } as CycleFilterResponse;

            setSelectedCustomer(prev => prev ? { ...prev, actualCycle: newCycle } : prev);
            setCycleFilterOptions(prev => [
                ...prev,
                newFilterOption
            ]);
            setSelectedCycle(newFilterOption);
            setCycleResponse(response);
        }

        setLoadingEndCycle(false);
    }

    shouldGeneratePdf = (
        updatedProductIds: number[],
        cycleResponse: CycleResponse | null,
        selectedCustomer: CycleCustomerFilterResponse | null
    ): boolean => {
        return updatedProductIds.length === 0 &&
            cycleResponse !== null &&
            cycleResponse.balances?.filter((balance) => balance.initialBalance !== 0).length > 0 &&
            selectedCustomer !== null
    }
}

const cycleLogic = new CycleLogic();
export default cycleLogic;