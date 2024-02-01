import * as React from 'react';
import { createHashRouter } from 'react-router-dom';

import { App } from './App';
import { Albums } from './components/ContentBox/Albums/Albums';
import { PostList } from './components/ContentBox/Posts/PostList';

export const Paths = {
    post: {
        name: 'posts',
        index: 0,
    },
    album: {
        name: 'albums',
        index: 1,
    },
};

export const router = createHashRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: Paths.post.name,
                element: <PostList index={Paths.post.index} />,
            },
            {
                path: Paths.album.name,
                element: <Albums index={Paths.album.index} />,
            },
        ],
    },
]);
