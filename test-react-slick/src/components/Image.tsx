import React from "react";
import "./Image.scss";

type Props = {
  src: string;
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

const Image = ({ src, className }: Props) => {
  return (
    <div className={`custom-img-wrapper ${className || ""}`}>
      <img className="custom-img" src={src} alt="" />
    </div>
  );
};

export default Image;
