import styles from '../Menu.module.css';
import { Divider, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

interface ProductOptionProps {
    onClick: () => void
}

const ProductOption: React.FC<ProductOptionProps> = ({
    onClick
}) => {

    return (
        <List disablePadding>
            <ListItemButton onClick={onClick}>
                <ListItemIcon className={styles.listIcon}>
                    <LocalOfferIcon className={styles.icon} fontSize='large' />
                    <ListItemText primary="Produtos"
                        className={styles.itemHeader}
                        slotProps={{
                            primary: {
                                style: { fontSize: '55%' }
                            }
                        }} />
                </ListItemIcon>
            </ListItemButton>
            <Divider className={styles.divider} />
        </List>
    )
}

export default ProductOption;