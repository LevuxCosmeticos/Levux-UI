import axios from "axios";
import LocalEnvironment from "../../config/LocalEnvironment";
import { Severity, Variant } from "../../components/toaster/ToasterProvider";
import { ProductResponse } from "../../dto/product/ProductResponse";
import { ProductRegisterFormData } from "../../dto/product/ProductRegisterFormData";

class ProductService {

    productUrl = LocalEnvironment.API_URL + '/product';

    formatBRL = (value: number) => {
        return value.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        });
    };

    formatUSD = (value: string) => {
        const normalized = value.replace(/\./g, '').replace(',', '.');
        const floatValue = parseFloat(normalized);
        return floatValue.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    };

    async getProductList(
        toaster: (message: string, autoHideDuration: number, severity: Severity, variant: Variant) => void
    ): Promise<ProductResponse[]> {
        try {
            const response = await axios.get(
                this.productUrl + '/list'
            );
            return response.data.map((item: any) => ({
                name: item.name,
                code: item.code,
                value: this.formatBRL(item.value)
            }));
        } catch {
            toaster('Ocorreu um erro, tente novamente mais tarde.', 5000, 'error', 'filled');
            return [];
        }
    }

    async registerProduct(
        productRegisterFormData: ProductRegisterFormData
    ) {
        return await axios.post(
            this.productUrl,
            {
                name: productRegisterFormData.name,
                code: productRegisterFormData.code,
                value: this.formatUSD(productRegisterFormData.value)
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
    }

}

const productService = new ProductService();
export default productService;