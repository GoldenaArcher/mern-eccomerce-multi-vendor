import { FadeLoader } from "react-spinners";

const OverlayLoader = ({
  loader = <FadeLoader />,
  className = "bg-slate-600 absolute left-0 top-0 size-full opacity-70 flex justify-center items-center z-20",
}) => {
  return <div className={className}>{loader}</div>;
};

export default OverlayLoader;
