import styles from './CustomerRegister.module.css';
import { useState } from "react";
import { useCustomerRegisterFormik } from "../../../service/customer/CustomerRegisterForm";
import { Modal } from "@mui/material";
import BaseTextField from '../../../components/text/BaseTextField';
import BaseButton from '../../../components/button/BaseButton';
import SaveIcon from '@mui/icons-material/Save';
import colors from '../../../assets/colors/colors';

interface CustomerRegisterProps {
    openModal: boolean;
    setOpenModal: (open: boolean) => void;
}

const CustomerRegister: React.FC<CustomerRegisterProps> = ({ openModal, setOpenModal }) => {

    const [loading, setLoading] = useState(false);

    const registerFormik = useCustomerRegisterFormik(setLoading, setOpenModal);

    const handleCloseModal = () => {
        setOpenModal(false);
        registerFormik.resetForm();
    }

    const handleTaxIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, '');
        value = value
            .replace(/^(\d{2})(\d)/, '$1.$2')
            .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
            .replace(/\.(\d{3})(\d)/, '.$1/$2')
            .replace(/(\d{4})(\d)/, '$1-$2');
        registerFormik.setFieldValue('taxId', value);
    };

    return (
        <Modal
            open={openModal}
            onClose={handleCloseModal}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <div className={styles.modal}>
                <h1 className={styles.header}>CADASTRO DE CLIENTE</h1>
                <form onSubmit={registerFormik.handleSubmit}>
                    <BaseTextField
                        className={styles.text}
                        label='Nome'
                        required={true}
                        type='text'
                        fieldName='name'
                        value={registerFormik.values.name}
                        onChange={registerFormik.handleChange}
                        onBlur={registerFormik.handleBlur}
                        error={registerFormik.touched.name && Boolean(registerFormik.errors.name)}
                        helperText={registerFormik.touched.name && registerFormik.errors.name}
                    />
                    <BaseTextField
                        className={styles.text}
                        label='CNPJ'
                        required={true}
                        type='text'
                        fieldName='taxId'
                        value={registerFormik.values.taxId}
                        onChange={handleTaxIdChange}
                        onBlur={registerFormik.handleBlur}
                        error={registerFormik.touched.taxId && Boolean(registerFormik.errors.taxId)}
                        helperText={registerFormik.touched.taxId && registerFormik.errors.taxId}
                        maxLength={18}
                    />
                    <BaseButton
                        text='SALVAR'
                        type='submit'
                        loading={loading}
                        icon={SaveIcon}
                        backGroundColor={colors.lightGray}
                        variant='contained'
                        border='1px solid white'
                        borderRadius='10vw'
                        fontSize='80%'
                        spinnerSize={25}
                        className={styles.button}
                    />
                </form>
            </div>
        </Modal>
    );

}

export default CustomerRegister