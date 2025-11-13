"use client";

import React, {
  ButtonHTMLAttributes,
  MouseEvent,
  ReactNode,
  useState,
} from "react";

import classes from "./Button.module.css";
import LoadingIcon from "@/assets/LoadingIcon";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "primary-outlined"
  | "secondary-outlined"
  | "shadow-outlined"
  | "outlined"
  | "text"
  | "link";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children: ReactNode;
  copy?: boolean;
  hoverAnimation?: "top" | "right" | "bottom" | "left" | "none";
}

const Button: React.FC<ButtonProps> = ({
  variant = "text",
  fullWidth = false,
  loading = false,
  leftIcon,
  rightIcon,
  children,
  disabled,
  className = "",
  value,
  copy,
  hoverAnimation = "top",
  onClick,
  ...props
}) => {
  const [clicked, setClicked] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (copy) {
      if (copied) return;
      navigator.clipboard.writeText(JSON.stringify(value || "{}"));
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 651);

      return;
    }
    if (loading || disabled) return;

    setClicked(true);
    setTimeout(() => {
      setClicked(false);
    }, 150);

    if (onClick) {
      onClick(event);
    }
  };

  const buttonClasses = [
    classes.container,
    classes[variant],
    classes[clicked ? "" : hoverAnimation],
    fullWidth && classes.fullWidth,
    loading && classes.loading,
    clicked && classes.clicked,
    copied && classes.copied,
    disabled && classes.disabled,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={handleClick}
      {...props}
    >
      {loading && <LoadingIcon />}
      {!loading && leftIcon && (
        <span className={classes.leftIcon}>{leftIcon}</span>
      )}
      <span className={classes.content}>{children}</span>
      {!loading && rightIcon && (
        <span className={classes.rightIcon}>{rightIcon}</span>
      )}
    </button>
  );
};

export default Button;
