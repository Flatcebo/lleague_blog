import Img from "@/components/Img";
import {useSignOut} from "@/hooks";
import useUserStore from "@/stores/useUserStore";
import Link from "next/link";
import {PiUser} from "react-icons/pi";

export default function BottomNavBar() {
  const navData = [
    {
      href: `/`,
      iconSrc: `/icons/page_home.svg`,
    },
    {
      href: `/`,
      iconSrc: `/icons/page_chat.svg`,
    },
    {
      href: `/`,
      iconSrc: `/icons/page_rank.svg`,
    },
  ];

  const {user} = useUserStore();

  const {logout, isLoading} = useSignOut();

  const handleClickSignOut = async () => {
    const result = await logout();

    if (result.success) {
      alert(result.message);
      location.reload();
    }

    if (result.message === "로그인 정보가 없습니다.") {
      location.href = `/my`;
    }
  };
  return (
    <div
      className="fixed bottom-0 left-0 w-full h-[50px] bg-[white] z-[999] pb-safe
                    sm:hidden block"
    >
      <nav className="w-full h-full">
        <ul className="w-full h-full flex flex-row justify-evenly items-center">
          {navData.map((i, idx) => {
            return (
              <li key={idx}>
                <Link href={i.href}>
                  <Img
                    src={i.iconSrc}
                    alt={i.iconSrc}
                    draggable={false}
                    className={`h-auto ${
                      i.href === "/user" ? "w-[20px]" : "w-[24px]"
                    }`}
                  />
                </Link>
              </li>
            );
          })}

          <button
            onClick={handleClickSignOut}
            disabled={isLoading}
            className="cursor-pointer w-auto h-[26px]"
          >
            {user?.access ? (
              <div className="w-[26px] h-full bg-[#555] hover:opacity-80 rounded-full" />
            ) : (
              <PiUser className="w-full h-full hover:text-[#9a9a9a]" />
            )}
          </button>
        </ul>
      </nav>
    </div>
  );
}
