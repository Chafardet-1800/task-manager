"use server"

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server"
import toast from "react-hot-toast";

const {userId}: {userId: string | null} = auth();

export async function createNewBoard(formData: FormData) {

    const name = formData.get("boardName") as string;

    const existingBoard = await prisma.kanbanBoard.findFirst({
        where: {
            userId: userId!
        }
    })

    if (existingBoard) {
        await prisma.kanbanBoard.update({
            where: {
                id: existingBoard.id
            },
            data: {
                name: name
            }
        })
    }

    else {
        await prisma.kanbanBoard.create({
            data: {
                name: name,
                userId: userId!
            }
        })
    }
    
    revalidatePath("");

}

export async function createTask(formData: FormData) {

    const name = formData.get("task") as string;
    const boardId = formData.get("boardId") as string;

    if(!name.trim() || !boardId.trim()) {
        return;
    };

    await prisma.task.create({
        data: {
            name: name,
            board: {connect: {id: boardId}},
            status: "TODO",
        }
    })

    revalidatePath("");

}

export async function editTask(formData: FormData) {

    const newTask = formData.get("task") as string;
    const taskId = formData.get("taskId") as string;

    if(!newTask.trim() || !taskId.trim()) {
        return;
    };

    await prisma.task.update({
        where:{
            id: taskId
        },
        data:{
            name: newTask
        }
    })

    revalidatePath("");

}

export async function deleteTask(formData: FormData) {

    const taskId = formData.get("taskId") as string;

    if(!taskId.trim()) {
        return;
    };

    await prisma.task.delete({
        where:{
            id: taskId
        },
    })

    revalidatePath("");

}