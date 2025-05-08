import styles from '../Menu.module.css';
import { Divider, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Store } from '@mui/icons-material';

interface CustomerOptionProps {
    onClick: () => void
}

const CustomerOption: React.FC<CustomerOptionProps> = ({
    onClick
}) => {

    return (
        <List>
            <Divider className={styles.divider} />
            <ListItemButton onClick={onClick}>
                <ListItemIcon className={styles.listIcon}>
                    <Store className={styles.icon} fontSize='large' />
                    <ListItemText primary="Clientes"
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

export default CustomerOption;