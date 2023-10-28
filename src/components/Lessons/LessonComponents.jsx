import React, { useEffect, useState } from "react";
import "./lesson.css"
import Navbar from "../Navbar";

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
    return (
      <div className="panel">
        <div>Loading...</div>
      </div>
    ); // or some other loading indicator
  }

  const { name, version, description, audienceLevel } = lessonData.lessonInfo;

  return (
    <div className="container">
      <div className="panel text-center align-items-center">
        <img src="https://cdn.acroford.com/sctC.webp" alt="logo" className="ll" />
        <h1 className="lh">{name}</h1>
        <p className="lv">Version: {version}</p>
        <p className="ld">{description}</p>
        <p className="lal">Recommended Grade: <b>{audienceLevel}</b></p>
      </div>
    </div>
  );
}

function QuizL({}) {}

function ResultsL({}) {}

function StartL({}) {}

function EndL({}) {}

function LessonPlayer() {
  const [lessonData, setLessonData] = useState(null);

  return (
    <div>
      <Navbar />
      <FetchLessonDataL setLessonData={setLessonData} />
      <InfoL lessonData={lessonData} />
    </div>
  );
}

export default LessonPlayer;