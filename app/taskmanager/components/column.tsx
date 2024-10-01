import { TaskModel } from "@/app/shared/models/types";
import CustomButton from "@/app/shared/ui/customButton";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { useState } from "react";
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

  const [taskId, setTaskId] = useState(null);

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
                        />
                        <CustomButton
                          text=""
                          custonIconColor="#c71846"
                          tooltip="Eliminar"
                          icon="delete"
                          size={18}
                          classButton="icon"
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
    </div>
  );
};

export default Column;
