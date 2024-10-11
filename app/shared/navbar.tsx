"use client";

import { UserButton } from "@clerk/nextjs";
import { PiKanban } from "react-icons/pi";
import { useSession } from "@clerk/nextjs";
import Link from "next/link";
import useRouteCheck from "./hooks/useRouteCheck";
import ThemeSwitcher from "./themeSwicher";
import { GoTasklist } from "react-icons/go";
import { FaUserLarge } from "react-icons/fa6";
import { Tooltip } from "@nextui-org/tooltip";

const Navbar = () => {
  const { isSignedIn } = useSession();
  const onboardingRoute = useRouteCheck(["onboarding"]);
  const signInPages = useRouteCheck(["sign-in", "sign-up"]);
  const kanbanRoute = useRouteCheck(["taskmanager"]);
  return (
    <div
      className={`py-5 max-md:bg-[rgb(13,3,40)] bg-transparent fixed top-0 z-10 w-full
    ${!kanbanRoute || onboardingRoute ? "text-white" : null}
    ${signInPages && "text-gray-800 dark:text-white"}
    `}
    >
      <div className="flex justify-between w-[90%] max-w-[1450px] mx-auto">
        <Link
          href={"/"}
          className="flex gap-1 items-center text-2xl font-bold uppercase"
        >
          <h1>TaskManager</h1>
          <PiKanban />
        </Link>

        <div className="flex items-center gap-5">
          <UserButton />
          {!kanbanRoute && isSignedIn && !onboardingRoute && (
            <Tooltip
              key="gotaskboard"
              placement={"bottom"}
              content="Ir a mi proyecto"
              className="capitalize"
            >
              <Link
                href={"/taskmanager"}
                className="tracking-tight hover:underline"
              >
                <GoTasklist size={35} />
              </Link>
            </Tooltip>
          )}

          {kanbanRoute || signInPages ? <ThemeSwitcher /> : null}
        </div>
        {!isSignedIn && !signInPages && (
          <Tooltip
            key="gotaskboard"
            placement={"bottom"}
            content="Ir a mi proyecto"
            className="capitalize"
          >
            <Link href={"/sign-in"} className="tracking-tight hover:underline">
              <p className="bg-purple-900 py-2 px-3 rounded-xl">
                Iniciar Session
              </p>
            </Link>
          </Tooltip>
        )}
      </div>
    </div>
  );
};

export default Navbar;
