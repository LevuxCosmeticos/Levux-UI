import styles from './ProductRegister.module.css';
import { useState } from "react";
import { Modal } from "@mui/material";
import BaseTextField from '../../../components/text/BaseTextField';
import BaseButton from '../../../components/button/BaseButton';
import { useProductRegisterFormik } from '../../../service/product/ProductRegisterForm';
import SaveIcon from '@mui/icons-material/Save';
import colors from '../../../assets/colors/colors';

interface ProductRegisterProps {
    openModal: boolean;
    setOpenModal: (open: boolean) => void;
}

const ProductRegister: React.FC<ProductRegisterProps> = ({ openModal, setOpenModal }) => {

    const [loading, setLoading] = useState(false);

    const registerFormik = useProductRegisterFormik(setLoading, setOpenModal);

    const handleCloseModal = () => {
        setOpenModal(false);
        registerFormik.resetForm();
    }

    const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, '');
        registerFormik.setFieldValue('code', value);
    };

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let numericValue = e.target.value.replace(/\D/g, '');

        if (!numericValue) {
            registerFormik.setFieldValue('value', '');
            return;
        }

        const floatValue = parseFloat(numericValue) / 100;

        const formattedValue = floatValue.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });

        registerFormik.setFieldValue('value', formattedValue);
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
                <h1 className={styles.header}>CADASTRO DE PRODUTO</h1>
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
                        label='Código'
                        required={true}
                        type='text'
                        fieldName='code'
                        value={registerFormik.values.code}
                        onChange={handleCodeChange}
                        onBlur={registerFormik.handleBlur}
                        error={registerFormik.touched.code && Boolean(registerFormik.errors.code)}
                        helperText={registerFormik.touched.code && registerFormik.errors.code}
                    />
                    <BaseTextField
                        initialAdornment='R$'
                        className={styles.text}
                        label='Valor'
                        required={true}
                        type='text'
                        fieldName='value'
                        value={registerFormik.values.value}
                        onChange={handleValueChange}
                        onBlur={registerFormik.handleBlur}
                        error={registerFormik.touched.value && Boolean(registerFormik.errors.value)}
                        helperText={registerFormik.touched.value && registerFormik.errors.value}
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

export default ProductRegister