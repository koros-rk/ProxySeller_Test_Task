import React, {FC, useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';

import { Backdrop, Box, CircularProgress, Grid } from '@mui/material';

import { instance } from './api/instance';
import { ContentBox } from './components/ContentBox/ContentBox';
import { BoardList } from './components/UserBoard/BoardList';
import { User } from './types/User';

export const App: FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setIsLoading(true);

        instance
            .get<User[]>('users')
            .then((response) => {
                setUsers(response.data);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    return (
        <Box sx={{ padding: '20px' }}>
            <Grid container spacing={2}>
                <Grid item xs={4} sx={{ position: 'relative' }}>
                    <BoardList users={users} />
                </Grid>
                {location.pathname.slice(1) && (
                    <Grid item xs={7}>
                        <ContentBox />
                    </Grid>
                )}
            </Grid>
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </Box>
    );
}
