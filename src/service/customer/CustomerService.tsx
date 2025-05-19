import axios from "axios";
import LocalEnvironment from "../../config/LocalEnvironment";
import { CustomerResponse } from "../../dto/customer/CustomerResponse";
import { Severity, Variant } from "../../components/toaster/ToasterProvider";
import { CustomerRegisterFormData } from "../../dto/customer/CustomerRegisterFormData";
import formatUtils from "../../utils/format/FormatUtils";

class CustomerService {

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
                taxId: formatUtils.formatCNPJ(item.taxId)
            }));
        } catch {
            toaster('Ocorreu um erro, tente novamente mais tarde.', 5000, 'error', 'filled');
            return [];
        }
    }

    async registerCustomer(
        customerRegisterFormData: CustomerRegisterFormData
    ) {
        return await axios.post(
            this.customerUrl,
            {
                'name': customerRegisterFormData.name,
                'taxId': formatUtils.formatCNPJ(customerRegisterFormData.taxId)
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
    }

}

const customerService = new CustomerService();
export default customerService;