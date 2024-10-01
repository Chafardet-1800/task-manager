"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import CustomInput from "@/app/shared/ui/customInput";
import CustomButton from "@/app/shared/ui/customButton";
import { SyncLoader } from "react-spinners";
import { createNewBoard, createTask } from "@/app/actions/boardActions";

const varianst = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const OnboardingForm = ({
  user,
  boardId,
}: {
  user: string | null | undefined;
  boardId: string | null;
}) => {
  const [step, setStep] = useState(1);

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (boardId !== null) {
      router.replace("/taskmanager");
    }
  }, []);

  const stepOneSubmit = () => {
    setStep(2);
  };

  const stepTwoSubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      router.replace("/taskmanager");
      toast.success(`Felicidades ${user}! Has creado un nuevo proyecto.`);
      setIsLoading(false);
    }, 5000);
  };

  const goBack = () => {
    setStep(1);
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.5 }}
      variants={varianst}
      className="flex flex-col items-center justify-center h-full pt-10 w-[90%] max-w-[1450px] mx-auto text-white"
    >
      {step === 1 && (
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5 }}
          variants={varianst}
          className="w-full text-center"
        >
          <h2 className="mb-10 text-3xl font-bold uppercase">
            Bienvenido{" "}
            <span className="text-purple-600 dark:text-purple-600">
              {user}!
            </span>{" "}
            <br />
            Creemos un nuevo proyecto
          </h2>

          <form
            className="flex flex-col items-center gap-10"
            action={createNewBoard}
            onSubmit={stepOneSubmit}
          >
            <CustomInput
              type="text"
              name="boardName"
              required={true}
              placeholder="Nombre del proyecto"
              disable={isLoading}
              fullWidth={false}
            ></CustomInput>

            <CustomButton
              classButton=""
              type="submit"
              disabled={isLoading}
              text="Continuar"
            ></CustomButton>
          </form>
        </motion.div>
      )}

      {step === 2 && (
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5 }}
          variants={varianst}
          className="w-full text-center"
        >
          <h2 className="mb-10 text-3xl font-bold uppercase">
            Creemos la primera tarea
          </h2>

          <form
            className="flex flex-col items-center gap-10"
            action={createTask}
            onSubmit={stepTwoSubmit}
          >
            <CustomInput
              type="text"
              name="task"
              required={true}
              placeholder="Tarea N°1"
              disable={isLoading}
              fullWidth={false}
            ></CustomInput>

            <CustomInput
              type="hidden"
              name="boardId"
              required={true}
              disable={isLoading}
              fullWidth={false}
              value={boardId!}
            ></CustomInput>

            <div className="flex justify-between gap-10 w-4/5">
              <CustomButton
                classButton="white"
                icon="back"
                type="submit"
                disabled={isLoading}
                text=""
                onClick={goBack}
              ></CustomButton>

              <CustomButton
                classButton=""
                type="submit"
                disabled={isLoading}
                text="Continuar"
              ></CustomButton>
            </div>

            {isLoading && (
              <div className="flex items-center text-white gap-3">
                <SyncLoader color="white" />
                <span>Guardando proyecto</span>
              </div>
            )}
          </form>
        </motion.div>
      )}
    </motion.div>
  );
};

export default OnboardingForm;
