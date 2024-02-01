import { Photo } from './Photo';

export type AlbumFromServer = {
    id: number;
    userId: number;
    title: string;
};

export type Album = {
    id: number;
    userId: number;
    title: string;
    photos: Photo[];
};
