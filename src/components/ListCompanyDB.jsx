import React, { useState, useEffect } from "react";
import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Button,
    Avatar,
} from "@mui/material";
import axios from 'axios';
import { BASE_URL } from '../constants';

const ListCompanyDB = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [companies, setCompanies] = useState([]);
    const [activeCompanies, setActiveCompanies] = useState([])

    useEffect(() => {
        axios.get(`${BASE_URL}/api/Company/pending-company`)
            .then(response => {
                setCompanies(response.data);
            })
            .catch(error => {
                console.error('Error fetching pending companies:', error);
            });

            axios.get(`${BASE_URL}/api/Company/accepted-company`)
            .then(response => {
                setActiveCompanies(response.data);
            })
            .catch(error => {
                console.error('Error fetching accepted companies:', error);
            });
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const handleAcceptCompany = (companyId) => {
        axios.put(`${BASE_URL}/api/Company/allow-company/${companyId}`)
            .then(response => {
                setCompanies(companies.filter(company => company.companyId !== companyId));
                console.log('Company accepted:', response.data);
            })
            .catch(error => {
                console.error('Error accepting company:', error);
            });
    };
    const handleRejectCompany = (companyId) => {
        axios.delete(`${BASE_URL}/api/Company/reject-company/${companyId}`)
            .then(response => {
                setCompanies(companies.filter(company => company.companyId !== companyId));
                console.log('Company rejected:', response.data);
            })
            .catch(error => {
                console.error('Error rejecting company:', error);
            });
    };

    return (
        <>
        <h1 style={{textAlign: "center"}}>Pending Company</h1>
        <Paper sx={{ width: "100%", mb: 2, p: 2 }}>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>CompanyId</TableCell>
                            <TableCell></TableCell>
                            <TableCell>Company Name</TableCell>
                            <TableCell>Email Owner</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {companies.length > 0 ? companies.map(company => (
                            <TableRow key={company.companyId}>
                                <TableCell>{company.companyId}</TableCell>
                                <TableCell><Avatar src={company.logo} /></TableCell>
                                <TableCell>{company.companyName}</TableCell>
                                <TableCell>{company.emailOwner}</TableCell>
                                <TableCell style={{ display: 'flex', gap: '10px' }}>
                                    <Button
                                        variant="contained"
                                        size="small"
                                        color="error"
                                        onClick={() => handleRejectCompany(company.companyId)}
                                    >
                                        Reject
                                    </Button>
                                    <Button
                                        variant="contained"
                                        size="small"
                                        onClick={() => handleAcceptCompany(company.companyId)}
                                    >
                                        Accept
                                    </Button>
                                </TableCell>
                            </TableRow>
                        )) : "No pending companies found"}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={companies.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
        </Paper>
        <h1 style={{textAlign: "center"}}>Active Company</h1>
        <Paper sx={{ width: "100%", mb: 2, p: 2 }}>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>CompanyId</TableCell>
                            <TableCell></TableCell>
                            <TableCell>Company Name</TableCell>
                            <TableCell>Email Owner</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {activeCompanies.length > 0 ? activeCompanies.map(company => (
                            <TableRow key={company.companyId}>
                                <TableCell>{company.companyId}</TableCell>
                                <TableCell><Avatar src={company.logo} /></TableCell>
                                <TableCell>{company.companyName}</TableCell>
                                <TableCell>{company.emailOwner}</TableCell>
                                <TableCell style={{ display: 'flex', gap: '10px' }}>
                                    <Button
                                        variant="contained"
                                        size="small"
                                        color="error"
                                        onClick={() => handleRejectCompany(company.companyId)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        )) : "No pending activeCompanies found"}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={activeCompanies.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
        </Paper>
        </>
    );
};

export default ListCompanyDB;
