import styles from './Menu.module.css';
import { Box, Drawer } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

interface ClosedMenuProps {
    setOpen?: (open: boolean) => void
    open: boolean
}

const ClosedMenu: React.FC<ClosedMenuProps> = ({
    setOpen = () => { },
    open
}) => {
    return (
        <Drawer
            variant='persistent'
            open={!open}
            hideBackdrop
            slotProps={{
                paper: {
                    sx: {
                        boxShadow: 'none',
                        border: 'none'
                    },
                },
            }}>
            <Box className={styles.box}>
                <MenuIcon className={styles.openIcon}
                    onClick={() => { setOpen(true) }}
                    sx={{ fontSize: 35, mx: 1 }}
                />
            </Box>
        </Drawer>
    )
}

export default ClosedMenu;