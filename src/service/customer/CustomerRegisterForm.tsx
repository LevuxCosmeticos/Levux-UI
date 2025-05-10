import { useFormik } from 'formik';
import * as Yup from 'yup';
import { CustomerRegisterFormData } from '../../dto/customer/CustomerRegisterFormData';

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

    return useFormik<CustomerRegisterFormData>({
        initialValues: {
            name: '',
            taxId: ''
        },

        validationSchema: CustomerRegisterFormValidation,

        onSubmit: (values: CustomerRegisterFormData, formikHelpers) => {
            handleFormSubmit(values, setLoading, setOpenModal, formikHelpers);
        }
    })
}

const handleFormSubmit = async (
    values: CustomerRegisterFormData,
    setLoading: (loading: boolean) => void,
    setOpenModal: (open: boolean) => void,
    formikHelpers: any
) => {
    setLoading(true);
    console.log(values);
    await new Promise(r => setTimeout(r, 2000));
    setOpenModal(false);
    formikHelpers.resetForm();
    setLoading(false);
}