import * as Yup from 'yup';
import { useFormik } from 'formik';
import customerService from './CustomerService';
import { CustomerRegisterFormData } from '../../dto/customer/CustomerRegisterFormData';
import { useToaster, Severity, Variant } from '../../components/toaster/ToasterProvider';
import { AxiosError } from 'axios';

const CustomerRegisterFormValidation = Yup.object({
    name: Yup.string()
        .required('Nome deve ser preenchido.'),

    taxId: Yup.string()
        .required('CNPJ deve ser preenchido.')
        .max(18, 'CNPJ deve ter 14 caracteres.')
        .min(18, 'CNPJ deve ter 14 caracteres.')
})

export const useCustomerRegisterFormik = (
    setLoading: (loading: boolean) => void,
    setOpenModal: (open: boolean) => void
) => {

    const toaster = useToaster();

    return useFormik<CustomerRegisterFormData>({
        initialValues: {
            name: '',
            taxId: ''
        },

        validationSchema: CustomerRegisterFormValidation,

        onSubmit: (values: CustomerRegisterFormData, formikHelpers) => {
            handleFormSubmit(values, setLoading, setOpenModal, formikHelpers, toaster);
        }
    })
}

const handleFormSubmit = async (
    values: CustomerRegisterFormData,
    setLoading: (loading: boolean) => void,
    setOpenModal: (open: boolean) => void,
    formikHelpers: any,
    toaster: (message: string, autoHideDuration?: number, severity?: Severity, variant?: Variant) => void
) => {
    setLoading(true);
    try {
        await customerService.registerCustomer(values);
        toaster('Cliente registrado com sucesso!', 5000, 'success', 'filled');
        setOpenModal(false);
        formikHelpers.resetForm();
    } catch (error) {
        if (error instanceof AxiosError) {
            if (error.message.includes('409')) {
                toaster('CNPJ já registrado!', 5000, 'error', 'filled');
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