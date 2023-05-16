import "@material/linear-progress/dist/mdc.linear-progress.min.css";
import { LinearProgress } from "@rmwc/linear-progress";

const ProgressLine = () => {
  return (
    <LinearProgress className="progress h-1 absolute top-[73px] left-0 z-50 w-full text-left" />
  );
};

export default ProgressLine;
