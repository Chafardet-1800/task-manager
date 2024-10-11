"use client";
import {
  BoardModel,
  FormInputConfigModel,
  TaskModel,
} from "@/app/shared/models/types";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Column from "./column";
import axios from "axios";
import { SyncLoader } from "react-spinners";
import CustomButton from "@/app/shared/ui/customButton";
import Dialog from "@/app/shared/ui/dialog";
import { createTask } from "@/app/shared/actions/boardActions";
import toast from "react-hot-toast";

const Board: React.FC<{ board: BoardModel | null }> = ({ board }) => {
  const [tasks, setTasks] = useState<TaskModel[] | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  const [showDialog, setShowDialog] = useState(false);

  const router = useRouter();

  // Funcion para abrir el dialogo
  const openDialog = () => {
    setShowDialog(true);
  };

  // Funcion para cerrar el dialogo
  const closeDialog = () => {
    setShowDialog(false);
  };

  // Funcion para finalizar el proceso del dialogo de crear una nueva tarea
  const submitDialog = (text: string) => {
    toast.success(`Tarea ${text} con exito`);
    setShowDialog(false);
  };

  // UseEffect para cargar la informacion de la tabla
  useEffect(() => {
    if (board) {
      setTasks(board.tasks);
      setIsLoading(false);
    } else {
      router.push("/onboarding");
    }
  }, [board]);

  // Configuracion del formulario para crear una nueva tarea
  const createTaskForm: FormInputConfigModel[] = [
    {
      name: "task",
      type: "text",
      value: "",
      placeholder: "Nueva tarea",
      required: true,
      fullWidth: true,
      style: "",
    },
    {
      name: "boardId",
      type: "hidden",
      value: board!.id,
      placeholder: "Nueva tarea",
      required: true,
      fullWidth: true,
      style: "",
    },
  ];

  // Funcion para actualizar el estado de las tareas al soltarla en una nueva columna
  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      source.index === destination.index
    )
      return;

    if (
      destination.droppableId === source.droppableId &&
      source.index !== destination.index
    ) {
      const task = tasks![source.index];

      let updateTask = tasks?.filter((value, index) => index !== source.index);

      if (updateTask?.length) {
        updateTask.splice(destination.index, 0, task);

        setTasks(updateTask);
      }

      return;
    }
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

  // En caso de que se este cargando la data
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen w-full ">
        <SyncLoader color="white" />
      </div>
    );
  }

  return (
    <div className="h-screen py-10 relative">
      {/* NOmbre de la tabla */}
      <h3 className="text-3xl text-center font-bold mb-10">{board?.name}</h3>

      {/* Contenedor de las columnas que permite poder arrastrarlas*/}
      <DragDropContext onDragEnd={onDragEnd}>
        {/* Contenedor de las columnas */}
        <div className="grid gap-10 max-md:text-center md:grid-cols-3 md:gap-5 w-[90%] max-w-[15000px] mx-auto">
          {/* Columna de Pendientes */}
          <Column
            title="Pendientes"
            tasks={tasks?.filter((task) => task.status === "TODO")}
            droppableId="todo"
          />

          {/* Columna de En Progreso */}
          <Column
            title="En Progreso"
            tasks={tasks?.filter((task) => task.status === "IN_PROGRESS")}
            droppableId="inProgress"
          />

          {/* Columna de Completadas */}
          <Column
            title="Completadas"
            tasks={tasks?.filter((task) => task.status === "DONE")}
            droppableId="done"
          />
        </div>
      </DragDropContext>

      {/* Boton para crear una nueva tarea */}
      <div className="absolute bottom-10 right-10 bg-purple-900 rounded-full p-2">
        <CustomButton
          icon="add"
          tooltip="Nueva Tarea"
          classButton="icon"
          onClick={openDialog}
        />
      </div>

      {/* Dialog para crear una nueva tarea */}
      {showDialog && board && (
        <Dialog
          title="¿Quieres crear una nueva tarea?"
          formConfig={createTaskForm}
          formAction={createTask}
          cancelText="Cancelar"
          confirmText="Crear"
          onCancel={closeDialog}
          onConfirm={() => submitDialog("creada")}
        />
      )}
    </div>
  );
};

export default Board;
