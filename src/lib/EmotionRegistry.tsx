// 'use client';

// import { CacheProvider } from '@emotion/react';
// import type { EmotionCache } from '@emotion/cache';
// import React from 'react';
// import createCache from '@emotion/cache';
// import { useServerInsertedHTML } from 'next/navigation';

// // Emotion 캐시 인스턴스 생성
// function createEmotionCache(): EmotionCache {
//   const cache = createCache({ key: 'css' });
//   cache.compat = true; // 서버 사이드 렌더링 호환성
//   return cache;
// }

// export function EmotionRegistry({ children }: { children: React.ReactNode }) {
//   const cache = React.useMemo(() => createEmotionCache(), []);
//   let is = true; // 캐시가 이미 초기화되었는지 추적

//   useServerInsertedHTML(() => {
//     if (!is) {
//       return null; // 첫 번째 렌더링이 아니면 아무것도 반환하지 않음
//     }
//     is = false;
//     // @ts-expect-error: firebase 타입 문제 임시 무시
//     const names = Array.from(cache.inserted).join(' '); // 삽입된 스타일 시트 이름 가져오기
//     // @ts-expect-error: firebase 타입 문제 임시 무시
//     return <style data-emotion={`${cache.key} ${names}`} dangerouslySetInnerHTML={{ __html: cache.css }} />;
//   });

//   return <CacheProvider value={cache}>{children}</CacheProvider>;
// }

'use client';

import { CacheProvider } from '@emotion/react';
import type { EmotionCache } from '@emotion/cache';
import createCache from '@emotion/cache';
import { useRef } from 'react';
import { useServerInsertedHTML } from 'next/navigation';

function createEmotionCache() {
  return createCache({ key: 'css', prepend: true });
}

export function EmotionRegistry({ children }: { children: React.ReactNode }) {
  const cacheRef = useRef<EmotionCache | null>(null);
  if (!cacheRef.current) {
    cacheRef.current = createEmotionCache();
  }

  useServerInsertedHTML(() => {
    if (cacheRef.current) {
      const { inserted, key, sheet } = cacheRef.current as any;
      let styles = '';

      for (const name in inserted) {
        if (inserted.hasOwnProperty(name)) {
          if (typeof inserted[name] === 'boolean') continue;
          styles += inserted[name];
        }
      }

      return <style data-emotion={`${key} ${Object.keys(inserted).join(' ')}`} dangerouslySetInnerHTML={{ __html: styles }} />;
    }
    return null;
  });

  return <CacheProvider value={cacheRef.current}>{children}</CacheProvider>;
}

// 'use client';

// import { CacheProvider } from '@emotion/react';
// import createCache from '@emotion/cache';
// import { useRef } from 'react';
// import { useServerInsertedHTML } from 'next/navigation';

// export function EmotionRegistry({ children }: { children: React.ReactNode }) {
//   const cache = useRef(
//     createCache({ key: 'emotion-css', prepend: true }) // key 변경!
//   );

//   useServerInsertedHTML(() => {
//     const { key, sheet } = cache.current;

//     return <style data-emotion={`${key} ${sheet?.ids.join(' ')}`} dangerouslySetInnerHTML={{ __html: sheet.tags.map((tag) => tag.textContent).join('') }} />;
//   });

//   return <CacheProvider value={cache.current}>{children}</CacheProvider>;
// }
