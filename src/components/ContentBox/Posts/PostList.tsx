import { FC, useEffect, useMemo, useState } from 'react';
import React from 'react';
import { useLocation } from 'react-router-dom';

import { Divider, List, ListItem, ListItemText } from '@mui/material';

import { instance } from '../../../api/instance';
import { Paths } from '../../../router';
import { Post } from '../../../types/Post';
import Loader from '../../loader/Loader';
import { TabPanel } from '../ContentBox';

export const PostList: FC<{ index: number }> = ({ index }) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation();

    const value = useMemo(() => {
        return Object.values(Paths).find((path) => path.name === location.pathname.slice(1))?.index || Paths.post.index;
    }, [location]);

    useEffect(() => {
        setIsLoading(true);
        setPosts([]);

        instance
            .get<Post[]>(`posts${location.search}`)
            .then((response) => {
                setPosts(response.data);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [location]);

    return (
        <TabPanel value={value} index={index}>
            {posts.length > 0 && (
                <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    {posts.map((post, index) => {
                        return (
                            <React.Fragment key={index}>
                                {index !== 0 && <Divider variant="fullWidth" component="li" />}
                                <ListItem alignItems="flex-start" key={post.id}>
                                    <ListItemText
                                        primary={post.title}
                                        secondary={
                                            <React.Fragment>
                                                {' — '}
                                                {post.body}
                                            </React.Fragment>
                                        }
                                    />
                                </ListItem>
                            </React.Fragment>
                        );
                    })}
                </List>
            )}
            {isLoading && posts.length === 0 && <Loader />}
        </TabPanel>
    );
};
