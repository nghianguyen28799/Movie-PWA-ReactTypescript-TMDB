import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface ICircularProgress {
  percentage: number;
}

const CirclarProgressBarComponent = (props: ICircularProgress) => {
  const { percentage } = props;

  return <CircularProgressbar value={percentage} text={`${percentage}%`} />;
};

export default CirclarProgressBarComponent;
