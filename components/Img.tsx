"use client";

import {imgLoader} from "@/utils/imgLoader";
import Image, {ImageLoaderProps, ImageProps} from "next/image";

export default function Img(props: ImageProps) {
  const imgLoad = ({src, width, quality}: ImageLoaderProps) =>
    imgLoader({src, width, quality});
  return (
    <Image
      width={1000}
      height={1000}
      loader={imgLoad}
      // loading={"lazy"}
      quality={10}
      placeholder="blur"
      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFdwI2QHfNQgAAAABJRU5ErkJggg=="
      {...props}
    />
  );
}
