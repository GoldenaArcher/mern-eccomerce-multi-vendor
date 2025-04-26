import { PuffLoader, FadeLoader, PropagateLoader } from "react-spinners";

type SpinnerType = "puff" | "fade" | "propagate";

interface SpinnerProps {
  type?: SpinnerType;
  color?: string;
  size?: number;
  cssOverride?: React.CSSProperties;
}

export const ReactSpinner = ({
  type = "puff",
  color = "#3498db",
  size = 60,
  cssOverride,
}: SpinnerProps) => {
  switch (type) {
    case "fade":
      return <FadeLoader color={color} cssOverride={cssOverride} />;
    case "propagate":
      return <PropagateLoader color={color} cssOverride={cssOverride} />;
    case "puff":
    default:
      return <PuffLoader color={color} size={size} cssOverride={cssOverride} />;
  }
};
