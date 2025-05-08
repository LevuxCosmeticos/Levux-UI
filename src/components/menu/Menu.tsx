import styles from './Menu.module.css';
import { Box, Drawer } from '@mui/material';
import CustomerOptions from './CustomerOptions';
import logo from '../../assets/images/logo.png';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';

const Menu: React.FC = () => {

    const [open, setOpen] = useState(true);

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
            <CustomerOptions />
        </Box>
    );

    const ClosedOptions = (
        <Box className={styles.box}>
            <MenuIcon className={styles.openIcon}
                onClick={() => setOpen(true)}
                sx={{ fontSize: 35, mx: 1 }}
            />
        </Box>
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
            <Drawer
                open={!open}
                hideBackdrop
                slotProps={{
                    paper: {
                        sx: {
                            boxShadow: 'none',
                        },
                    },
                }}
            >
                {ClosedOptions}
            </Drawer>
        </div>
    )
}

export default Menu;