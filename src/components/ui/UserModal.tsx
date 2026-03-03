import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import type { User } from "../../interfaces/users.interface";
import { useBoundStore } from "../../store/bound.store";
import { useShallow } from "zustand/shallow";
import Spinner from "../svgs/Spinner";
import Edit from "../svgs/Edit";
import Close from "../svgs/Close";

const UserModal = ({ user }: { user: User }) => {
  const [open, setOpen] = React.useState(false);
  const [saving, setSaving] = React.useState(false);

  const { updatedUser } = useBoundStore(
    useShallow((state) => ({
      updatedUser: state.updatedUser,
    })),
  );

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    let data = Object.fromEntries(new FormData(e.currentTarget));
    const userData = { id: user.id, ...data } as User;

    await updatedUser(userData);
    setOpen(false);
    setSaving(false);
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger className="cursor-pointer">
        <Edit />
      </Dialog.Trigger>

      {/* Portal: joga o elemento no final da árvore DOM (facilitando para que o modal esteja acima dos outros elementos)*/}
      <Dialog.Portal>
        {/* Overlay: funciona como o background */}
        <Dialog.Overlay className="fixed inset-0 bg-black/40" />

        <div className="fixed inset-0 flex items-start justify-center min-h-dvh overflow-y-auto py-4">
          {/* Radix vai adicionar um atributo data-state que vai nos informar se o o modal está open ou closed, podemos adicionar estilizição no tailwind baseado nesse atributo */}
          <Dialog.Content
            forceMount
            className="w-full max-w-md p-4 my-auto rounded-xl bg-white
            data-[state=open]:animate-[dialog-content-in_300ms]
            data-[state=closed]:animate-[dialog-content-out_300ms_forwards]"
          >
            <div className="flex justify-between mb-4 text-xl">
              <Dialog.Title>Editar Usuário</Dialog.Title>
              <Dialog.Close className="cursor-pointer">
                <Close />
              </Dialog.Close>
            </div>
            <Dialog.Description className="sr-only">
              Editar informações do usuário
            </Dialog.Description>

            <UserFields saving={saving} onSubmit={handleSubmit} user={user}>
              <div className="flex justify-end gap-2 mt-4">
                <Dialog.Close className="py-2 px-4 text-sm font-semibold rounded-xl cursor-pointer text-gray-600 focus:text-gray-800 hover:text-gray-800">
                  Cancelar
                </Dialog.Close>
                <button className="flex items-center justify-center py-2 px-4 text-sm font-semibold rounded-xl cursor-pointer text-white bg-green-500 focus:bg-green-600 hover:bg-green-600">
                  {saving ? <Spinner /> : "Salvar"}
                </button>
              </div>
            </UserFields>
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default UserModal;

interface UserFields extends React.FormHTMLAttributes<HTMLFormElement> {
  user: User;
  saving: boolean;
  children: React.ReactNode;
}

const UserFields = ({ user, saving, children, ...props }: UserFields) => {
  return (
    <form {...props} className="flex flex-col gap-3">
      <fieldset disabled={saving} className={`${saving ? "*:opacity-50" : ""}`}>
        <div>
          <Field label="Nome" id="name" value={user.name} onFocus={true} />
        </div>
        <div>
          <Field label="Cargo" id="role" value={user.role} />
        </div>
        <div>
          <Field label="Email" id="email" value={user.email} />
        </div>
        {children}
      </fieldset>
    </form>
  );
};

const Field = ({
  label,
  id,
  value,
  onFocus,
}: {
  label: string;
  id: string;
  value: string;
  onFocus?: boolean;
}) => {
  return (
    <>
      <label
        className="text-sm font-medium leading-5 text-gray-900 "
        htmlFor={id}
      >
        {label}
      </label>
      <input
        className="mt-1 block w-full px-2 py-1.5 text-sm rounded-md border border-gray-300 text-gray-900 shadow-sm sm:leading-6"
        autoFocus={onFocus}
        defaultValue={value}
        type="text"
        name={id}
        id={id}
        required
      />
    </>
  );
};
