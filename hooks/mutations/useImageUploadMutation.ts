import {uploadImages} from "@/libs/uploadImages";
import {useMutation} from "@tanstack/react-query";

export function useImageUploadMutation() {
  return useMutation({
    mutationFn: ({files, access}: UploadFileProps) =>
      uploadImages(files, access),

    onSuccess: (uploadedUrls) => {
      // console.log(uploadedUrls);
    },

    onError: () => {
      alert("업로드 실패하였습니다.");
    },
  });
}
