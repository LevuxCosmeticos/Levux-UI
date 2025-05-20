import axios from "axios";
import LocalEnvironment from "../../config/LocalEnvironment";
import { Severity, Variant } from "../../components/toaster/ToasterProvider";
import { CycleCustomerFilterResponse } from "../../dto/cycle/filter/CycleCustomerFilterResponse";
import { CycleResponse } from "../../dto/cycle/filter/CycleResponse";

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
            return response.data;
        } catch {
            toaster('Ocorreu um erro, tente novamente mais tarde.', 5000, 'error', 'filled');
            return null;
        }
    }

}

const cycleService = new CycleService();
export default cycleService;