import Image from 'next/image';
import { useState } from 'react';

interface CustomImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  placeholderSrc: string; // Ruta del thumbnail
  className?: string;
}

const CustomImage: React.FC<CustomImageProps> = ({ src, alt, width, height, placeholderSrc, className }) => {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={() => setImgSrc(placeholderSrc)} // Cambia a la imagen de reserva si hay un error
    />
  );
};

export default CustomImage;
