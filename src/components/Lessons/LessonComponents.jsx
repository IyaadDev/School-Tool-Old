import React, { useEffect, useState } from "react";

function FetchLessonDataL({ setLessonData }) {
  const getLessonIdFromURL = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const lessonId = urlParams.get('id');
    console.log('Lesson ID:', lessonId);
    return lessonId;
  };

  useEffect(() => {
    const fetchLessonData = async () => {
      const lessonIdNo = getLessonIdFromURL();
      var lessonId = lessonIdNo + ".json";
      if (lessonId) {
        try {
          const response = await fetch(`https://cloud.acroford.com/sct/lessons/${lessonId}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          console.log('Lesson data:', data);
          setLessonData(data);
          // Further logic with lessonData can be implemented here
        } catch (error) {
          console.error('Error fetching lesson data:', error);
        }
      }
    };

    fetchLessonData();
  }, [setLessonData]);

  return <div></div>;
}

function InfoL({ lessonData }) {
  if (!lessonData) {
    return <div>Loading...</div>; // or some other loading indicator
  }

  const { pagesData } = lessonData.lessonData;
  const currentPageData = pagesData["1"];

  const renderBlocks = currentPageData.data.blocks.map((block) => {
    if (block.type === "header-one") {
      return <h1 key={block.key}>{block.text}</h1>;
    } else if (block.type === "unstyled") {
      return <p key={block.key}>{block.text}</p>;
    } else {
      return null; // handle other block types if necessary
    }
  });

  return <div>{renderBlocks}</div>;
}

function QuizL({}) {}

function ResultsL({}) {}

function StartL({}) {}

function EndL({}) {}

function LessonPlayer() {
  const [lessonData, setLessonData] = useState(null);

  return (
    <div>
      <FetchLessonDataL setLessonData={setLessonData} />
      <InfoL lessonData={lessonData} />
    </div>
  );
}

export default LessonPlayer;