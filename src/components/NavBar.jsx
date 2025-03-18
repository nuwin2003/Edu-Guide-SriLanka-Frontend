import React, {useState} from 'react';
import {
    AppBar,
    Toolbar,
    Button,
    Box,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Typography,
} from '@mui/material';
import MenuIcon from "@mui/icons-material/Menu";
import {Link, useLocation, useNavigate} from "react-router-dom";
import Logo from '../assets/Logo.png';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ProfileIcon from '../assets/ProfileIcon.png';
import Logout from '../assets/Logout.png';

const Navbar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const toggleDrawer = (open) => (event) => {
        if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
            return;
        }
        setDrawerOpen(open);
    };

    const userName = localStorage.getItem("userName");

    const menuItems = [
        {label: "HOME", to: "/home"},
        {label: "A/L STREAM", to: "/home/stream"},
        {label: "UNIVERSITIES", to: "/home/universities"},
        {label: "TESTIMONIALS", to: "/home/testimonials"},
        {label: "CONTACT US", to: "/home/contact-us"},
    ];

    const drawerList = () => (
        <Box
            sx={{width: 250, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}
            role="presentation"
        >
            <List>
                {menuItems.map((item, index) => (
                    <React.Fragment key={index}>
                        <ListItem
                            button
                            onClick={() => {
                                navigate(item.to);
                                setDrawerOpen(false);
                            }}
                        >
                            <ListItemText
                                primary={item.label}
                                sx={{
                                    color: "black",
                                    '& .MuiTypography-root': {
                                        position: 'relative',
                                        '&::after': {
                                            content: '""',
                                            position: 'absolute',
                                            bottom: -2,
                                            left: 0,
                                            width: '100%',
                                            height: '2px',
                                            backgroundColor: 'black',
                                            transform: location.pathname === item.to ? 'scaleX(1)' : 'scaleX(0)',
                                            transition: 'transform 0.3s ease-in-out'
                                        }
                                    }
                                }}
                            />
                            <ArrowRightIcon/>
                        </ListItem>
                    </React.Fragment>
                ))}
            </List>
        </Box>
    );

    return (
        <AppBar elevation={0} sx={{zIndex: 2, backgroundColor: '#FFFFFF'}}>
            <Toolbar sx={{justifyContent: "space-between"}}>
                <Box component="img" src={Logo} alt="Logo" sx={{width: 72, height: 66, marginLeft: {sm: 10}}}/>
                <Box
                    sx={{
                        display: {xs: "none", md: "flex"},
                        justifyContent: "right",
                        flexGrow: 1,
                        gap: {lg: 5, sm: 2, xs: 1},
                        mr: 15
                    }}
                >
                    {menuItems.map((item, index) => (
                        <React.Fragment key={index}>
                            <Button
                                color="inherit"
                                onClick={() => navigate(item.to)}
                                component={Link}
                                to={item.to}
                                sx={{
                                    color: "black",
                                    position: 'relative',
                                    '&::after': {
                                        content: '""',
                                        position: 'absolute',
                                        bottom: 0,
                                        width: '40%',
                                        height: '4px',
                                        borderRadius: 5,
                                        backgroundColor: '#7095DE',
                                        transform: location.pathname === item.to ? 'scaleX(1)' : 'scaleX(0)',
                                        transition: 'transform 0.3s ease-in-out'
                                    },
                                    '&:focus': {
                                        outline: 'none',
                                    },
                                    '&:hover': {
                                        backgroundColor: 'transparent',
                                    },
                                }}
                            >
                                <Typography sx={{fontWeight: 600, fontSize: 16, fontFamily: 'Poppins, sans-serif',}}>
                                    {item.label}
                                </Typography>
                            </Button>
                        </React.Fragment>
                    ))}
                </Box>
                <Box sx={{
                    display: {md: 'flex', xs: 'none'},
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 1,
                    mr: 5
                }}>
                    <Box component='img' src={ProfileIcon} width={40} height={40} sx={{cursor: 'pointer'}}
                         onClick={() => {
                             navigate("profile");
                         }}/>
                    <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        <Typography sx={{color: 'black', fontWeight: 600, fontSize: 16}}>
                            {userName}
                        </Typography>
                        <Typography sx={{color: '#757575', fontWeight: 600, fontSize: 12}}>
                            WELCOME
                        </Typography>
                    </Box>
                </Box>
                <Box component='img' src={Logout} width={20} height={20} sx={{cursor: 'pointer'}} onClick={() => {
                    navigate("/login")
                }}/>
                <IconButton
                    color="black"
                    aria-label="open drawer"
                    edge="end"
                    sx={{display: {xs: "flex", md: "none"}}}
                    onClick={toggleDrawer(true)}
                >
                    <MenuIcon/>
                </IconButton>
            </Toolbar>
            <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
                {drawerList()}
            </Drawer>
        </AppBar>
    );
};

export default Navbar;