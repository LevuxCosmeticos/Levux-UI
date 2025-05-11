import axios from "axios";
import LocalEnvironment from "../../config/LocalEnvironment";
import { CustomerResponse } from "../../dto/customer/CustomerResponse";
import { Severity, Variant } from "../../components/toaster/ToasterProvider";

class CustomerService {

    formatCNPJ = (cnpj: string): string => {
        return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
    };

    customerUrl = LocalEnvironment.API_URL + '/customer';

    async getCustomerList(
        toaster: (message: string, autoHideDuration: number, severity: Severity, variant: Variant) => void
    ): Promise<CustomerResponse[]> {
        try {
            const response = await axios.get(
                this.customerUrl + '/list'
            );
            return response.data.map((item: any) => ({
                name: item.name,
                taxId: this.formatCNPJ(item.taxId)
            }));
        } catch {
            toaster('Ocorreu um erro, tente novamente mais tarde.', 5000, 'error', 'filled');
            return [];
        }
    }

}

const customerService = new CustomerService();
export default customerService;