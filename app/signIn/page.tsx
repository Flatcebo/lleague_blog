"use client";

import LabelInput from "@/components/LabelInput";
import useUserStore from "@/stores/useUserStore";
import {useState} from "react";
import {AiOutlineLoading} from "react-icons/ai";

export default function Page() {
  const [email, setEmail] = useState<string>("user8524@l-league.co.kr");
  const [password, setPassword] = useState<string>("a12345678");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    const res = await fetch("/api/user/signIn", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const resData = await res.json();

    if (res.ok) {
      setIsLoading(false);
      alert(resData.message);
      location.href = `/`;
    } else {
      setIsLoading(false);
      alert(resData.message);
      location.reload();
    }

    // console.log(userData);
  };

  const handleChangeText = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    const value = e.target.value;

    switch (type) {
      case "email":
        setEmail(value);
        break;

      case "password":
        setPassword(value);
        break;

      default:
        break;
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center pb-[200px]">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-[12px] 
                        sm:w-[480px] w-[100%]
                        sm:px-[40px] px-[12px]"
      >
        {/* LOGO */}
        <div className="text-center">
          <span className="text-[40px] text-[#fa7407] font-bold">BLOG</span>
        </div>

        <LabelInput
          title="아이디"
          type="email"
          placeholder="실명을 입력해 주세요."
          value={email}
          onChange={(e) => handleChangeText(e, "email")}
        />

        <LabelInput
          title="비밀번호"
          type="password"
          placeholder="-제외"
          value={password}
          onChange={(e) => handleChangeText(e, "password")}
        />

        <button
          type="submit"
          className="w-full h-[45px] flex justify-center items-center mt-[20px] main-bg hover:opacity-80 text-[#fff] font-bold rounded-[8px] cursor-pointer"
        >
          {isLoading ? (
            <AiOutlineLoading size={20} className="animate-spin" />
          ) : (
            "로그인"
          )}
        </button>
      </form>
    </div>
  );
}
