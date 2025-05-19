import styles from '../Menu.module.css';
import { Divider, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import AutorenewIcon from '@mui/icons-material/Autorenew';

interface CycleOptionProps {
    onClick: () => void
}

const CycleOption: React.FC<CycleOptionProps> = ({
    onClick
}) => {

    return (
        <List disablePadding>
            <Divider className={styles.divider} />
            <ListItemButton onClick={onClick}>
                <ListItemIcon className={styles.listIcon}>
                    <AutorenewIcon className={styles.icon} fontSize='large' />
                    <ListItemText primary="Ciclos"
                        className={styles.itemHeader}
                        slotProps={{
                            primary: {
                                style: { fontSize: '55%' }
                            }
                        }} />
                </ListItemIcon>
            </ListItemButton>
        </List>
    )
}

export default CycleOption;