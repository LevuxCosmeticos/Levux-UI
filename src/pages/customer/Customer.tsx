import styles from './Customer.module.css';
import PageTitle from '../../components/title/PageTitle';
import BaseTable from '../../components/table/BaseTable';
import BaseButton from '../../components/button/BaseButton';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import colors from '../../assets/colors/colors';
import { useState } from 'react';
import CustomerRegister from './register/CustomerRegister';

const Customer: React.FC = () => {

    const [openModal, setOpenModal] = useState(false);

    const tableHeaders = [
        'Nome', 'CNPJ'
    ]

    const tableRows = [
        { Nome: 'EMPRESA 1', CNPJ: '00.000.000/0001-01' },
        { Nome: 'EMPRESA 2', CNPJ: '00.000.000/0001-02' },
        { Nome: 'EMPRESA 3', CNPJ: '00.000.000/0001-03' },
        { Nome: 'EMPRESA 4', CNPJ: '00.000.000/0001-04' },
        { Nome: 'EMPRESA 5', CNPJ: '00.000.000/0001-05' },
        { Nome: 'EMPRESA 6', CNPJ: '00.000.000/0001-06' },
        { Nome: 'EMPRESA 7', CNPJ: '00.000.000/0001-07' },
        { Nome: 'EMPRESA 8', CNPJ: '00.000.000/0001-08' },
        { Nome: 'EMPRESA 9', CNPJ: '00.000.000/0001-09' },
        { Nome: 'EMPRESA 10', CNPJ: '00.000.000/0001-10' },
        { Nome: 'EMPRESA 1', CNPJ: '00.000.000/0001-01' },
        { Nome: 'EMPRESA 2', CNPJ: '00.000.000/0001-02' },
        { Nome: 'EMPRESA 3', CNPJ: '00.000.000/0001-03' },
        { Nome: 'EMPRESA 4', CNPJ: '00.000.000/0001-04' },
        { Nome: 'EMPRESA 5', CNPJ: '00.000.000/0001-05' },
        { Nome: 'EMPRESA 6', CNPJ: '00.000.000/0001-06' },
        { Nome: 'EMPRESA 7', CNPJ: '00.000.000/0001-07' },
        { Nome: 'EMPRESA 8', CNPJ: '00.000.000/0001-08' },
        { Nome: 'EMPRESA 9', CNPJ: '00.000.000/0001-09' },
        { Nome: 'EMPRESA 10', CNPJ: '00.000.000/0001-10' }
    ]

    return (
        <div className={styles.page}>
            <PageTitle title='Gerenciamento de Clientes' />
            <div className={styles.table}>
                <BaseTable
                    headers={tableHeaders}
                    rows={tableRows}
                    rowKey='CNPJ'
                    width='70vw'
                    height='70vh'
                    overflow='auto'
                />
            </div>
            <div className={styles.button}>
                <BaseButton
                    type='button'
                    text='ADICIONAR CLIENTE'
                    icon={AddBusinessIcon}
                    variant='contained'
                    backGroundColor={colors.gray}
                    fontSize='80%'
                    border='1px solid white'
                    borderRadius='10vw'
                    onClick={() => setOpenModal(true)}
                />
            </div>
            <CustomerRegister 
                openModal={openModal}
                setOpenModal={setOpenModal}
            />
        </div>
    )
}

export default Customer