import React from "react";

import classes from "./Button.module.scss";

interface IButtonProps {
  id?: string;
  type?: "button" | "submit";
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  outline?: boolean;
  children: React.ReactNode;
}
export const Button: React.FunctionComponent<IButtonProps> = ({
  id,
  children,
  outline,
  onClick,
  type,
}) => {
  return (
    <button
      id={id}
      className={`${classes.btn} ${
        outline ? classes.outline : classes.button
      } `}
      type={type || "button"}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
