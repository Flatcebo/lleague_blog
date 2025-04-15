"use client";

import BottomNavBar from "@/components/BottomNavBar";
import FloatingButton from "@/components/FloatingButton";
import Header from "@/components/Header";
import NoticeBar from "@/components/NoticeBar";
import useUserStore from "@/stores/useUserStore";
import {usePathname} from "next/navigation";
import {useEffect, useState} from "react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

interface BaseLayoutProps {
  children: React.ReactNode;
}

export default function BaseLayout({children}: BaseLayoutProps) {
  const pathname = usePathname();

  const {setUser} = useUserStore();

  useEffect(() => {
    const cookie = document.cookie;
    const match = cookie.match(/authToken=([^;]+)/);
    if (match) {
      const decoded = decodeURIComponent(match[1]);
      const parsed = JSON.parse(decoded);
      // console.log("Access:", parsed.access);
      // console.log("Refresh:", parsed.refresh);

      setUser({access: parsed.access, refresh: parsed.refresh});
    }
  }, []);

  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <QueryClientProvider client={queryClient}>
        {!pathname.includes("/post") && !pathname.includes("/write") && (
          <>
            <NoticeBar
              className="hidden lg:flex"
              type="공지"
              content="앱 출시 기념 각종 이벤트 진행 예정(공지사항 참고)"
            />
            <Header />
            <NoticeBar
              className="flex lg:hidden"
              type="공지"
              content="앱 출시 기념 각종 이벤트 진행 예정(공지사항 참고)"
            />
          </>
        )}

        {children}
        {!pathname.includes("/write") && <FloatingButton />}

        <BottomNavBar />
      </QueryClientProvider>
    </>
  );
}
