import styles from './Customer.module.css';
import PageTitle from '../../components/title/PageTitle';
import BaseTable from '../../components/table/BaseTable';
import BaseButton from '../../components/button/BaseButton';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import colors from '../../assets/colors/colors';
import { useState, useEffect } from 'react';
import CustomerRegister from './register/CustomerRegister';
import { CustomerResponse } from '../../dto/customer/CustomerResponse';
import CustomerService from '../../service/customer/CustomerService';
import TableHeader from '../../dto/table/TableHeader';
import { useToaster } from "../../components/toaster/ToasterProvider";

const Customer: React.FC = () => {

    const toaster = useToaster();
    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [customers, setCustomers] = useState<CustomerResponse[]>([]);

    const tableHeaders: TableHeader[] = [
        { label: "Nome", key: "name" },
        { label: "CNPJ", key: "taxId" }
    ]

    const fetchCustomers = async () => {
        setLoading(true);
        const data = await CustomerService.getCustomerList(toaster);
        setCustomers(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    return (
        <div className={styles.page}>
            <PageTitle title='Gerenciamento de Clientes' />
            <div className={styles.table}>
                <BaseTable
                    headers={tableHeaders}
                    rows={customers}
                    rowKey='taxId'
                    width='70vw'
                    height='70vh'
                    overflow='auto'
                    loading={loading}
                />
            </div>
            <div className={styles.button}>
                <BaseButton
                    type='button'
                    text='ADICIONAR CLIENTE'
                    icon={AddBusinessIcon}
                    variant='contained'
                    backGroundColor={colors.gray}
                    fontSize='60%'
                    border={`1px solid ${colors.gold}`}
                    borderRadius='10vw'
                    onClick={() => setOpenModal(true)}
                    color={colors.gold}
                />
            </div>
            <CustomerRegister
                openModal={openModal}
                setOpenModal={setOpenModal}
                fetchCustomers={fetchCustomers}
            />
        </div>
    )
}

export default Customer