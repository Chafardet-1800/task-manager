import { currentUser } from "@clerk/nextjs/server";
import OnboardingForm from "./components/onboardingForm";
import { getBoardId } from "@/app/actions/getBoardId";

const Onboarding = async () => {
  const user = await currentUser();
  const board = await getBoardId();

  return (
    <div className="bg-[url('/images/bg.jpeg')] bg-cover h-[100vh] w-full pt-3 overflow-hidden">
      <OnboardingForm user={user?.firstName} boardId={board} />
    </div>
  );
};

export default Onboarding;
