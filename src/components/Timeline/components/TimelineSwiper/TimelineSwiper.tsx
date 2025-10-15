import { Dispatch, SetStateAction } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import {
  SlideNextButton,
  SlidePrevButton,
} from "../TimelineSwiperBtns/TimelineSwiperBtns";
import type { ITimeline } from "../../../../data/timelineData";

import styles from "./TimelineSwiper.module.scss";

interface TimelineSwiperProps {
  timelineDataCategoryItems: ITimeline[];
  categoriesLength: number;
  onActiveIndex: number;
  onSetActiveIndex: Dispatch<SetStateAction<number>>;
}

function TimelineSwiper({
  timelineDataCategoryItems,
  categoriesLength,
  onActiveIndex,
  onSetActiveIndex,
}: TimelineSwiperProps) {
  const disabledNext = onActiveIndex >= categoriesLength - 1 ? true : false;
  const disabledPrev = onActiveIndex <= 0 ? true : false;

  const timelineDataMap = timelineDataCategoryItems.flatMap((item) => {
    return item.events.map((event) => {
      return (
        <SwiperSlide
          key={event.year + event.title}
          className={styles["slider__item"]}
        >
          <div className={styles["slider__year"]}>{event.year}</div>
          <div className={styles["slider__descr"]}>{event.title}</div>
        </SwiperSlide>
      );
    });
  });

  return (
    <Swiper
      className={styles["slider"]}
      spaceBetween={80}
      slidesPerView={3}
      onSlideChange={() => console.log("slide change")}
    >
      <div className={styles["slider__current"]}>0{onActiveIndex + 1}/06</div>
      <div className={styles["slider__btns"]}>
        <SlidePrevButton
          disabled={disabledPrev}
          onActiveIndex={onActiveIndex}
          onSetActiveIndex={onSetActiveIndex}
        />
        <SlideNextButton
          disabled={disabledNext}
          onActiveIndex={onActiveIndex}
          onSetActiveIndex={onSetActiveIndex}
        />
      </div>
      {timelineDataMap}
    </Swiper>
  );
}

export default TimelineSwiper;
