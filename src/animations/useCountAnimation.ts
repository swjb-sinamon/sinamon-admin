import { RefObject, useEffect } from 'react';
import { animate } from 'framer-motion';

const useCountAnimation = (nodeRef: RefObject<HTMLParagraphElement>, to: number, from: number) => {
  useEffect(() => {
    const node = nodeRef.current;

    const controls = animate(to, from, {
      duration: 0.5,
      ease: ['easeIn'],
      onUpdate(value) {
        if (node) node.textContent = value.toFixed(0);
      }
    });

    return () => controls.stop();
  }, [from, nodeRef, to]);
};

export default useCountAnimation;
