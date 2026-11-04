import React from 'react';
import { photo } from '@/data/mockData';

type ImgProps = Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> & {
  src: string;
  /** requested width in px (Unsplash resizes on the fly) */
  w?: number;
  h?: number;
  priority?: boolean;
};

/** Plain <img> wrapper: sized CDN URLs, lazy by default. */
export default function Img({ src, w = 900, h, priority, alt = '', ...rest }: ImgProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={photo(src, w, h)}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding="async"
      draggable={false}
      {...rest}
    />
  );
}
