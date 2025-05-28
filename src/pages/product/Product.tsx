import styles from './Product.module.css';
import PageTitle from '../../components/title/PageTitle';
import BaseTable from '../../components/table/BaseTable';
import BaseButton from '../../components/button/BaseButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import colors from '../../assets/colors/colors';
import { useState, useEffect } from 'react';
import TableHeader from '../../dto/table/TableHeader';
import { useToaster } from "../../components/toaster/ToasterProvider";
import { ProductResponse } from '../../dto/product/ProductResponse';
import ProductRegister from './register/ProductRegister';
import productService from '../../service/product/ProductService';

const Product: React.FC = () => {

    const toaster = useToaster();
    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [products, setProducts] = useState<ProductResponse[]>([]);

    const tableHeaders: TableHeader[] = [
        { label: "Nome", key: "name" },
        { label: "Código", key: "code" },
        { label: "Valor", key: "value" }
    ]

    const fetchProducts = async () => {
        setLoading(true);
        const data = await productService.getProductList(toaster);
        setLoading(false);
        setProducts(data);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className={styles.page}>
            <PageTitle title='Gerenciamento de Produtos' />
            <div className={styles.table}>
                <BaseTable
                    headers={tableHeaders}
                    rows={products}
                    rowKey='code'
                    width='70vw'
                    height='70vh'
                    overflow='auto'
                    loading={loading}
                />
            </div>
            <div className={styles.button}>
                <BaseButton
                    type='button'
                    text='ADICIONAR PRODUTO'
                    icon={AddShoppingCartIcon}
                    variant='contained'
                    backGroundColor={colors.gray}
                    fontSize='60%'
                    border={`1px solid ${colors.gold}`}
                    borderRadius='10vw'
                    onClick={() => setOpenModal(true)}
                    color={colors.gold}
                />
                <ProductRegister
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                    fetchProducts={fetchProducts}
                />
            </div>
        </div>
    )
}

export default Product