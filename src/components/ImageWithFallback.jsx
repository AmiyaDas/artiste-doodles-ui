import { useState } from 'react';
import img1 from '../assets/img.jpg';

const ImageWithFallback = ({ src, alt, className, fallbackSrc = img1 }) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const onError = () => {
    if (!hasError) {
      setImgSrc(fallbackSrc);
      setHasError(true);
    }
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={onError}
    />
  );
};

export default ImageWithFallback;
