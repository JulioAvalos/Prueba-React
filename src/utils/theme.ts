import {createTheme, Theme, ThemeOptions} from '@mui/material'

export const themeOptions: ThemeOptions = {
    palette: {
        mode: 'light',
        primary: {
            main: '#fff',
        },
        secondary: {
            main: '#0dcaf0',
        },
    },
    typography: {
        overline: {
            fontFamily: '',
        },
        fontFamily: `'Inter', sans-serif`,
        fontSize: 14,
        button: {
            fontWeight: 500,
            textTransform: 'none',
        },
    },
};

const theme: Theme = createTheme({
    ...themeOptions,
    components: {
        MuiButton: {
            styleOverrides: {
                textPrimary: {
                    color: 'black',
                    '&:hover': {
                        backgroundColor: '#efefef',
                    },
                },
                outlinedPrimary: {
                    color: 'black',
                    borderColor: '#e0e0e0',
                    '&:hover': {
                        backgroundColor: '#efefef',
                        borderColor: '#e0e0e0',
                    },
                },
            }
        },
        MuiCircularProgress: {
            styleOverrides: {
                colorPrimary: {
                    color: 'black',
                },
            }
        },
        MuiLinearProgress: {
            styleOverrides: {
                colorPrimary: {
                    backgroundColor: 'black',
                },
                barColorPrimary: {
                    backgroundColor: 'gray'
                }
            }
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    transition: 'all 0.2s ease 0s',
                    '&:hover': {
                        backgroundColor: '#fbfbfb',
                        transform: 'translateY(-2px)',
                    }
                }
            }
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& label.Mui-focused': {
                        color: 'black',
                    },
                    '& .MuiInput-underline:after': {
                        borderBottomColor: 'black',
                    },
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: 'black',
                        },
                        '&:hover fieldset': {
                            borderColor: 'black',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: 'black',
                        },
                    },
                }
            }
        },
    },
});

export default theme;
