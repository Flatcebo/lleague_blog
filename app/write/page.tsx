"use client";

import ContentHeader from "@/components/ContentHeader";
import CustomCheckbox from "@/components/CustomCheckbox";
import Img from "@/components/Img";
import FileSelector from "@/components/FileSelector";
import {useRouter, useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import NoticeBar from "@/components/NoticeBar";
import {FaAngleDown} from "react-icons/fa6";
import LabelInput from "@/components/LabelInput";
import useUserStore from "@/stores/useUserStore";
import {useImageUploadMutation} from "@/hooks/mutations/useImageUploadMutation";
import {useCreateMutation} from "@/hooks/mutations/useCreateMutation";
import {useMemoImg} from "@/hooks/useMemoImg";
import {AiOutlineLoading} from "react-icons/ai";
import Loading from "@/components/Loading";

export default function Page() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const isEditMode = !!id;

  const {user} = useUserStore();

  const imgMutation = useImageUploadMutation();
  const itemMutation = useCreateMutation();

  const router = useRouter();

  const [form, setForm] = useState<PostFormState>({
    category: 99,
    title: "",
    desc: "",
    agree: false,
  });
  const [files, setFiles] = useState<(File | null)[]>([null, null]);
  const [src, setSrc] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = async () => {
    const res = await fetch(`/api/post/${id}?access=${user?.access}`, {
      method: "GET",
    });

    const resData = await res.json();

    const {category, content, title, main_image, sub_image, created_at} =
      resData.data;

    setForm((prev) => ({
      ...prev,
      title,
      category: category.id,
      desc: content,
      agree: false,
    }));

    setSrc([main_image, sub_image]);
  };

  useEffect(() => {
    if (!isEditMode) return;

    if (user?.access) {
      fetchData();
    }
  }, [isEditMode, user?.access]);

  const handleChangeText = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    if (type === "agree") {
      const value = e.target.checked;

      setForm((prev) => ({...prev, agree: value}));
    } else {
      const value = e.target.value;

      setForm((prev) => ({...prev, [type]: value}));
    }
  };

  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    setForm((prev) => ({...prev, category: Number(value)}));
  };

  const handleChangeDesc = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;

    setForm((prev) => ({...prev, desc: value}));
  };

  const handleCreatePost = async (urls: string[]) => {
    if (!urls) return;

    if (isEditMode) {
      const mainImage = files[0] ? urls[0] : src[0];
      const subImage = files[1] ? urls[1] : src[1] || "";

      const res = await fetch(`/api/post/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          category: form.category,
          title: form.title,
          main_image: mainImage,
          sub_image: subImage,
          content: form.desc,
          id: id,
          access: user!.access,
        }),
      });

      const resData = await res.json();

      setIsLoading(false);

      alert(resData.message);

      router.replace(`/post/${id}`);
    } else {
      const res = await itemMutation.mutateAsync({
        category: "post",
        type: "c",
        body: JSON.stringify({
          category: form.category,
          title: form.title,
          main_image: urls[0],
          sub_image: urls[1] || "",
          content: form.desc,
          access: user!.access,
        }),
      });

      // if (!res.ok) {
      //   console.log("error");
      // }

      const {id} = res.data;

      // console.log(res.data.id);

      setIsLoading(false);

      alert(res.message);

      router.replace(`/post/${id}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (
      form.title !== "" &&
      (src[0] !== "" || files[0] !== null) &&
      form.category !== 99 &&
      form.desc.length >= 10 &&
      form.agree === true
    ) {
      imgMutation.mutate(
        {
          files: files as File[],
          access: user!.access,
        },
        {
          onSuccess: handleCreatePost,
          onError: (err) => {
            console.log(err);
          },
        }
      );
    } else {
      setIsLoading(false);
      return alert("필수 입력란을 확인해 주세요.");
    }
  };

  const handleChangeImage = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    const file = e.target.files?.[0] ?? null;
    if (!file) return;

    const newFiles = [...files];
    newFiles[idx] = file;
    setFiles(newFiles);

    setSrc((prev) => {
      const newSrc = [...prev];
      newSrc[idx] = "";
      return newSrc;
    });
  };

  return (
    <div className="w-full h-auto pb-[400px]">
      <ContentHeader title={isEditMode ? "글 수정" : "글 등록"} />

      <section className="w-full h-auto flex flex-col items-center">
        <NoticeBar
          className="bg-white"
          content="욕설 및 비방글 작성 시 계정삭제"
        />

        <form
          onSubmit={handleSubmit}
          className="h-auto flex flex-col pt-[20px]
                      md:w-[768px] w-[100%]
                      lg:px-[0px] px-[12px]
                      md:gap-[20px] gap-[8px]"
        >
          {/* TITLE */}
          <LabelInput
            title="타이틀(30자 이내)"
            require
            type="text"
            maxLength={30}
            value={form.title}
            onChange={(e) => handleChangeText(e, "title")}
            placeholder="타이틀을 입력해 주세요."
          />

          {/* IMG */}
          <div className="flex flex-col gap-[8px]">
            <label className="font-semibold">
              <span>사진</span>

              <span className="main-text">*</span>
            </label>

            <div className="flex justify-between">
              {[0, 1].map((i) => {
                const memoSrc = useMemoImg(src[i], files[i]);

                return (
                  <div
                    key={i}
                    className="w-[49%] flex flex-col gap-[8px] text-center"
                  >
                    <FileSelector
                      idx={i}
                      onChange={(e) => handleChangeImage(e, i)}
                    >
                      {memoSrc && (
                        <Img
                          src={memoSrc}
                          alt={memoSrc}
                          className="relative w-full h-full aspect-[1/1] object-cover rounded-[8px]"
                        />
                      )}
                    </FileSelector>

                    <div className="font-semibold ">
                      <span className="text-[#555]">
                        {i === 0 ? "대표사진" : "서브"}
                      </span>

                      {i === 0 && <span className="main-text">*</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CATEGORY */}
          <div className="flex flex-col gap-[8px]">
            <label className="font-semibold">
              <span>카테고리</span>

              <span className="main-text">*</span>
            </label>

            <div className="w-full h-[50px] flex items-center px-[12px] bg-[#eaeaea] rounded-[8px]">
              <select
                value={form.category}
                onChange={handleChangeSelect}
                className="w-full h-full appearance-none outline-none"
              >
                <option value={99}>카테고리 선택</option>
                <option value={1}>일상생활</option>
                <option value={2}>맛집소개</option>
                <option value={3}>제품후기</option>
                <option value={4}>IT정보</option>
                <option value={5}>기타</option>
              </select>

              <FaAngleDown />
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="flex flex-col gap-[8px]">
            <label className="font-semibold">
              <span>{`내용(10자이상)`}</span>

              <span className="main-text">*</span>
            </label>

            <textarea
              value={form.desc}
              onChange={handleChangeDesc}
              placeholder="블로그 글을 작성해 주세요."
              className="w-full aspect-[1/1] p-4 bg-[#eaeaea] rounded-[8px]"
            />
          </div>

          {/* AGREE */}
          <div className="flex flex-row items-center gap-[4px]">
            <CustomCheckbox
              title="Blog 이용 정책 위반 시 글 삭제에 동의합니다."
              checked={form.agree}
              onChange={(e) => handleChangeText(e, "agree")}
            >
              <span
                className="main-text ml-[4px]
                            md:text-[16px] text-[14px]"
              >{`(필수)`}</span>
            </CustomCheckbox>
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-[50px] flex justify-center items-center main-bg rounded-[12px] text-[#fff] font-bold hover:opacity-80 cursor-pointer"
          >
            {isLoading ? (
              <AiOutlineLoading size={20} className="animate-spin" />
            ) : (
              "제출하기"
            )}
          </button>
        </form>
      </section>
    </div>
  );
}
