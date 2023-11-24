import React from 'react';
export interface CroppedData {
    croppedUri: string;
    originalUri: string;
    croppedArea: {
        width: number;
        height: number;
        x: number;
        y: number;
        scale: number;
    };
}
export interface PhotoCropperProps {
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
    initialX?: number;
    initialY?: number;
    initialScale?: number;
    initialOpacity?: number;
}
declare const PhotoCropper: React.FC<PhotoCropperProps>;
export default PhotoCropper;
