import styles from './Menu.module.css';
import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { ArrowDropDown, Store, ArrowDropUp, AddBusiness } from '@mui/icons-material';
import { useState } from 'react';

const CustomerOptions: React.FC = () => {

    const [open, setOpen] = useState(false);

    return (
        <List>
            <Divider className={styles.divider} />
            <ListItemButton onClick={() => setOpen(!open)}>
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
                        {open ?
                            <ArrowDropDown className={styles.icon} /> :
                            <ArrowDropUp className={styles.icon} />
                        }
                    </ListItemIcon>
                </ListItem>
            </ListItemButton>
            {open ?
                <ListItemButton>
                    <ListItem className={styles.centeredItem}>
                        <ListItemIcon className={styles.listIcon}>
                            <AddBusiness className={styles.icon} fontSize='medium' />
                            <ListItemText primary="Adicionar"
                                className={styles.item}
                                slotProps={{
                                    primary: {
                                        style: { fontSize: '55%' }
                                    }
                                }} />
                        </ListItemIcon>
                    </ListItem>
                </ListItemButton>
                : null
            }
            <Divider className={styles.divider}/>
        </List>
    )
}

export default CustomerOptions;