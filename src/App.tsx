import './App.css';
import Menu from './components/menu/Menu';
import { useState } from 'react';
import { PagesEnum, Pages } from './enums/PagesEnum';

function App() {

  const [page, setPage] = useState<PagesEnum>(Pages.CYCLES);

  return (
    <div>
      <Menu changePage={setPage} />
      {page === Pages.CUSTOMER &&
          <h1>Customer</h1>
      }
    </div>
  )
}

export default App
