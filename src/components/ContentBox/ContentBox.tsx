import React, { FC, useMemo } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { Box, Tab, Tabs } from '@mui/material';

import { Paths } from '../../router';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

export const TabPanel: FC<TabPanelProps> = ({ index, value, children, ...other }) => {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>{children}</Box>
            )}
        </div>
    );
};

export const ContentBox: FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const value = useMemo(() => {
        return Object.values(Paths).find((path) => path.name === location.pathname.slice(1))?.index || Paths.post.index;
    }, [location]);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        const nextUrl = Object.values(Paths).find((path) => path.index === newValue)?.name || Paths.post.name;
        navigate(`/${nextUrl}${location.search}`);
    };

    return (
        <Box>
            <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <Tabs value={value} onChange={handleChange} centered>
                    <Tab label="Posts" />
                    <Tab label="Albums" />
                </Tabs>
            </Box>
            <Outlet />
        </Box>
    );
};
