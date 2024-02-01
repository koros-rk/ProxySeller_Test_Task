import React, { ChangeEvent, FC, useMemo, useState } from 'react';

import DehazeIcon from '@mui/icons-material/Dehaze';
import SortIcon from '@mui/icons-material/Sort';
import { Box, Button, List, ListSubheader, TextField } from '@mui/material';

import { User } from '../../types/User';
import { BoardItem } from './BoardItem';

interface Props {
    users: User[];
}

enum SortType {
    ASC,
    DESC,
    NONE,
}

export const BoardList: FC<Props> = ({ users }) => {
    const [query, setQuery] = useState('');
    const [sortType, setSortType] = useState(SortType.NONE);
    const preparedUsers = useMemo(() => {
        return users
            .filter((user) => user.name.toLowerCase().includes(query.toLowerCase().trim()))
            .sort((a, b) => {
                switch (sortType) {
                    case SortType.ASC:
                        return a.name.localeCompare(b.name);
                    case SortType.DESC:
                        return b.name.localeCompare(a.name);
                    case SortType.NONE:
                        return 0;
                    default:
                        return 0;
                }
            });
    }, [users, query, sortType]);

    const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    const handleSortTypeChange = () => {
        setSortType((prevState) => {
            switch (prevState) {
                case SortType.ASC:
                    return SortType.DESC;
                case SortType.DESC:
                    return SortType.NONE;
                case SortType.NONE:
                    return SortType.ASC;
                default:
                    return SortType.NONE;
            }
        });
    };

    return (
        <Box sx={{ position: 'fixed', width: '30%' }}>
            <List
                subheader={
                    <ListSubheader
                        sx={{ backgroundColor: 'transparent', display: 'flex', justifyContent: 'center' }}
                        component="div"
                        id="nested-list-subheader"
                    >
                        <TextField label="Search for user" variant="standard" onChange={handleQueryChange} />
                        <Button variant="text" onClick={handleSortTypeChange}>
                            {sortType === SortType.NONE ? (
                                <DehazeIcon />
                            ) : (
                                <SortIcon sx={sortType === SortType.DESC ? { transform: 'scaleY(-1)' } : {}} />
                            )}
                        </Button>
                    </ListSubheader>
                }
            >
                {users.length > 0 && preparedUsers.map((user) => <BoardItem user={user} key={user.id} />)}
            </List>
        </Box>
    );
};
