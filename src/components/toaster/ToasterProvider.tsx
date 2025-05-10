import { createContext, useContext, useState, useCallback, ReactNode, useMemo } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import type { SlideProps } from '@mui/material/Slide';

export type Severity = 'success' | 'error' | 'warning' | 'info';
export type Variant = 'standard' | 'filled' | 'outlined';

interface ToastState {
    open: boolean;
    message: string;
    autoHideDuration: number;
    severity: Severity;
    variant: Variant;
}

interface ToasterContextType {
    handleToaster: (message: string, autoHideDuration?: number, severity?: Severity, variant?: Variant) => void;
}

const ToasterContext = createContext<ToasterContextType | undefined>(undefined);

function SlideTransition(props: Readonly<SlideProps>) {
    return <Slide {...props} direction="up" />;
}

const ToasterProvider = ({ children }: { children: ReactNode }) => {
    const [toast, setToast] = useState<ToastState>({
        open: false,
        message: '',
        autoHideDuration: 5000,
        severity: 'info',
        variant: 'filled'
    });

    const handleToaster = useCallback((
        message: string,
        autoHideDuration: number = 5000,
        severity: Severity = 'info',
        variant: Variant = 'filled'
    ) => {
        setToast({
            open: true,
            message,
            autoHideDuration,
            severity,
            variant
        });
    }, []);

    const handleClose = () => {
        setToast(prev => ({ ...prev, open: false }));
    };

    const contextValue = useMemo(() => ({ handleToaster }), [handleToaster]);

    return (
        <ToasterContext.Provider value={contextValue}>
            {children}
            <Snackbar
                open={toast.open}
                autoHideDuration={toast.autoHideDuration}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                slots={{ transition: SlideTransition }}
            >
                <Alert
                    onClose={handleClose}
                    severity={toast.severity}
                    variant={toast.variant}
                    sx={{ width: '100%' }}
                >
                    {toast.message}
                </Alert>
            </Snackbar>
        </ToasterContext.Provider>
    );
};

export default ToasterProvider;

export const useToaster = (): ToasterContextType['handleToaster'] => {
    const context = useContext(ToasterContext);
    if (!context) {
        throw new Error('UseToaster must be used within a ToasterProvider');
    }
    return context.handleToaster;
};