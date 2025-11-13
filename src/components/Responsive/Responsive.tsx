import classes from "./Responsive.module.css";

const Responsive = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={`${classes.container} ${className}`}>{children}</div>;
};

export default Responsive;
