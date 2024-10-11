import { deleteTask, editTask } from "@/app/shared/actions/boardActions";
import { FormInputConfigModel, TaskModel } from "@/app/shared/models/types";
import CustomButton from "@/app/shared/ui/customButton";
import Dialog from "@/app/shared/ui/dialog";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { useState } from "react";
import toast from "react-hot-toast";
import { LuDot } from "react-icons/lu";

const Column = ({
  title,
  tasks,
  droppableId,
}: {
  title: string;
  tasks: TaskModel[] | undefined;
  droppableId: string;
}) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const [isEdit, setIsEdit] = useState(false);

  const [isDelete, setIsDelete] = useState(false);

  const [formConfig, setFormConfig] = useState<FormInputConfigModel[]>([]);

  // Funcion para abrir el dialogo
  const openDialog = (taskId: string, isEdit: boolean) => {
    if (isEdit) {
      const value = tasks?.find((task) => task.id === taskId)?.name || "";

      const config = [
        {
          name: "task",
          type: "text",
          value: value,
          placeholder: "Nueva tarea",
          required: true,
          fullWidth: true,
          style: "",
        },
        {
          name: "taskId",
          type: "hidden",
          value: taskId,
          placeholder: "",
          required: true,
          fullWidth: true,
          style: "",
        },
      ];

      setFormConfig(config);
      setIsEdit(true);
    } else {
      const config = [
        {
          name: "taskId",
          type: "hidden",
          value: taskId,
          placeholder: "Nueva tarea",
          required: true,
          fullWidth: true,
          style: "",
        },
      ];

      setFormConfig(config);
      setIsDelete(true);
    }
  };

  // Funcion para cerrar el dialogo
  const closeDialog = (isEdit: boolean) => {
    isEdit ? setIsEdit(false) : setIsDelete(false);
  };

  return (
    <div className="flex-1">
      <div className="flex gap-1 dark:text-white">
        <p className="text-md text-sm-semibold mb-4 uppercase">{title}</p>
        <LuDot size={25} />
      </div>

      <Droppable droppableId={droppableId} type="PERSON">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            style={{
              backgroundColor: snapshot.isDraggingOver ? "#581c87" : "#1e293b",
            }}
            {...provided.droppableProps}
            className="dark:bg-slate-800 bg-gray-200 rounded p-4"
          >
            {tasks?.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(povided) => (
                  <div
                    ref={povided.innerRef}
                    {...povided.draggableProps}
                    {...povided.dragHandleProps}
                    className="bg-gray-700 rounded text-white p-2 mb-2 flex justify-between"
                    onMouseEnter={() => {
                      setHoverIndex(index);
                    }}
                    onMouseLeave={() => {
                      setHoverIndex(null);
                    }}
                  >
                    {task.name}

                    {hoverIndex === index && (
                      <div className="flex gap-5">
                        <CustomButton
                          text=""
                          custonIconColor="#fff"
                          tooltip="Editar"
                          icon="edit"
                          size={18}
                          classButton="icon"
                          onClick={() => openDialog(task.id, true)}
                        />
                        <CustomButton
                          text=""
                          custonIconColor="#c71846"
                          tooltip="Eliminar"
                          icon="delete"
                          size={18}
                          classButton="icon"
                          onClick={() => openDialog(task.id, false)}
                        />
                      </div>
                    )}
                  </div>
                )}
              </Draggable>
            ))}

            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {/* Dialog para editar una tarea */}
      {isEdit && (
        <Dialog
          title="¿Quieres editar esta tarea?"
          formConfig={formConfig}
          formAction={editTask}
          cancelText="Cancelar"
          confirmText="Editar"
          onCancel={() => closeDialog(true)}
          onConfirm={() => closeDialog(true)}
        />
      )}

      {/* Dialog para elimnar una  tarea */}
      {isDelete && (
        <Dialog
          title="¿Quieres eliminar esta tarea?"
          formConfig={formConfig}
          formAction={deleteTask}
          cancelText="Cancelar"
          confirmText="Eliminar"
          classButton="cancel"
          onCancel={() => closeDialog(false)}
          onConfirm={() => closeDialog(false)}
        />
      )}
    </div>
  );
};

export default Column;
