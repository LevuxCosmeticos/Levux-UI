import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useToaster, Severity, Variant } from '../../components/toaster/ToasterProvider';
import { AxiosError } from 'axios';
import { ProductRegisterFormData } from '../../dto/product/ProductRegisterFormData';

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
    setOpenModal: (open: boolean) => void
) => {

    const toaster = useToaster();

    return useFormik<ProductRegisterFormData>({
        initialValues: {
            name: '',
            code: undefined,
            value: undefined
        },

        validationSchema: ProductRegisterFormValidation,

        onSubmit: (values: ProductRegisterFormData, formikHelpers) => {
            handleFormSubmit(values, setLoading, setOpenModal, formikHelpers, toaster);
        }
    })
}

const handleFormSubmit = async (
    values: ProductRegisterFormData,
    setLoading: (loading: boolean) => void,
    setOpenModal: (open: boolean) => void,
    formikHelpers: any,
    toaster: (message: string, autoHideDuration?: number, severity?: Severity, variant?: Variant) => void
) => {
    setLoading(true);
    try {
        //await customerService.registerCustomer(values);
        toaster('Produto registrado com sucesso!', 5000, 'success', 'filled');
        setOpenModal(false);
        formikHelpers.resetForm();
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