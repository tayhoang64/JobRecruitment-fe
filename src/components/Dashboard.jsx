import React, { useState, useEffect, useRef } from "react";
import {
    Box,
    CssBaseline,
    Drawer,
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Card,
    CardContent,
    Switch,
    Modal,
    TextField,
    Button,
    Alert,
    Snackbar,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    TablePagination,
    useTheme,
    ThemeProvider,
    createTheme,
} from "@mui/material";
import { styled } from "@mui/system";
import { BASE_URL } from '../constants';
import axios from 'axios';
import {
    FiMenu,
    FiUsers,
    FiSettings,
    FiPieChart,
    FiDollarSign,
    FiUserPlus,
    FiSearch,
    FiBell,
} from "react-icons/fi";
import ListCompanyDB from "./ListCompanyDB";

const drawerWidth = 240;

const Main = styled("main")(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
}));

const Dashboard = () => {
    const [open, setOpen] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [notification, setNotification] = useState({ open: false, message: "", severity: "info" });
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState("");
    const [roleFilter, setRoleFilter] = useState("All");
    const [mockUsers, setMockUsers] = useState([]);
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [roles, setRoles] = useState([]);
    const [currentRole, setCurrentRole] = useState("");
    const [targetUserId, setTargetUserId] = useState(0);
    const [targetRoleName, setTargetRoleName] = useState("");
    const [currentView, setCurrentView] = useState("Users");

    useEffect(() => {
        axios.get(`${BASE_URL}/api/User`)
            .then(response => {
                let data = Array.from(response.data.$values).map(value => {
                    return {
                        id: value.id, name: value.fullName, email: value.emailAddress, role: value.roles.$values[0]
                    }
                })
                setMockUsers(data)
            })
            .catch(error => {
                console.error('Error fetching user profile:', error);
            });

        axios.get(`${BASE_URL}/api/Role`)
            .then(response => {
                setRoles(Array.from(response.data.$values))
            })
            .catch(error => {
                console.error('Error fetching user profile:', error);
            });
    }, []);

    const theme = createTheme({
        palette: {
            mode: darkMode ? "dark" : "light",
        },
    });

    const handleDrawerToggle = () => {
        setOpen(!open);
    };

    const handleModalOpen = (userName, email, role, id) => {
        setTargetUserId(id)
        setUserName(userName);
        setEmail(email);
        setCurrentRole(role);
        setModalOpen(true);
    }
    const handleModalClose = () => {
        setModalOpen(false);
        setTargetUserId(0);
        setUserName("");
        setEmail("");
        setCurrentRole("");
        setTargetRoleName("");
    }

    const handleNotification = (message, severity) => {
        setNotification({ open: true, message, severity });
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeRole = (e) => {
        setTargetRoleName(e.target.value);
    }

    const filteredUsers = mockUsers.filter((user) => {
        const matchesSearch = user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRole = roleFilter === "All" || user.role === roleFilter;
        return matchesSearch && matchesRole;
    });

    const handleSaveButton = () => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            axios.put(`${BASE_URL}/api/Role`, { userId: targetUserId, roleName: targetRoleName })
                .then(response => {
                    window.location.reload();
                })
                .catch(error => {
                    console.error('Error fetching user profile:', error);
                });
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: "flex" }}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    sx={{
                        width: `calc(100% - ${open ? drawerWidth : 0}px)`,
                        ml: `${open ? drawerWidth : 0}px`,
                        transition: "width 0.2s, margin 0.2s",
                    }}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            onClick={handleDrawerToggle}
                            edge="start"
                            sx={{ mr: 2 }}
                        >
                            <FiMenu />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                            Admin Dashboard
                        </Typography>
                        <Switch
                            checked={darkMode}
                            onChange={() => setDarkMode(!darkMode)}
                            color="default"
                        />
                        <IconButton color="inherit" onClick={() => handleNotification("New notification!", "info")}>
                            <FiBell />
                        </IconButton>
                    </Toolbar>
                </AppBar>

                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        "& .MuiDrawer-paper": {
                            width: drawerWidth,
                            boxSizing: "border-box",
                        },
                    }}
                    variant="persistent"
                    anchor="left"
                    open={open}
                >
                    <List>
                        <ListItem button onClick={() => setCurrentView("Users")}>
                            <ListItemIcon>
                                <FiUsers />
                            </ListItemIcon>
                            <ListItemText primary="Users" />
                        </ListItem>
                        <ListItem button onClick={() => setCurrentView("Companies")}>
                            <ListItemIcon>
                                <FiSettings />
                            </ListItemIcon>
                            <ListItemText primary="Companies" />
                        </ListItem>
                        <ListItem button onClick={() => setCurrentView("Analytics")}>
                            <ListItemIcon>
                                <FiPieChart />
                            </ListItemIcon>
                            <ListItemText primary="Analytics" />
                        </ListItem>
                    </List>

                </Drawer>

                <Main open={open}>
                    <Toolbar />

                    <Box sx={{ mt: 4 }}>
                        {currentView === "Users" && (
                            <Paper sx={{ width: "100%", mb: 2, p: 2 }}>
                                <Box sx={{ mb: 2, display: "flex", gap: 2, alignItems: "center" }}>
                                    <TextField
                                        label="Search users"
                                        variant="outlined"
                                        size="small"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        sx={{ minWidth: 200 }}
                                    />
                                    <FormControl size="small" sx={{ minWidth: 120 }}>
                                        <InputLabel>Role</InputLabel>
                                        <Select
                                            value={roleFilter}
                                            label="Role"
                                            onChange={(e) => setRoleFilter(e.target.value)}
                                        >
                                            <MenuItem value="All">All</MenuItem>
                                            {roles.map(role => (
                                                <MenuItem id={role.roleId} value={role.roleName}>{role.roleName}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Box>
                                <TableContainer>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>UserId</TableCell>
                                                <TableCell>UserName</TableCell>
                                                <TableCell>Email</TableCell>
                                                <TableCell>Role</TableCell>
                                                <TableCell>Actions</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {filteredUsers
                                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                .map((user) => (
                                                    <TableRow key={user.id}>
                                                        <TableCell>{user.id}</TableCell>
                                                        <TableCell>{user.name}</TableCell>
                                                        <TableCell>{user.email}</TableCell>
                                                        <TableCell>{user.role}</TableCell>
                                                        <TableCell>
                                                            <Button
                                                                variant="contained"
                                                                size="small"
                                                                onClick={() => handleModalOpen(user.name, user.email, user.role, user.id)}>
                                                                Edit
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                        </TableBody>
                                    </Table>
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 25]}
                                        component="div"
                                        count={filteredUsers.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                    />
                                </TableContainer>
                            </Paper>
                        )}

                        {currentView === "Companies" && (
                            <ListCompanyDB />
                        )}

                        {currentView === "Analytics" && (
                            <Paper sx={{ width: "100%", mb: 2, p: 2 }}>
                                {/* Nội dung Analytics */}
                                <Typography variant="h6">Analytics</Typography>
                                {/* Add your Analytics content here */}
                            </Paper>
                        )}
                    </Box>

                    <Modal
                        open={modalOpen}
                        onClose={handleModalClose}
                        aria-labelledby="edit-user-modal"
                    >
                        <Box
                            sx={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                width: 400,
                                bgcolor: "background.paper",
                                boxShadow: 24,
                                p: 4,
                                borderRadius: 1,
                            }}
                        >
                            <Typography variant="h6" component="h2" gutterBottom>
                                Edit User
                            </Typography>
                            <TextField
                                fullWidth
                                label="Name"
                                margin="normal"
                                value={userName}
                                disabled={true}
                            />
                            <TextField
                                fullWidth
                                label="Email"
                                margin="normal"
                                value={email}
                                disabled={true}
                            />
                            <FormControl fullWidth margin="normal">
                                <InputLabel>Role</InputLabel>
                                <Select defaultValue={currentRole} label="Role" onChange={(e) => handleChangeRole(e)}>
                                    {roles.map(role => (
                                        <MenuItem id={role.roleId} value={role.roleName}>{role.roleName}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end", gap: 1 }}>
                                <Button onClick={handleModalClose}>Cancel</Button>
                                <Button
                                    variant="contained"
                                    onClick={() => {
                                        handleSaveButton()
                                        handleNotification("User updated successfully!", "success");
                                    }}
                                >
                                    Save
                                </Button>
                            </Box>
                        </Box>
                    </Modal>

                    <Snackbar
                        open={notification.open}
                        autoHideDuration={6000}
                        onClose={() => setNotification({ ...notification, open: false })}
                    >
                        <Alert
                            onClose={() => setNotification({ ...notification, open: false })}
                            severity={notification.severity}
                            sx={{ width: "100%" }}
                        >
                            {notification.message}
                        </Alert>
                    </Snackbar>
                </Main>
            </Box>
        </ThemeProvider>
    );
};

export default Dashboard;