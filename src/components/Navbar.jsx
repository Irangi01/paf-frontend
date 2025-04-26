import { 
    AppBar, 
    Toolbar, 
    Typography, 
    Button, 
    Box,
    styled,
    useTheme,
    useMediaQuery
} from '@mui/material';
import { Link } from 'react-router-dom';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    padding: theme.spacing(0, 3),
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(0, 2)
    }
}));

const NavButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(0, 1),
    padding: theme.spacing(1, 2),
    borderRadius: '4px',
    transition: 'all 0.3s ease',
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
        transform: 'translateY(-2px)'
    }
}));

const Title = styled(Typography)(({ theme }) => ({
    fontWeight: 700,
    letterSpacing: '1px',
    color: theme.palette.common.white,
    textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
}));

export default function Navbar() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <AppBar 
            position="sticky"
            elevation={4}
            sx={{ 
                background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
                backdropFilter: 'blur(8px)',
                borderBottom: `1px solid ${theme.palette.divider}`
            }}
        >
            <StyledToolbar>
                <Title variant={isMobile ? 'h6' : 'h5'} component="div" sx={{ flexGrow: 1 }}>
                    Community Management
                </Title>
                <Box>
                    <NavButton 
                        color="inherit" 
                        component={Link} 
                        to="/"
                        sx={{ 
                            '&.active': {
                                backgroundColor: theme.palette.action.selected,
                                fontWeight: 'bold'
                            }
                        }}
                    >
                        Dashboard
                    </NavButton>
                    <NavButton 
                        color="inherit" 
                        component={Link} 
                        to="/create-community"
                        sx={{ 
                            '&.active': {
                                backgroundColor: theme.palette.action.selected,
                                fontWeight: 'bold'
                            }
                        }}
                    >
                        Create Community
                    </NavButton>
                </Box>
            </StyledToolbar>
        </AppBar>
    );
}