import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogOverlay,
} from "./ui/Dialog.jsx";
import { Button } from "./ui/button.jsx";
import { cn } from "../lib/utils.js";

const MeetingModal = ({
  isOpen,
  onClose,
  title,
  children,
  handleClick,
  buttonText,
  image,
  buttonClassName,
  buttonIcon,
  description,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {/* Blurred, light overlay */}
      <DialogOverlay className="fixed inset-0 backdrop-blur-md bg-white/30" />

      <DialogContent
        className={cn(
          "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50",
          "w-full max-w-lg p-10 flex flex-col gap-8 rounded-3xl border border-gray-300",
          "bg-gray-100/80 text-gray-800 shadow-2xl backdrop-blur-md",
          "transition-all duration-300 ease-out scale-100"
        )}
      >
        <div className="flex flex-col gap-6 text-center">
          {image && (
            <div className="flex justify-center">
              <img
                src={image}
                alt="checked"
                width={84}
                height={84}
                className="drop-shadow-md"
              />
            </div>
          )}

          <DialogTitle asChild>
            <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight text-gray-800">
              {title}
            </h1>
          </DialogTitle>

          {description && (
            <DialogDescription className="text-gray-700 text-base sm:text-lg leading-relaxed">
              {description}
            </DialogDescription>
          )}

          {children}

          <Button
            className={cn(
              "bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl",
              "shadow-lg transition-all duration-200 ease-in-out hover:scale-[1.02]",
              buttonClassName
            )}
            onClick={handleClick}
          >
            {buttonIcon && (
              <img
                src={buttonIcon}
                alt="icon"
                width={18}
                height={18}
                className="mr-2 inline-block"
              />
            )}
            {buttonText || "Schedule Meeting"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MeetingModal;
