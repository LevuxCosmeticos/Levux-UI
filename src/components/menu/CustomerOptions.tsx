import styles from './Menu.module.css';
import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Store } from '@mui/icons-material';

const CustomerOptions: React.FC = () => {


    return (
        <List>
            <Divider className={styles.divider} />
            <ListItemButton>
                <ListItem>
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
                </ListItem>
            </ListItemButton>
            <Divider className={styles.divider}/>
        </List>
    )
}

export default CustomerOptions;