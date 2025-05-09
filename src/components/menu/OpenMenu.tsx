import styles from './Menu.module.css';
import { Box, Drawer } from '@mui/material';
import CustomerOption from './customer/CustomerOption';
import logo from '../../assets/images/logo.png';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { Pages, PagesEnum } from '../../enums/PagesEnum';

interface OpenMenuProps {
    setOpen: (open: boolean) => void
    open: boolean
    navigate: (newPage: PagesEnum) => void
}

const OpenMenu: React.FC<OpenMenuProps> = ({
    setOpen,
    open,
    navigate
}) => {

    const DrawerOptions = (
        <Box className={styles.box}>
            <div className={styles.logoContainer}>
                <img src={logo} alt="Logo" className={styles.logo} />
                <ArrowLeftIcon
                    className={styles.closeIcon}
                    sx={{ fontSize: 35 }}
                    onClick={() => setOpen(false)}
                />
            </div>
            <CustomerOption onClick={() => navigate(Pages.CUSTOMER)} />
        </Box>
    );

    return (
        <Drawer
            open={open}
            hideBackdrop
            slotProps={{
                paper: {
                    sx: {
                        boxShadow: 'none',
                    },
                },
            }}
        >
            {DrawerOptions}
        </Drawer>
    )
}

export default OpenMenu