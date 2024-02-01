import { FC, useEffect, useMemo, useState } from 'react';
import React from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Divider,
    ImageList,
    ImageListItem,
    Typography,
} from '@mui/material';

import { instance } from '../../../api/instance';
import { Paths } from '../../../router';
import { Album, AlbumFromServer } from '../../../types/Album';
import { Photo } from '../../../types/Photo';
import Loader from '../../loader/Loader';
import { TabPanel } from '../ContentBox';

export const Albums: FC<{ index: number }> = ({ index }) => {
    const [albums, setAlbums] = useState<Album[]>([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();

    const tabId = useMemo(() => {
        return Object.values(Paths).find((path) => path.name === location.pathname.slice(1))?.index || Paths.post.index;
    }, [location]);

    const currentUser = useMemo(() => {
        const searchParams = new URLSearchParams(location.search);

        return searchParams.get('userId');
    }, [location]);

    const currentAlbum = useMemo(() => {
        const searchParams = new URLSearchParams(location.search);

        return searchParams.get('albumId');
    }, [location]);

    const handlePanelChange = (panelId: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        if (isExpanded) {
            searchParams.set('albumId', panelId.toString());

            instance.get<Photo[]>(`/photos?albumId=${panelId}`).then((response) => {
                setAlbums((prevState) =>
                    prevState.map((album) => {
                        if (album.id === panelId) {
                            return {
                                ...album,
                                photos: response.data,
                            };
                        }

                        return album;
                    })
                );
            });
        } else {
            searchParams.delete('albumId');
        }

        setSearchParams(searchParams);
    };

    useEffect(() => {
        if (currentUser) {
            instance.get<AlbumFromServer[]>(`/users/${currentUser}/albums/`).then((response) => {
                setAlbums(response.data.map((album) => ({ ...album, photos: [] })));

                if (currentAlbum) {
                    instance.get<Photo[]>(`/photos?albumId=${currentAlbum}`).then((response) => {
                        setAlbums((prevState) =>
                            prevState.map((album) => {
                                if (album.id.toString() === currentAlbum) {
                                    return {
                                        ...album,
                                        photos: response.data,
                                    };
                                }

                                return album;
                            })
                        );
                    });
                }
            });
        }
    }, [currentUser, currentAlbum]);

    return (
        <TabPanel value={tabId} index={index}>
            {albums.length > 0 &&
                albums.map((album) => (
                    <Accordion
                        key={album.id}
                        expanded={searchParams.get('albumId') === album.id.toString()}
                        onChange={handlePanelChange(album.id)}
                        sx={{ width: '100%' }}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <Typography sx={{ width: '33%', flexShrink: 0 }}>{album.title}</Typography>
                        </AccordionSummary>
                        <Divider variant="middle" component="div" />
                        <AccordionDetails sx={{ display: 'flex', justifyContent: 'center' }}>
                            {album.photos.length > 0 && (
                                <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
                                    {album.photos.map((photo) => (
                                        <ImageListItem key={photo.id}>
                                            <img src={`${photo.url}`} alt={photo.title} />
                                        </ImageListItem>
                                    ))}
                                </ImageList>
                            )}
                            {album.photos.length === 0 && <Loader />}
                        </AccordionDetails>
                    </Accordion>
                ))}
        </TabPanel>
    );
};
