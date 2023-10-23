import React, { useEffect, useState } from "react";
import axios from "axios";
import { TextPanel, TextPanelWithIcon, Notes, Info, Lesson } from "Panels";

function Widgets() {
  const [widgets, setListOfWidgets] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://faas-blr1-8177d592.doserverless.co/api/v1/web/fn-3d00acfd-4377-4fe1-a494-f5d6925c1201/demo/widgets"
      )
      .then((response) => {
        if (Array.isArray(response.data)) {
          setListOfWidgets(response.data);
        } else {
          console.error("Response data is not an array:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <>
      {widgets.map((widget, index) => {
        if (widget.Type === "TextPanel") {
          return (
            <TextPanel
              key={index}
              heading={widget.Content.heading}
              content={widget.Content.content}
              className={widget.Content.size}
            />
          );
        }
        return null;
      })}
      {widgets.map((widget, index) => {
        if (widget.Type === "TextPanelWithIcon") {
          return (
            <TextPanelWithIcon
              key={index}
              heading={widget.Content.heading}
              content={widget.Content.content}
              className={widget.Content.size}
              icon={widget.Content.icon}
              iconHeight={widget.Content.iconHeight}
              iconWidth={widget.Content.iconWidth}
            />
          );
        }
        return null;
      })}
      {widgets.map((widget, index) => {
        if (widget.Type === "Notes") {
          return (
            <Notes
              key={index}
              heading={widget.Content.heading}
              className={widget.Content.size}
              preview={widget.Content.preview}
              fullLink={widget.Content.fullLink}
            />
          );
        }
        return null;
      })}
      {widgets.map((widget, index) => {
        if (widget.Type === "Info") {
          return (
            <Info
              key={index}
              heading={widget.Content.header}
              className={widget.Content.size}
              content={widget.Content.content}
            />
          );
        }
        return null;
      })}
      {widgets.map((widget, index) => {
        if (widget.Type === "Lesson") {
          return (
            <Lesson
              key={index}
              contentNo={widget.ContentNo}
              content={widget.Content}
            />
          );
        }
        return null;
      })}
    </>
  );
}

export default Widgets;
