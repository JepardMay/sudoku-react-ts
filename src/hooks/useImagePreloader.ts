import { useEffect, useState } from 'react';

const useImagePreloader = (images: string[], onLoadComplete: () => void) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let loadedImages = 0;
    const handleImageLoad = () => {
      loadedImages += 1;
      if (loadedImages === images.length) {
        setLoaded(true);
        onLoadComplete();
      }
    };

    images.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = handleImageLoad;
    });
  }, [images, onLoadComplete]);

  return loaded;
};

export default useImagePreloader;
