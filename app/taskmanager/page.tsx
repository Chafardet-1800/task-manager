import { prisma } from "@/lib/prisma";
import Board from "./components/board";
import { auth } from "@clerk/nextjs/server";

const TaskManager = async () => {
  const {
    userId,
  }: {
    userId: string | null | undefined;
  } = auth();

  const board = await prisma.kanbanBoard.findFirst({
    where: {
      userId: userId!,
    },
    include: {
      tasks: true,
    },
  });

  return <Board board={board} />;
};

export default TaskManager;
