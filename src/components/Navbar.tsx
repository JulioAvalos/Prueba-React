import {Link} from "react-router-dom";
import {useState} from "react";
import {
    AppBar,
    Box,
    Button,
    Divider,
    Grid,
    IconButton,
    List, ListItem, ListItemIcon, ListItemText, MenuItem,
    SwipeableDrawer,
    Toolbar,
    Typography
} from "@mui/material";
import {FiMenu} from "react-icons/fi";
import {GrSchedules} from "react-icons/gr";
import {FaBook} from "react-icons/fa";
import {TbPokeball} from "react-icons/tb";

function Navbar() {

    const iOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent)

    const [open, setOpen] = useState<boolean>(false);

    return (
        <>
            <Box sx={{flexGrow: 1, mb: 2}}>
                <AppBar position="static" enableColorOnDark>
                    <Toolbar disableGutters>
                        <Link className="nav-link" to={"/"} style={{textDecoration: 'none'}}>
                            <Box
                                sx={{
                                    ml: 2,
                                    display: {xs: 'none', md: 'flex'}
                                }}
                            >
                                <TbPokeball size={30}/>
                            </Box>
                        </Link>
                        <Link className="nav-link" to={"/"} style={{textDecoration: 'none'}}>
                            <Typography
                                variant="h6"
                                noWrap
                                sx={{
                                    ml: 1,
                                    mr: 2,
                                    display: {xs: 'none', md: 'flex'},
                                    fontFamily: `"consolas", "Inconsolata", monospace`
                                }}
                            >
                                Poke API - React v{import.meta.env.VITE_VERSION}
                            </Typography>
                        </Link>

                        <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>

                            <>
                                <Link className="nav-link" to={"/favorites"}>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={() => setOpen(false)}
                                        sx={{color: '#000', ml: 2, mr: 2}}
                                    >
                                        <Typography variant="body2">
                                            Favoritos
                                        </Typography>
                                    </Button>
                                </Link>
                            </>

                        </Box>
                        <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={() => setOpen(true)}
                                color="inherit"
                            >
                                <FiMenu size={30}/>
                            </IconButton>
                            <SwipeableDrawer
                                disableBackdropTransition={!iOS}
                                disableDiscovery={iOS}
                                anchor={'left'}
                                open={open}
                                onOpen={() => setOpen(true)}
                                onClose={() => setOpen(false)}
                            >
                                <Grid sx={{mt: 2, mb: 2}} container justifyContent="center" alignItems="center">
                                    <Grid item xs={12} container justifyContent="center" alignItems="center">
                                        <TbPokeball size={30}/>
                                    </Grid>
                                    <Grid item xs={12} container justifyContent="center" alignItems="center">
                                        <Typography
                                            variant="h6"
                                            noWrap
                                            sx={{
                                                ml: 1,
                                                mr: 2,
                                                fontFamily: `"consolas", "Inconsolata", monospace`
                                            }}
                                        >
                                            Poke API - React
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} container justifyContent="center" alignItems="center">
                                        <Typography
                                            variant="body2"
                                            noWrap
                                            sx={{
                                                ml: 1,
                                                mr: 2,
                                                fontFamily: `"consolas", "Inconsolata", monospace`,
                                                color: '#707070'
                                            }}
                                        >
                                            v{import.meta.env.VITE_VERSION}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Divider/>
                                <List>
                                    <ListItem>
                                        <ListItemIcon>
                                            <GrSchedules size={25} color="#000"/>
                                        </ListItemIcon>
                                        <ListItemText>
                                            <Link to={"/"}>
                                                <MenuItem onClick={() => setOpen(false)}>
                                                    <Typography textAlign="center">Pokemon</Typography>
                                                </MenuItem>
                                            </Link>
                                        </ListItemText>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <FaBook size={25} color="#000"/>
                                        </ListItemIcon>
                                        <ListItemText>
                                            <Link to={"/favorites"}>
                                                <MenuItem onClick={() => setOpen(false)}>
                                                    <Typography textAlign="center">Favoritos</Typography>
                                                </MenuItem>
                                            </Link>
                                        </ListItemText>
                                    </ListItem>
                                </List>

                            </SwipeableDrawer>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    );
}

export default Navbar;
