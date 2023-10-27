import React, { useEffect } from "react";

function FetchLessonDataL({}) {
  let lessonData = null;

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
          lessonData = await response.json();
          console.log('Lesson data:', lessonData);
          // Further logic with lessonData can be implemented here
        } catch (error) {
          console.error('Error fetching lesson data:', error);
        }
      }
    };

    fetchLessonData();
  }, []);

  return <div></div>;
}

function InfoL ({}) {
}

function QuizL ({}) {
}

function ResultsL ({}) {
}

function StartL ({}) {
}

function EndL ({}) {
}

export { InfoL, QuizL, ResultsL, StartL, EndL, FetchLessonDataL };
