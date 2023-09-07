import React from 'react';
import { ImageProps } from 'react-native';
export interface CroppedData {
    croppedUri: string;
    originalUri: string;
    croppedArea: {
        width: number;
        height: number;
        x: number;
        y: number;
    };
}
export type PhotoCropperProps = ImageProps & {
    image: {
        uri: string;
        width: number;
        height: number;
    };
    width?: number;
    height?: number;
    grid?: boolean;
    gridVerticalNum?: number;
    gridHorizontalNum?: number;
    gridColor?: string;
    onCropped?: (data: CroppedData) => void;
    maxScale?: number;
};
declare const PhotoCropper: React.FC<PhotoCropperProps>;
export default PhotoCropper;
