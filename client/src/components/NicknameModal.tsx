import { useState } from "react";
import { Dialog } from "@headlessui/react";

export default function NicknameModal(props: any) {
  const [author, setAuthor] = useState("");

  const handleNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthor(e.target.value);
  };
  const saveNickname = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (author.length != 0 || undefined) {
      localStorage.setItem("nickname", author);
      setTimeout(() => {
        location.reload();
      }, 2000);
    } else {
      alert("El nickname no debe estar vacio");
    }

    setAuthor("");
  };

  return (
    <Dialog
      open={props.open}
      onClose={() => console.log("nada por aqui")}
      className="relative z-50 "
    >
      <div className="fixed inset-0 flex items-center justify-center bg-midnight/95">
        <Dialog.Panel className="w-full max-w-sm bg-white p-4 rounded-xl">
          <Dialog.Title className="p-2 text-center text-2xl">
            Welcome to SocketChat
          </Dialog.Title>
          <Dialog.Description className="p-2 text-center">
            To start select a nickname and start chating
          </Dialog.Description>
          <form onSubmit={saveNickname}>
            <input
              type="text"
              className="w-full rounded-xl p-2 bg-almostBlack text-center text-silver"
              placeholder="Type your nickname"
              onChange={handleNickname}
            />
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
