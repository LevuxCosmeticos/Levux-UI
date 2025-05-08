import styles from './Menu.module.css';
import { Box, Drawer } from '@mui/material';
import CustomerOption from './customer/CustomerOption';
import logo from '../../assets/images/logo.png';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { Pages, PagesEnum } from '../../enums/PagesEnum';

interface MenuProps {
    changePage: (page: PagesEnum) => void
}

const Menu: React.FC<MenuProps> = ({
    changePage
}) => {

    const [open, setOpen] = useState(true);

    const navigate = (newPage: PagesEnum) => {
        setOpen(false);
        changePage(newPage);
    }

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

    const ClosedOptions = (
        <Drawer
            open={!open}
            hideBackdrop
            slotProps={{
                paper: {
                    sx: {
                        boxShadow: 'none',
                    },
                },
            }}>
            <Box className={styles.box}>
                <MenuIcon className={styles.openIcon}
                    onClick={() => setOpen(true)}
                    sx={{ fontSize: 35, mx: 1 }}
                />
            </Box>
        </Drawer>

    )

    return (
        <div>
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
            {ClosedOptions}
        </div>
    )
}

export default Menu;