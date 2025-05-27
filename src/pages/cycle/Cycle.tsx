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
import BaseButton from "../../components/button/BaseButton";
import SaveIcon from '@mui/icons-material/Save';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import colors from "../../assets/colors/colors";
import PageLoading from "../../components/loading/PageLoading";

const Cycle: React.FC = () => {

    const toaster = useToaster();

    const [customerFilterOptions, setCustomerFilterOptions] = useState<CycleCustomerFilterResponse[]>([]);
    const [selectedCustomer, setSelectedCustomer] = useState<CycleCustomerFilterResponse | null>(null);

    const [cycleFilterOptions, setCycleFilterOptions] = useState<CycleFilterResponse[]>([]);
    const [selectedCycle, setSelectedCycle] = useState<CycleFilterResponse | null>(null);
    const [cycleResponse, setCycleResponse] = useState<CycleResponse | null>(null);

    const [loadingFilters, setLoadingFilters] = useState(false);
    const [loadingTable, setLoadingTable] = useState(false);
    const [loadingEdition, setLoadingEdition] = useState(false);
    const [loadingEndCycle, setLoadingEndCycle] = useState(false);
    const [loadingPdf, setLoadingPdf] = useState(false);

    const [updatedProductIds, setUpdatedProductIds] = useState<number[]>([]);

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
        setUpdatedProductIds([]);
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
        setCycleResponse(null);
        setUpdatedProductIds([]);
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
        setUpdatedProductIds([]);
    }

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
        setUpdatedProductIds((prev) => {
            if (!prev.includes(productId)) {
                return [...prev, productId];
            } else if (newValue === 0 && field === 'initialBalance') {
                return prev.filter(id => id !== productId);
            }
            return prev;
        });
    };

    const handleSaveEdit = async () => {
        cycleLogic.saveCycleEdition(
            cycleResponse,
            updatedProductIds,
            setLoadingEdition,
            toaster,
            setCycleResponse,
            setUpdatedProductIds
        );
    }

    const handleCloseCycle = async () => {
        cycleLogic.closeCycle(
            cycleResponse,
            setLoadingEndCycle,
            toaster,
            setSelectedCustomer,
            setCycleResponse,
            setCycleFilterOptions,
            setSelectedCycle
        );
    }

    const handlePdfIconClick = async () => {
        if (cycleLogic.shouldGeneratePdf(
            updatedProductIds,
            cycleResponse,
            selectedCustomer
        )) {
            setLoadingPdf(true);
            await new Promise(resolve => setTimeout(resolve, 3000));
            setLoadingPdf(false);
        } else {
            console.log('Cannot generate PDF, no changes made');
        }
    }

    useEffect(() => {
        fetchFilters('');
    }, []);

    return (
        <div className={styles.cyclePage}>
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
                pdfClassName={
                    cycleLogic.shouldGeneratePdf(
                        updatedProductIds,
                        cycleResponse,
                        selectedCustomer
                    ) ?
                        styles.pdfIconActive :
                        styles.pdfIconDisabled
                }
                onPdfIconClick={handlePdfIconClick}
            />
            {
                updatedProductIds.length > 0 &&
                <BaseButton
                    text='SALVAR'
                    onClick={() => handleSaveEdit()}
                    loading={loadingEdition}
                    icon={SaveIcon}
                    backGroundColor={colors.gray}
                    variant='contained'
                    border='1px solid white'
                    borderRadius='10vw'
                    fontSize='100%'
                    spinnerSize={25}
                    className={styles.button}
                />
            }
            {
                updatedProductIds.length === 0 &&
                cycleResponse &&
                cycleResponse.balances?.filter((balance) => balance.initialBalance !== 0).length > 0 &&
                selectedCustomer &&
                cycleResponse.cycle === selectedCustomer.actualCycle &&
                <BaseButton
                    text='ENCERRAR CICLO'
                    onClick={handleCloseCycle}
                    loading={loadingEndCycle}
                    icon={DoneAllIcon}
                    backGroundColor={colors.gray}
                    variant='contained'
                    border='1px solid white'
                    borderRadius='10vw'
                    fontSize='100%'
                    spinnerSize={25}
                    className={styles.button}
                />
            }
            <PageLoading loading={loadingPdf} />
        </div>
    )
}

export default Cycle;