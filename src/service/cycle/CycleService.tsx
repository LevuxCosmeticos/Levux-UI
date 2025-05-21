import axios from "axios";
import LocalEnvironment from "../../config/LocalEnvironment";
import { Severity, Variant } from "../../components/toaster/ToasterProvider";
import { CycleCustomerFilterResponse } from "../../dto/cycle/filter/CycleCustomerFilterResponse";
import { CycleResponse } from "../../dto/cycle/filter/CycleResponse";
import { CycleUpdateRequest } from "../../dto/cycle/update/request/CycleUpdateRequest";

class CycleService {

    cycleUrl = LocalEnvironment.API_URL + '/cycle';

    async getCycleFilterList(
        strSearch: string,
        toaster: (message: string, autoHideDuration: number, severity: Severity, variant: Variant) => void
    ): Promise<CycleCustomerFilterResponse[]> {
        try {
            const response = await axios.get<CycleCustomerFilterResponse[]>(
                this.cycleUrl + '/filter',
                {
                    params: {
                        strSearch: strSearch
                    }
                }
            );
            return response.data;
        } catch {
            toaster('Ocorreu um erro, tente novamente mais tarde.', 5000, 'error', 'filled');
            return [];
        }
    }

    async getCycleInformation(
        customerId: number | undefined,
        cycleNumber: number | undefined,
        toaster: (message: string, autoHideDuration: number, severity: Severity, variant: Variant) => void
    ): Promise<CycleResponse | null> {
        try {
            const response = await axios.get<CycleResponse>(
                this.cycleUrl,
                {
                    params: {
                        customerId: customerId,
                        cycleNumber: cycleNumber
                    }
                }
            );

            if (response.data && Array.isArray(response.data.balances)) {
                response.data.balances = response.data.balances.map(balance => ({
                    ...balance,
                    isNew: balance.initialBalance === 0
                }));
            }
            return response.data;
        } catch {
            toaster('Ocorreu um erro, tente novamente mais tarde.', 5000, 'error', 'filled');
            return null;
        }
    }

    async updateCycle(
        cycleUpdateRequest: CycleUpdateRequest,
        toaster: (message: string, autoHideDuration: number, severity: Severity, variant: Variant) => void
    ): Promise<CycleResponse | null> {
        try {
            const response = await axios.patch<CycleResponse>(
                this.cycleUrl + '/update',
                cycleUpdateRequest
            );
            toaster('Edição salva com sucesso!', 5000, 'success', 'filled');
            if (response.data && Array.isArray(response.data.balances)) {
                response.data.balances = response.data.balances.map(balance => ({
                    ...balance,
                    isNew: balance.initialBalance === 0
                }));
            }
            return response.data;
        } catch {
            toaster('Ocorreu um erro, tente novamente mais tarde.', 5000, 'error', 'filled');
            return null;
        }

    }

}

const cycleService = new CycleService();
export default cycleService;