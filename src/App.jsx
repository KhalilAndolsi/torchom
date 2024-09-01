import { Minus, Plus, Settings } from "lucide-react";
import React, { useEffect, useState } from "react";
import Rachma from "./components/Rachma";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { Input } from "@nextui-org/input";

export default function App() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [p1, setP1] = useState(0);
  const [p2, setP2] = useState(0);
  const [info, setInfo] = useState({
    player1: "Player 1",
    player2: "Player 2",
  });

  // Load data from localStorage or initialize it
  useEffect(() => {
    const storedData = JSON.parse(window.localStorage.getItem("info"));
    if (storedData) {
      setP1(storedData.p1Points);
      setP2(storedData.p2Points);
      setInfo({
        player1: storedData.player1,
        player2: storedData.player2,
      });
    } else {
      window.localStorage.setItem(
        "info",
        JSON.stringify({
          ...info,
          p1Points: p1,
          p2Points: p2,
        })
      );
    }
  }, []);

  // Save data to localStorage whenever p1, p2, or info changes
  useEffect(() => {
    window.localStorage.setItem(
      "info",
      JSON.stringify({
        ...info,
        p1Points: p1,
        p2Points: p2,
      })
    );
  }, [p1, p2, info]);

  const handleSave = () => {
    const player1Name = document.getElementById("p1").value;
    const player2Name = document.getElementById("p2").value;

    setInfo({
      player1: player1Name,
      player2: player2Name,
    });

    onOpenChange(false);
  };

  return (
    <>
      <button
        onClick={() => {
          setP1(0);
          setP2(0);
        }}
        type="button"
        className="py-1.5 px-8 border-[3px] border-black rounded-t-lg bg-black text-white">
        Reset
      </button>
      <section className="w-full border-[3px] border-black rounded-lg overflow-hidden">
        <div className="flex *:flex-1 *:text-center *:font-bold *:p-4 *:bg-white gap-[3px] bg-black pb-[3px]">
          <div>
            {info.player1} ( {p2} )
          </div>
          <div>
            {info.player2} ( {p1} )
          </div>
        </div>
        <div className="flex gap-[3px] bg-black h-[300px]">
          <div className="bg-white flex-1 p-2 grid gap-2 grid-cols-2 overflow-y-scroll">
            {p2 !== 0 &&
              [...Array(Math.ceil(p2 / 5)).fill(null)].map((_, i) => (
                <Rachma nb={p2 - 5 * i} key={i} />
              ))}
          </div>
          <div className="bg-white flex-1 p-2 grid gap-2 grid-cols-2 overflow-y-scroll">
            {p1 !== 0 &&
              [...Array(Math.ceil(p1 / 5)).fill(null)].map((_, i) => (
                <Rachma nb={p1 - 5 * i} key={i} />
              ))}
          </div>
        </div>
        <div className="flex pt-[3px] gap-[3px] bg-black">
          <div className="flex flex-1 gap-[3px]">
            <button
              type="button"
              disabled={p2 === 0}
              onClick={() => setP2((prev) => prev - 1)}
              className="bg-white flex-1 p-4 grid place-items-center">
              <Minus size={23} strokeWidth={3} />
            </button>
            <button
              type="button"
              onClick={() => setP2((prev) => prev + 1)}
              className="bg-black text-white flex-1 p-4 grid place-items-center">
              <Plus size={23} strokeWidth={3} />
            </button>
          </div>
          <div className="flex flex-1 gap-[3px]">
            <button
              type="button"
              disabled={p1 === 0}
              onClick={() => setP1((prev) => prev - 1)}
              className="bg-white flex-1 p-4 grid place-items-center">
              <Minus size={23} strokeWidth={3} />
            </button>
            <button
              type="button"
              onClick={() => setP1((prev) => prev + 1)}
              className="bg-black text-white flex-1 p-4 grid place-items-center">
              <Plus size={23} strokeWidth={3} />
            </button>
          </div>
        </div>
      </section>
      <button
        onClick={onOpen}
        type="button"
        className="fixed top-2 right-2 p-2.5 rounded-full grid place-items-center hover:bg-zinc-200">
        <Settings size={25} />
      </button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Settings
              </ModalHeader>
              <ModalBody className="block">
                <label htmlFor="p1" className="text-sm font-semibold px-1">
                  Player 1
                </label>
                <Input
                  type="text"
                  variant="faded"
                  defaultValue={info.player1}
                  placeholder="Player 1 Name"
                  id="p1"
                />
                <br />
                <label htmlFor="p2" className="text-sm font-semibold px-1">
                  Player 2
                </label>
                <Input
                  type="text"
                  variant="faded"
                  defaultValue={info.player2}
                  placeholder="Player 2 Name"
                  id="p2"
                />
              </ModalBody>
              <ModalFooter>
                <button type="button" className="py-1.5 px-3 rounded bg-black text-white" onClick={handleSave}>
                  Save
                </button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
