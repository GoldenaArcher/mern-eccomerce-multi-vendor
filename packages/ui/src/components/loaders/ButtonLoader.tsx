import { ReactSpinner } from "./ReactSpinner";

export const overrideStyle = {
  display: "flex",
  margin: 0,
  height: "24px",
  justifyContent: "center",
  alignItems: "center",
};

const ButtonLoader = ({
  loader = <ReactSpinner cssOverride={overrideStyle} color="#fff" />,
}) => {
  return loader;
};

export default ButtonLoader;
