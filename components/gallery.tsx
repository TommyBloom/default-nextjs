import React, { Ref } from "react";
import "photoswipe/dist/photoswipe.css";
import Image from "next/image";

import { Gallery, Item } from "react-photoswipe-gallery";

export default function PhotoSwipeGallery(data) {
  return (
    <>
      <div>Project Gallery</div>
      <div className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
        <Gallery>
          {data.data.map((image) => (
            <Item
              key={image.id}
              original={image.field_media_image.image_style_uri.webp}
              thumbnail={image.field_media_image.image_style_uri.webp_384x384}
              width="1024"
              height="768"
            >
              {({ ref, open }) => (
                <Image
                  ref={ref as Ref<HTMLImageElement>}
                  onClick={open}
                  src={image.field_media_image.image_style_uri.webp_384x384}
                  alt="gallery image"
                  width={384}
                  height={384}
                />
              )}
            </Item>
          ))}
        </Gallery>
      </div>
    </>
  );
}
