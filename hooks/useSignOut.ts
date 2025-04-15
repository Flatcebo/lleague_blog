import {useState} from "react";

interface LogoutResult {
  success: boolean;
  message: string;
}

export const useSignOut = () => {
  const [isLoading, setIsLoading] = useState(false);

  const logout = async (): Promise<LogoutResult> => {
    setIsLoading(true);

    try {
      const cookie = document.cookie;
      const match = cookie.match(/authToken=([^;]+)/);

      let token = "";

      if (match) {
        const decoded = decodeURIComponent(match[1]);
        const parsed = JSON.parse(decoded);
        token = parsed.refresh;
      } else {
        setIsLoading(false);

        return {
          success: false,
          message: "로그인 정보가 없습니다.",
        };
      }

      const res = await fetch(`/api/user/signOut?refresh=${token}`, {
        method: "GET",
      });

      const resData = await res.json();

      setIsLoading(false);

      if (res.ok) {
        return {
          success: true,
          message: resData.message,
        };
      } else {
        return {
          success: false,
          message: resData.error,
        };
      }
    } catch (error) {
      setIsLoading(false);
      return {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "로그아웃 중 오류가 발생했습니다.",
      };
    }
  };

  return {logout, isLoading};
};
