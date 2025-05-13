import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useToaster, Severity, Variant } from '../../components/toaster/ToasterProvider';
import { AxiosError } from 'axios';
import { ProductRegisterFormData } from '../../dto/product/ProductRegisterFormData';
import productService from './ProductService';

const ProductRegisterFormValidation = Yup.object({
    name: Yup.string()
        .required('Nome deve ser preenchido.'),

    code: Yup.string()
        .required('Código deve ser preenchido.'),

    value: Yup.string()
        .required('Valor deve ser preenchido.')
})

export const useProductRegisterFormik = (
    setLoading: (loading: boolean) => void,
    setOpenModal: (open: boolean) => void,
    fetchProducts: () => void
) => {

    const toaster = useToaster();

    return useFormik<ProductRegisterFormData>({
        initialValues: {
            name: '',
            code: '',
            value: ''
        },

        validationSchema: ProductRegisterFormValidation,

        onSubmit: (values: ProductRegisterFormData, formikHelpers) => {
            handleFormSubmit(values, setLoading, setOpenModal, formikHelpers, toaster, fetchProducts);
        }
    })
}

const handleFormSubmit = async (
    values: ProductRegisterFormData,
    setLoading: (loading: boolean) => void,
    setOpenModal: (open: boolean) => void,
    formikHelpers: any,
    toaster: (message: string, autoHideDuration?: number, severity?: Severity, variant?: Variant) => void,
    fetchProducts: () => void
) => {
    setLoading(true);
    try {
        await productService.registerProduct(values);
        toaster('Produto registrado com sucesso!', 5000, 'success', 'filled');
        setOpenModal(false);
        formikHelpers.resetForm();
        fetchProducts();
    } catch (error) {
        if (error instanceof AxiosError) {
            if (error.message.includes('409')) {
                toaster('Produto já registrado!', 5000, 'error', 'filled');
            } else {
                toaster('Ocorreu um erro, tente novamente mais tarde.', 5000, 'error', 'filled');
            }
        } else {
            toaster('Ocorreu um erro, tente novamente mais tarde.', 5000, 'error', 'filled');
        }
    } finally {
        setLoading(false);
    }
}