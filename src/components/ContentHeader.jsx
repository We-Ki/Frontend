import React from "react";
import "./ContentHeader.css";

const ContentHeader = ({ title, sub }) => {
  return (
    <div className="contentHeader">
      <h1>{title}</h1>
      <h3>{sub}</h3>
    </div>
  );
};

export default ContentHeader;
