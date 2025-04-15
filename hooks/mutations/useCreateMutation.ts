import {createdItems, CreatedItemsProps} from "@/libs/createdItems";
import {useMutation} from "@tanstack/react-query";

export function useCreateMutation() {
  return useMutation({
    mutationFn: (data: CreatedItemsProps) => createdItems(data),
    onSuccess: (data) => {
      // console.log("게시글 등록이 성공했어요.", data);
    },
    onError: (err) => {
      alert("게시글 등록에 실패했어요.");
      // console.error(err);
    },
  });
}
