import { useState } from "react";

import TimelineSwiper from "./components/TimelineSwiper/TimelineSwiper";
import { useGetWidthWindow } from "../../castomHooks/useGetWidthWindow";
import { timelineData } from "../../data/timelineData";
import type { ITimeline } from "../../data/timelineData";

import styles from "./Timeline.module.scss";

function Timeline() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [rotateDeg, setRotateDeg] = useState<number>(60);

  const windowWidth: number = useGetWidthWindow();

  const styleTranslateNumber = windowWidth >= 1200 ? 265 : 200;

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

  const handleChangeActiveIndex = (id: number): void => {
    setActiveIndex(id);
    setRotateDeg((id + 1) * 60);
  };

  const timelineDataMap = timelineData.map((item, index) => {
    const angle = (360 / timelineData.length) * index;

    const style = `rotate(${angle}deg) translate(${styleTranslateNumber}px)`;

    const styleHorizonPosition = `rotate(${-angle + rotateDeg}deg)`;

    return (
      <button
        onClick={() => handleChangeActiveIndex(item.id - 1)}
        key={item.id}
        className={`${styles["timeline__btn"]} ${
          activeIndex === index ? styles["timeline__btn--active"] : ""
        }`}
        style={{ transform: style }}
      >
        <div
          className={styles["timeline__btn-number"]}
          style={{ transform: styleHorizonPosition }}
        >
          {item.id}
          <span
            className={`${styles["timeline__description"]} ${
              activeIndex === index
                ? styles["timeline__description--active"]
                : ""
            }`}
          >
            {categoriesName}
          </span>
        </div>
      </button>
    );
  });

  const activeAngle = (360 / timelineData.length) * activeIndex;
  const style = `rotate(${-activeAngle - 60}deg)`;

  return (
    <div className={styles["timeline"]}>
      <div className={styles["timeline__interactive"]}>
        <div
          className={styles["timeline__circle-border"]}
          style={{ transform: style }}
        ></div>
        <div
          className={styles["timeline__circle"]}
          style={{ transform: style }}
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
        onHandleChangeActiveIndex={handleChangeActiveIndex}
      />
    </div>
  );
}

export default Timeline;
