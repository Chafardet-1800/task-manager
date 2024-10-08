"use client";

import { UserButton } from "@clerk/nextjs";
import { PiKanban } from "react-icons/pi";
import { useSession } from "@clerk/nextjs";
import Link from "next/link";
import useRouteCheck from "./hooks/useRouteCheck";
import ThemeSwitcher from "./themeSwicher";

const Navbar = () => {
  const { isSignedIn } = useSession();
  const onboardingRoute = useRouteCheck(["onboarding"]);
  const signInPages = useRouteCheck(["sign-in", "sign-up"]);
  const kanbanRoute = useRouteCheck(["taskmanager"]);
  return (
    <div
      className={`py-5 bg-transparent fixed top-0 z-10 w-full
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
            <Link
              href={"/taskmanager"}
              className="tracking-tight hover:underline"
            >
              Go to my board &#8594;
            </Link>
          )}

          {kanbanRoute || signInPages ? <ThemeSwitcher /> : null}
        </div>
        {!isSignedIn && !signInPages && (
          <Link href={"/sign-in"} className="tracking-tight hover:underline">
            Already a member? Sign In &#8594;
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
