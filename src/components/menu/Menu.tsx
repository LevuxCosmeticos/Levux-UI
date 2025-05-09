import { useState } from 'react';
import { PagesEnum } from '../../enums/PagesEnum';
import ClosedMenu from './ClosedMenu';
import OpenMenu from './OpenMenu';

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

    return (
        <div>
            <OpenMenu setOpen={setOpen} open={open} navigate={navigate} />
            <ClosedMenu setOpen={setOpen} open={open} />
        </div>
    )
}

export default Menu;