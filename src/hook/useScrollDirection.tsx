// import { useEffect, useState } from 'react';

// export const useScrollDirection = () => {
//   const [isScrolledDown, setIsScrolledDown] = useState(false);

//   useEffect(() => {
//     let lastScrollY = window.scrollY;

//     const handleScroll = () => {
//       const currentScrollY = window.scrollY;

//       if (currentScrollY > lastScrollY) {
//         setIsScrolledDown(true);
//       } else if (currentScrollY < lastScrollY) {
//         setIsScrolledDown(false);
//       }

//       lastScrollY = currentScrollY;
//     };

//     window.addEventListener('scroll', handleScroll);

//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   return isScrolledDown;
// };

'use client';

import { useEffect, useState } from 'react';

export const useScrollDirection = () => {
  const [isScrolledDown, setIsScrolledDown] = useState(false);

  useEffect(() => {
    let lastScrollY = window.pageYOffset as number;

    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;
      const direction = scrollY > lastScrollY;
      console.log('scrollY', scrollY);
      console.log('lastScrollY', lastScrollY);
      if (direction !== isScrolledDown && (scrollY - lastScrollY > 1 || scrollY - lastScrollY < -1)) {
        setIsScrolledDown(direction);
      }
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };

    window.addEventListener('scroll', updateScrollDirection);

    return () => window.removeEventListener('scroll', updateScrollDirection);
  }, [isScrolledDown]);

  return isScrolledDown;
};
