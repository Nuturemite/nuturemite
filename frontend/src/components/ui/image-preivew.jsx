import React, { useState } from "react";

const ImagePreview = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div onClick={handleClick} className="cursor-pointer">
        {children}
      </div>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
          onClick={handleClose}
        >
          <img
            src={React.Children.only(children).props.src}
            alt="Enlarged view"
            className="max-w-[90%] max-h-[90%] object-contain transition-all"
          />
        </div>
      )}
    </>
  );
};

export default ImagePreview;
