import styles from './App.module.css';
import Menu from './components/menu/Menu';
import { useState } from 'react';
import { PagesEnum, Pages } from './enums/PagesEnum';
import Customer from './pages/customer/Customer';
import MenuIcon from '@mui/icons-material/Menu';
import ToasterProvider from './components/toaster/ToasterProvider';

function App() {

  const [page, setPage] = useState<PagesEnum>(Pages.CYCLES);

  const MenuSpace = (
    <div className={styles.menuSpace}>
      <MenuIcon className={styles.openIcon}
        sx={{ fontSize: 35, mx: 1 }}
      />
    </div>
  );

  return (
    <ToasterProvider>
      <div>
        <Menu changePage={setPage} />
        <div className={styles.page}>
          {MenuSpace}
          {
            page === Pages.CUSTOMER &&
            <Customer />
          }
        </div>
      </div>
    </ToasterProvider>
  )
}

export default App
