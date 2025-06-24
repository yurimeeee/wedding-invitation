// 'use client';

// import { AnimatePresence, motion } from 'framer-motion';
// import { useEffect, useState } from 'react';

// import { FiChevronLeft } from 'react-icons/fi';
// import { FiChevronRight } from 'react-icons/fi';
// import Image from 'next/image';
// import { IoClose } from 'react-icons/io5';
// import styled from '@emotion/styled';

// const GalleryImage = styled(Image)`
//   width: 100%;
//   height: 220px;
//   object-fit: cover;
//   cursor: pointer;
// `;
// const Thumbnail = styled(Image)`
//   width: 100px;
//   height: 100px;
//   object-fit: cover;
//   cursor: pointer;
// `;

// const sampleImages = [
//   '/assets/img/gallery/gallery_sample_1.png',
//   '/assets/img/gallery/gallery_sample_2.png',
//   '/assets/img/gallery/gallery_sample_3.png',
//   '/assets/img/gallery/gallery_sample_4.png',
// ];

// const Gallery = ({ gallery }: { gallery?: string[] }) => {
//   const [images, setImages] = useState<any>(null);
//   const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
//   useEffect(() => {
//     if (gallery && gallery.length > 0) {
//       setImages(gallery);
//     } else {
//       setImages(sampleImages);
//     }
//   }, [gallery]);
//   const closeModal = () => setSelectedIndex(null);
//   const showPrev = () => setSelectedIndex((prev) => (prev !== null ? (prev - 1 + images.length) % images.length : null));
//   const showNext = () => setSelectedIndex((prev) => (prev !== null ? (prev + 1) % images.length : null));
//   return (
//     <div className="p-4 space-y-6">
//       <Image src={'/assets/img/gallery/moment_of_love.svg'} alt="moment_of_love" width={126} height={20} className="mx-auto" />

//       <div className="grid grid-cols-2 gap-1">
//         {images?.map((src: string, idx: number) => (
//           <GalleryImage key={src} src={src} alt={`gallery_img_${idx}`} width={0} height={220} sizes="100%" onClick={() => setSelectedIndex(idx)} />
//         ))}
//       </div>

//       <AnimatePresence>
//         {selectedIndex !== null && (
//           <motion.div
//             className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={closeModal}
//           >
//             <motion.div className="relative max-w-3xl w-full p-4" onClick={(e) => e.stopPropagation()} initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}>
//               <Image src={images[selectedIndex]} alt="expanded" width={1000} height={600} className="w-full h-auto object-contain max-h-[90vh]" />
//               {/* <div className="flex flex-wrap justify-center gap-2 mt-2 w-full">
//                 {images.map((src: string, idx: number) => (
//                   <Thumbnail
//                     key={src}
//                     src={src}
//                     alt={`gallery_img_${idx}`}
//                     width={80}
//                     height={80}
//                     onClick={() => setSelectedIndex(idx)}
//                     style={{ opacity: selectedIndex === idx ? 1 : 0.7 }}
//                   />
//                 ))}
//               </div> */}
//               {/* 닫기 */}
//               <button onClick={closeModal} className="absolute top-4 right-4 text-white">
//                 <IoClose size={28} />
//               </button>

//               {/* 이전 */}
//               <button onClick={showPrev} className="absolute top-1/2 left-4 -translate-y-1/2 text-white">
//                 <FiChevronLeft size={36} />
//               </button>

//               {/* 다음 */}
//               <button onClick={showNext} className="absolute top-1/2 right-4 -translate-y-1/2 text-white">
//                 <FiChevronRight size={36} />
//               </button>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default Gallery;

'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useEffect, useState } from 'react';

import Image from 'next/image';
import { IoClose } from 'react-icons/io5';
import styled from '@emotion/styled';

const GalleryImage = styled(Image)`
  width: 100%;
  height: 220px;
  object-fit: cover;
  cursor: pointer;
`;

const Thumbnail = styled(Image)`
  width: 100px;
  height: 100px;
  object-fit: cover;
  cursor: pointer;
`;

const sampleImages = [
  '/assets/img/gallery/gallery_sample_1.png',
  '/assets/img/gallery/gallery_sample_2.png',
  '/assets/img/gallery/gallery_sample_3.png',
  '/assets/img/gallery/gallery_sample_4.png',
];

const SWIPE_CONFIDENCE_THRESHOLD = 100; // 스와이프 거리 기준

const Gallery = ({ gallery }: { gallery?: string[] }) => {
  const [images, setImages] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (gallery && gallery.length > 0) {
      setImages(gallery);
    } else {
      setImages(sampleImages);
    }
  }, [gallery]);

  const closeModal = () => setSelectedIndex(null);
  const showPrev = () => setSelectedIndex((prev) => (prev !== null ? (prev - 1 + images.length) % images.length : null));
  const showNext = () => setSelectedIndex((prev) => (prev !== null ? (prev + 1) % images.length : null));

  const handleDragEnd = (_: any, info: any) => {
    const offsetX = info.offset.x;
    if (offsetX > SWIPE_CONFIDENCE_THRESHOLD) {
      showPrev();
    } else if (offsetX < -SWIPE_CONFIDENCE_THRESHOLD) {
      showNext();
    }
  };

  return (
    <div className="p-4 space-y-6">
      <Image src={'/assets/img/gallery/moment_of_love.svg'} alt="moment_of_love" width={126} height={20} className="mx-auto" />
      <div className="grid grid-cols-2 gap-1">
        {images
          ?.filter((src) => typeof src === 'string' && src.trim() !== '')
          ?.slice(0, 4)
          ?.map((src: string, idx: number) => (
            <GalleryImage key={src} src={src} alt={`gallery_img_${idx}`} width={0} height={220} sizes="100%" onClick={() => setSelectedIndex(idx)} />
          ))}
      </div>

      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            onClick={closeModal}
          >
            {/* 닫기 */}
            <button onClick={closeModal} className="absolute top-4 right-4 text-white z-[60]">
              <IoClose size={28} />
            </button>
            <p className="font-chosun text-base text-white absolute bottom-10 -translate-x-1/2 z-[60]">
              {selectedIndex}/{images?.length}
            </p>

            <motion.div
              className="relative max-w-3xl w-full p-4"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleDragEnd}
            >
              <Image src={images[selectedIndex]} alt="expanded" width={1000} height={600} className="w-full h-auto object-contain max-h-[90vh]" />

              {/* 이전 */}
              <button onClick={showPrev} onPointerDown={(e) => e.stopPropagation()} className="absolute top-1/2 left-4 -translate-y-1/2 text-white">
                <FiChevronLeft size={36} />
              </button>
              {/* 다음 */}
              <button onClick={showNext} onPointerDown={(e) => e.stopPropagation()} className="absolute top-1/2 right-4 -translate-y-1/2 text-white">
                <FiChevronRight size={36} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
