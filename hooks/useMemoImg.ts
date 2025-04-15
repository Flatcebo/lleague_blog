import {useMemo} from "react";

export function useMemoImg(src: string, file: File | null) {
  return useMemo(() => {
    if (src) return src;
    if (file) return URL.createObjectURL(file);
    return "";
  }, [src, file]);
}
