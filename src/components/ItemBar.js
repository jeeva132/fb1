import React from "react";

export const ItemBar = ({ name, children, type, event }) => {
  let placeHolderStyle = {
    height: "32px",
    width: "32px",
    background: "whitesmoke",
    borderRadius: "50%",
  };

  return (
    <div className="shortcut-item" {...(event ? { onClick: event } : {})}>
      <span className={`${type ? type : "user"}-icon`}>
        {children || <div style={placeHolderStyle}></div>}
      </span>
      <p className="item-name">{name}</p>
    </div>
  );
};
