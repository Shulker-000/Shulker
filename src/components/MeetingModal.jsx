import React from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "./ui/Dialog.jsx";
import { Button } from "./ui/button.jsx";
import { cn } from "../lib/utils.js";

const MeetingModal = ({
  isOpen,
  onClose,
  title,
  className,
  children,
  handleClick,
  buttonText,
  instantMeeting,
  image,
  buttonClassName,
  buttonIcon,
  description, // <-- optional prop
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="flex w-full max-w-[520px] flex-col gap-6 border-none bg-dark-1 px-6 py-9 text-white"
        aria-describedby={description ? undefined : undefined} // prevents warning if no desc
      >
        <div className="flex flex-col gap-6">
          {image && (
            <div className="flex justify-center">
              <img src={image} alt="checked" width={72} height={72} />
            </div>
          )}

          {/* Accessible title */}
          <DialogTitle asChild>
            <h1 className={cn("text-3xl font-bold leading-[42px]", className)}>
              {title}
            </h1>
          </DialogTitle>

          {/* Accessible description (optional) */}
          {description && (
            <DialogDescription>{description}</DialogDescription>
          )}

          {children}

          <Button
            className={cn(
              "bg-blue-1 focus-visible:ring-0 focus-visible:ring-offset-0",
              buttonClassName
            )}
            onClick={handleClick}
          >
            {buttonIcon && (
              <img
                src={buttonIcon}
                alt="button icon"
                width={13}
                height={13}
              />
            )}
            &nbsp;
            {buttonText || "Schedule Meeting"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MeetingModal;
