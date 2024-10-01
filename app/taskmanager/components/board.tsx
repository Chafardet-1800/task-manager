"use client";
import { BoardModel, TaskModel } from "@/app/shared/models/types";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Column from "./column";
import axios from "axios";
import { SyncLoader } from "react-spinners";

const Board: React.FC<{ board: BoardModel | null }> = ({ board }) => {
  const [tasks, setTasks] = useState<TaskModel[] | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    if (board) {
      setTasks(board.tasks);
      setIsLoading(false);
    } else {
      router.push("/onboarding");
    }
  }, [board]);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      source.index === destination.index
    )
      return;

    const draggedTask = tasks!.find((task) => task.id === draggableId);

    let updateStatus: string;

    switch (destination.droppableId) {
      case "todo":
        updateStatus = "TODO";
        break;
      case "inProgress":
        updateStatus = "IN_PROGRESS";
        break;
      case "done":
        updateStatus = "DONE";
        break;
      default:
        updateStatus = draggedTask!.status;
        break;
    }

    try {
      axios.post("/api/updateTasksStatus", {
        taskId: draggableId,
        newStatus: updateStatus,
      });
    } catch (error) {
      console.log(error);
    }

    const updateTask = tasks!.map((task) => {
      if (task.id === draggableId) {
        return { ...task, status: updateStatus };
      }
      return task;
    });

    setTasks(updateTask);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen w-full ">
        <SyncLoader color="white" />
      </div>
    );
  }

  return (
    <div className="h-screen py-10 relative">
      <h3 className="text-3xl text-center font-bold mb-10">{board?.name}</h3>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid gap-10 max-md:text-center md:grid-cols-3 md:gap-5 w-[90%] max-w-[15000px] mx-auto">
          <Column
            title="Pendientes"
            tasks={tasks?.filter((task) => task.status === "TODO")}
            droppableId="todo"
          />
          <Column
            title="En Progreso"
            tasks={tasks?.filter((task) => task.status === "IN_PROGRESS")}
            droppableId="inProgress"
          />
          <Column
            title="Completadas"
            tasks={tasks?.filter((task) => task.status === "DONE")}
            droppableId="done"
          />
        </div>
      </DragDropContext>
    </div>
  );
};

export default Board;
