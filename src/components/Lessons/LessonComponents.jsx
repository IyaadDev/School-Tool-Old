import React, { useEffect, useState } from "react";
import "./lesson.css";
import Navbar from "../Navbar";

function FetchLessonDataL({ setLessonData }) {
  const getLessonIdFromURL = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const lessonId = urlParams.get("id");
    console.log("Lesson ID:", lessonId);
    return lessonId;
  };

  useEffect(() => {
    const fetchLessonData = async () => {
      const lessonIdNo = getLessonIdFromURL();
      var lessonId = lessonIdNo + ".json";
      if (lessonId) {
        try {
          const response = await fetch(
            `https://cloud.acroford.com/sct/lessons/${lessonId}`
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          console.log("Lesson data:", data);
          setLessonData(data);
          // Further logic with lessonData can be implemented here
        } catch (error) {
          console.error("Error fetching lesson data:", error);
        }
      }
    };

    fetchLessonData();
  }, [setLessonData]);

  return <div></div>;
}

function InfoL({ lessonData, handleStart }) {
  if (!lessonData) {
    return (
      <div className="panel">
        <div>Loading...</div>
      </div>
    );
  }

  const { name, version, description, audienceLevel } = lessonData.lessonInfo;

  return (
    <div className="container">
      <div className="panel text-center align-items-center">
        <img
          src="https://cdn.acroford.com/sctC.webp"
          alt="logo"
          className="ll"
        />
        <h1 className="lh">{name}</h1>
        <p className="lv">Version: {version}</p>
        <p className="ld">{description}</p>
        <p className="lal">Recommended Grade: <b>{audienceLevel}</b></p>
        <button onClick={handleStart}>Start</button>
      </div>
    </div>
  );
}

function Reading({ lessonData, currentPageNumber, handleNextPage }) {
  const convertToHTML = (jsonContent) => {
    if (!jsonContent) return null;

    return jsonContent.blocks.map((block) => {
      if (block.type === "header-one") {
        return <h1 key={block.key}>{block.text}</h1>;
      } else if (block.type === "header-two") {
        return <h2 key={block.key}>{block.text}</h2>;
      } else if (block.type === "header-three") {
        return <h3 key={block.key}>{block.text}</h3>;
      } else if (block.type === "atomic") {
        if (block.data.type === "image") {
          return <img key={block.key} src={block.data.src} alt={block.text} />;
        }
      } else {
        let style = {};
        if (block.inlineStyleRanges) {
          block.inlineStyleRanges.forEach((range) => {
            if (range.style === "BOLD") {
              style.fontWeight = "bold";
            } else if (range.style === "UNDERLINE") {
              style.textDecoration = "underline";
            } else if (range.style === "ITALIC") {
              style.fontStyle = "italic";
            }
          });
        }

        if (block.entityRanges && block.entityRanges.length > 0) {
          // Assuming only one entity per block for simplicity
          const entity = block.entityRanges[0];
          if (entity.type === "LINK") {
            return (
              <a key={block.key} href={entity.data.url} style={style}>
                {block.text}
              </a>
            );
          }
        }

        if (block.type === "ordered-list-item") {
          return <ol key={block.key}><li style={style}>{block.text}</li></ol>;
        } else if (block.type === "unordered-list-item") {
          return <ul key={block.key}><li style={style}>{block.text}</li></ul>;
        } else {
          return <p key={block.key} style={style}>{block.text}</p>;
        }
      }
    });
  };

  if (!lessonData) {
    return <div>Loading...</div>;
  }

  const currentPageData = lessonData.lessonData.pagesData[currentPageNumber];

  if (!currentPageData) {
    return <div>Page data not found</div>;
  }

  const htmlContent = convertToHTML(currentPageData.data);

  return (
    <div className="container">
      <div className="panel text-center align-items-center">
        <div className="lessonContent">{htmlContent}</div>
        <button onClick={() => handleNextPage(currentPageNumber + 1)}>Next</button>
      </div>
    </div>
  );
}

export { FetchLessonDataL, InfoL, Reading};

