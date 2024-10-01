import Link from "next/link";

const HomePage = () => {
  return (
    <div className="bg-[url('/images/bg.jpeg')] bg-cover h-[100vh] w-full pt-3 overflow-hidden text-white">
      <div className="flex items-center justify-center h-full pt-10 gap-10 w-[90%] max-w-[1450px] mx-auto">
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <img
            className="rounded-xl order-last md:min-w-[800px] min-w-[500px] md:h-[500px] max-sm:px-5"
            src="/images/landing.png"
            alt="Imagen ejemplo de la pagina"
          />

          <div className="flex flex-col justify-center max-md:items-center max-md:text-center space-y-4  ">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Maneja y vizualiza tus tareas
            </h2>

            <p className="max-w-[500px] md:text-xl text-gray-50">
              Crea, administra y toma el control de tus proyectos, con estas
              simple pero efectiva herramienta.
            </p>

            <Link href={"/onboarding"}>
              <button className="learn-more">
                <span className="circle" aria-hidden="true">
                  <span className="icon arrow"></span>
                </span>
                <span className="button-text">Empieza a planificar</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
