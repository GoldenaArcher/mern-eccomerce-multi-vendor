import React from "react";
import { PropagateLoader } from "react-spinners";

const CenteredLoader = ({
  loader = <PropagateLoader color="#fff" />,
  className = "flex justify-center py-10",
}) => {
  return <div className={className}>{loader}</div>;
};

export default CenteredLoader;
