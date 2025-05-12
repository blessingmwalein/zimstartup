"use client";
import React, { Fragment } from "react";
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
} from "@headlessui/react";
import { AiOutlineClose } from "react-icons/ai";

const MyDialog = ({
  open,
  children,
  className,
  extended,
  width,
  height,
  _onClose,
}) => {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog
        as="div"
        className={extended ? "relative z-[950]" : "relative z-[905]"}
        onClose={() => {}}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black bg-opacity-50" />
        </TransitionChild>

        <div className="fixed inset-0">
          <div className="flex h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95">
              <DialogPanel
                className={`p-6 transform overflow-hidden rounded-xl bg-white text-left align-middle shadow-xl transition-all 
                  ${className}`}
                style={width ? { width, height } : {}}>
                {_onClose && (
                  <button
                    type="button"
                    className="absolute w-[33px] h-[33px] flex justify-center items-center top-3 right-3 hover:bg-gray-200 rounded-full"
                    onClick={_onClose}>
                    <AiOutlineClose className="text-[26px] text-gray-500" />
                  </button>
                )}

                {children}
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default MyDialog;
