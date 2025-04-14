import React from "react";
import { PropagateLoader } from "react-spinners";
import { overrideStyle } from "../../../utils/styleUtil";

const ButtonLoader = ({
  loader = <PropagateLoader cssOverride={overrideStyle} color="#fff" />,
}) => {
  return loader;
};

export default ButtonLoader;
