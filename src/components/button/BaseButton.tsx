import { ButtonProps, Button } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material/SvgIcon/SvgIcon";
import CircularProgress from "@mui/material/CircularProgress";
import Box from '@mui/material/Box';

interface BaseButtonProps {
    text: string;
    variant?: ButtonProps['variant'];
    icon?: OverridableComponent<SvgIconTypeMap>
    backGroundColor?: string;
    loading?: boolean;
    color?: string;
    className?: string;
    fontSize?: string;
    fontWeight?: string;
    spinnerSize?: number;
    onClick?: () => void;
    border?: string;
    borderRadius?: string;
    type?: 'button' | 'submit' | 'reset';
}

const BaseButton: React.FC<BaseButtonProps> = ({
    text, variant = 'contained', icon: Icon,
    backGroundColor, loading, color = 'white',
    className, fontSize, fontWeight, spinnerSize,
    onClick, border, borderRadius, type
}) => {
    return (
        <div className={className}
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
            }}
        >
            <Button
                variant={variant}
                startIcon={Icon && !loading ? <Icon /> : null}
                onClick={onClick}
                type={type}
                sx={{
                    fontSize: fontSize,
                    fontWeight: fontWeight,
                    backgroundColor: backGroundColor,
                    borderColor: color,
                    maxWidth: '100%',
                    height: '100%',
                    border: border,
                    borderRadius: borderRadius
                }}
            >
                {
                    loading ?
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                width: '100%',
                            }}
                        >
                            <CircularProgress
                                size={spinnerSize}
                                sx={{
                                    color: color
                                }} />
                        </Box>
                        :
                        text
                }
            </Button>
            {loading && (
                <div
                    style={{
                        backgroundColor: 'rgba(255, 255, 255, 0)',
                        cursor: 'wait',
                        zIndex: 2,
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                    }}
                />
            )}
        </div>
    )
}

export default BaseButton;