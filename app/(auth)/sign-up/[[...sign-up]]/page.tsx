import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="dark:bg-slate-900 flex h-screen w-screen items-center justify-center">
      <SignUp />
    </div>
  );
}
