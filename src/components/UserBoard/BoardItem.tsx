import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { Avatar, Button, ButtonGroup, ListItem, ListItemAvatar, ListItemText } from '@mui/material';

import { Paths } from '../../router';
import { User } from '../../types/User';
import { stringAvatar } from './utils';

interface Props {
    user: User;
}

export const BoardItem: FC<Props> = ({ user }) => {
    const navigate = useNavigate();

    const navigateToPosts = () => {
        navigate(`/${Paths.post.name}?userId=${user.id}`);
    };

    const navigateToAlbums = () => {
        navigate(`/${Paths.album.name}?userId=${user.id}`);
    };

    return (
        <ListItem
            secondaryAction={
                <ButtonGroup variant="text" aria-label="outlined primary button group">
                    <Button onClick={navigateToPosts}>Posts</Button>
                    <Button onClick={navigateToAlbums}>Albums</Button>
                </ButtonGroup>
            }
        >
            <ListItemAvatar>
                <Avatar {...stringAvatar(user.name)} />
            </ListItemAvatar>
            <ListItemText primary={user.name} />
        </ListItem>
    );
};
