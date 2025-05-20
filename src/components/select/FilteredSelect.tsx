import React, { useRef, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

interface FilteredSelectionProps<T> {
    options: T[];
    getOptionLabel: (option: T) => string;
    color?: string;
    noOptionsText: string;
    textChange?: (value: string) => void;
    selectChange?: (value: T) => void;
    loading?: boolean;
    fontSize?: string;
    className?: string;
    getOptionSubLabel?: (option: T) => string;
    label: string;
    value?: T | null;
}

const FilteredSelect = <T extends Record<string, any>>({
    options,
    getOptionLabel,
    color = 'white',
    noOptionsText,
    textChange,
    selectChange,
    loading = false,
    fontSize,
    className,
    getOptionSubLabel,
    label,
    value
}: FilteredSelectionProps<T>) => {

    const debounceTimeout = useRef<number | null>(null);

    const handleTextChange = (event: React.SyntheticEvent, value: string, reason: string) => {
        if (reason === 'input') {
            if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

            debounceTimeout.current = window.setTimeout(() => {
                textChange?.(value);
            }, 500);
        }
    };

    useEffect(() => {
        return () => {
            if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
        };
    }, []);

    const filterOptions = createFilterOptions({
        stringify: (option: any) =>
            `${getOptionLabel(option)} ${getOptionSubLabel ? getOptionSubLabel(option) : ''}`,
    });

    return (
        <Autocomplete
            className={className}
            disablePortal
            loading={loading}
            options={options}
            getOptionLabel={(option) => (option ? getOptionLabel(option) : '')}
            noOptionsText={noOptionsText}
            onInputChange={handleTextChange}
            filterOptions={filterOptions}
            onChange={(_, value) => {
                selectChange?.(value);
            }}
            value={value}
            renderOption={(props, option) => {
                const { key, ...rest } = props;
                return (
                    <li key={key} {...rest}>
                        <div>
                            <div>{getOptionLabel(option)}</div>
                            {getOptionSubLabel && (
                                <div style={{ fontSize: '0.8em', opacity: 0.7 }}>
                                    {getOptionSubLabel(option)}
                                </div>
                            )}
                        </div>
                    </li>
                );
            }}
            renderInput={(params) =>
                <TextField
                    {...params}
                    label={label}
                    sx={{
                        input: {
                            color: color,
                            fontSize: fontSize,
                            '&:-webkit-autofill': {
                                WebkitTextFillColor: color,
                                boxShadow: '0 0 0 1000px transparent inset',
                                transition: 'background-color 9999s ease-in-out 0s',
                            },
                        },
                        label: { color: color },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': { borderColor: color },
                            '&:hover fieldset': { borderColor: color },
                            '&.Mui-focused fieldset': { borderColor: color }
                        },
                        '& .MuiSvgIcon-root': {
                            color: color
                        },
                    }}
                    slotProps={{
                        inputLabel: {
                            sx: {
                                color: color,
                                '&.Mui-focused': {
                                    color: color,
                                },
                            },
                        },
                    }}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <>
                                {loading ? <CircularProgress sx={{ color: color }} size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </>
                        ),
                    }}
                />
            }
        />
    );
}

export default FilteredSelect;