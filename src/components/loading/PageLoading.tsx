import { Backdrop, CircularProgress } from '@mui/material';

interface PageLoadingProps {
    loading: boolean;
}

const PageLoading: React.FC<PageLoadingProps> = ({
    loading
}) => {
    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}

export default PageLoading;