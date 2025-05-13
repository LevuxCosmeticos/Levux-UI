import axios from "axios";
import LocalEnvironment from "../../config/LocalEnvironment";
import { Severity, Variant } from "../../components/toaster/ToasterProvider";
import { ProductResponse } from "../../dto/product/ProductResponse";

class ProductService {

    productUrl = LocalEnvironment.API_URL + '/product';

    formatValue = (value: number) => {
    return value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
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
                value: this.formatValue(item.value)
            }));
        } catch {
            toaster('Ocorreu um erro, tente novamente mais tarde.', 5000, 'error', 'filled');
            return [];
        }
    }

}

const productService = new ProductService();
export default productService;