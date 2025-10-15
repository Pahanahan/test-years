import { useState } from "react";

import TimelineSwiper from "./components/TimelineSwiper/TimelineSwiper";
import { timelineData } from "../../data/timelineData";
import type { ITimeline } from "../../data/timelineData";

import styles from "./Timeline.module.scss";

function Timeline() {
  const [activeIndex, setActiveIndex] = useState<number>(
    timelineData.length - 1
  );

  const categoriesLength = timelineData.length;
  const categoriesName = timelineData[activeIndex].category;

  const timelineDataCategoryItems: ITimeline[] = timelineData
    .filter((item) => item.id === activeIndex + 1)
    .map((item) => ({
      ...item,
      events: item.events.sort((a, b) => a.year - b.year),
    }));

  const maxMinYear: [number, number] = [
    timelineDataCategoryItems[0].events[0].year,
    timelineDataCategoryItems[0].events[
      timelineDataCategoryItems[0].events.length - 1
    ].year,
  ];

  const timelineDataMap = timelineData.map((item, index) => {
    const style = `rotate(${
      (360 / timelineData.length) * index
    }deg) translate(265px)`;

    const styleHorizonPosition = `rotate(${
      -(360 / timelineData.length) * index
    }deg)`;

    if (activeIndex === index) {
      return (
        <button
          onClick={() => setActiveIndex(item.id)}
          key={item.id}
          className={`${styles["timeline__btn"]} ${styles["timeline__btn--active"]}`}
          style={{ transform: style }}
        >
          <div
            className={styles["timeline__btn-number"]}
            style={{
              transform: styleHorizonPosition,
            }}
          >
            {item.id}
            <span className={styles["timeline__description"]}>
              {categoriesName}
            </span>
          </div>
        </button>
      );
    } else {
      return (
        <button
          onClick={() => setActiveIndex(index)}
          key={item.category}
          className={styles["timeline__btn"]}
          style={{ transform: style }}
        >
          <div
            className={styles["timeline__btn-number"]}
            style={{
              transform: styleHorizonPosition,
            }}
          >
            {item.id}
          </div>
        </button>
      );
    }
  });

  const activeAngle = (360 / (timelineData.length - 1)) * activeIndex;

  return (
    <div className={styles["timeline"]}>
      <div className={styles["timeline__interactive"]}>
        <div
          className={styles["timeline__circle"]}
          style={{ transform: `rotate(-${activeAngle}deg)` }}
        >
          {timelineDataMap}
        </div>
        <div className={styles["timeline__interactive-y"]}></div>
        <div className={styles["timeline__interactive-x"]}></div>
      </div>
      <h1 className={styles["timeline__title"]}>Исторические даты</h1>
      <div className={styles["timeline__years"]}>
        <div className={styles["timeline__years-start"]}>{maxMinYear[0]}</div>
        <div className={styles["timeline__years-end"]}>{maxMinYear[1]}</div>
      </div>
      <TimelineSwiper
        categoriesLength={categoriesLength}
        timelineDataCategoryItems={timelineDataCategoryItems}
        onActiveIndex={activeIndex}
        onSetActiveIndex={setActiveIndex}
      />
    </div>
  );
}

export default Timeline;
