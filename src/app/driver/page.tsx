import { RouteModel } from "@/utils/models";
import MapDriver from "./MapDriver";

export const getRoutes = async () => {
  const resp = await fetch("http://localhost:3000/routes", {
    cache: "force-cache",
    next: {
      tags: ["routes"],
    },
  });
  return resp.json();
};

const Driver = async () => {
  const routes: RouteModel[] = await getRoutes();
  return (
    <div className="flex flex-1 w-full h-full">
      <div className="w-1/3 p-2 h-full">
        <h4 className="text-3xl text-contrast mb-2">Inicie uma rota</h4>
        <div className="flex flex-col">
          <form action="">
            <select className="mb-2 p-2 border rounded bg-default text-contrast w-full cursor-pointer">
              {routes.map((route) => (
                <option key={route.id} value={route.id}>
                  {route.name}
                </option>
              ))}
            </select>
            <button className="bg-main text-primary p-2 rounded text-xl font-bold w-full">
              Iniciar a viagem
            </button>
          </form>
        </div>
      </div>
      <MapDriver />
    </div>
  );
};

export default Driver;
