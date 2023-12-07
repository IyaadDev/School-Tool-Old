import React, { useState } from 'react';

const Player = ({ contentList }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    if (currentIndex < contentList.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goToBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div>
      {contentList.length > 0 ? (
        <div>{contentList[currentIndex]}</div>
      ) : (
        <div>No content available</div>
      )}
      <button onClick={goToBack} disabled={currentIndex === 0}>
        Back
      </button>
      <button onClick={goToNext} disabled={currentIndex === contentList.length - 1}>
        Next
      </button>
    </div>
  );
};

export default Player;
