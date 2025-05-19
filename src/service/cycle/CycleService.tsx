import axios from "axios";
import LocalEnvironment from "../../config/LocalEnvironment";
import { Severity, Variant } from "../../components/toaster/ToasterProvider";
import { CycleFilterResponse } from "../../dto/cycle/filter/CycleFilterResponse";

class CycleService {

    cycleUrl = LocalEnvironment.API_URL + '/cycle';

    async getCycleFilterList(
        strSearch: string,
        toaster: (message: string, autoHideDuration: number, severity: Severity, variant: Variant) => void
    ): Promise<CycleFilterResponse[]> {
        try {
            const response = await axios.get(
                this.cycleUrl + '/filter',
                {
                    params: {
                        strSearch: strSearch
                    }
                }
            );
            return response.data.map((item: any) => ({
                customerId: item.customerId,
                customerName: item.customerName,
                actualCycle: item.actualCycle,
                taxId: item.taxId
            }));
        } catch {
            toaster('Ocorreu um erro, tente novamente mais tarde.', 5000, 'error', 'filled');
            return [];
        }
    }

}

const cycleService = new CycleService();
export default cycleService;