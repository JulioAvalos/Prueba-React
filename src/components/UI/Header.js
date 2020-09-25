import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSearch, faMobileAlt, faStar } from '@fortawesome/free-solid-svg-icons';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { ListItem } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    list: {
        width: 250,
    },
    toolbarMargin: {
        ...theme.mixins.toolbar
    },
}));

const Header = () => {
    const classes = useStyles();
    const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
    const [openDrawer, setOpenDrawer] = useState(false);

    return (
        <React.Fragment>
            <AppBar position="fixed" color="primary">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                        onClick={() => setOpenDrawer(!openDrawer)} 
                    >
                        <FontAwesomeIcon icon={faBars} />
                    </IconButton>
                    <Typography className={classes.title} variant="h6" noWrap>
                        Poke API - React
                    </Typography>
                    {/* <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <FontAwesomeIcon icon={faSearch} />
                        </div>
                        <InputBase
                            placeholder="Buscar pokemon..."
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div> */}
                </Toolbar>
            </AppBar>
            <div className={classes.toolbarMargin} />
            <SwipeableDrawer 
                anchor="left"
                disableBackdropTransition={!iOS} 
                disableDiscovery={iOS} 
                open={openDrawer} 
                onOpen={() => setOpenDrawer(true)}
                onClose={() => setOpenDrawer(false)}
            >
                <List className={classes.list}>
                    <ListItem 
                        button to="/" 
                        component={Link}
                        onClick={() => {
                            setOpenDrawer(false);
                        }} 
                    >
                        <ListItemIcon>
                            <FontAwesomeIcon icon={faMobileAlt} size="2x" style={{marginLeft: '0.3em'}}/>
                        </ListItemIcon>
                        <ListItemText>
                            Pokemon
                        </ListItemText>
                    </ListItem>

                    <ListItem 
                        button to="/favorites" 
                        component={Link}
                        onClick={() => {
                            setOpenDrawer(false);
                        }} 
                    >
                        <ListItemIcon>
                            <FontAwesomeIcon icon={faStar} size="2x"/>
                        </ListItemIcon>
                        <ListItemText>
                            Favoritos
                        </ListItemText>
                    </ListItem>
                </List>
            </SwipeableDrawer>
        </React.Fragment>
    );
}

export default Header;
