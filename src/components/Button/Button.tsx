import { Suspense } from "react";

const Button = (props: {
  children?: string;
  type?: string;
  name?: string;
  loading?: boolean;
}) => {
  return (
    <button name={props.name} className="action-button">
      {props.children}
      <Suspense fallback={<p>O</p>}></Suspense>
    </button>
  );
};

export default Button;
