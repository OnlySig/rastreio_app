"use client";
import { ReactNode, useActionState, useState } from "react";
import { createRouteAction } from "./createRouteAction";

const NewRouteForm = ({ children }: { children: ReactNode }) => {
  const [toggle, setToggle] = useState(false);
  const [state, formAction] = useActionState<
    {
      error?: string;
      success?: boolean;
    } | null,
    FormData
  >(createRouteAction, null);
  return (
    <form action={formAction}>
      {state?.error && (
        <div className="p-4 border rounded text-contrast bg-error">
          {state.error}
        </div>
      )}
      {state?.success && (
        <div
          className={`flex items-center justify-between p-4 border rounded text-contrast bg-success ${
            toggle && "hidden"
          }`}
        >
          Rota criada com sucesso!
          <span onClick={() => setToggle(!toggle)} className="cursor-pointer">
            x
          </span>
        </div>
      )}
      {children}
    </form>
  );
};

export default NewRouteForm;
