import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { Swiper as SwiperType } from "swiper/types";
import "swiper/css";
import "swiper/css/navigation";

import { useGetWidthWindow } from "../../../../castomHooks/useGetWidthWindow";
import {
  SlideNextButton,
  SlidePrevButton,
} from "../TimelineSwiperBtns/TimelineSwiperBtns";
import { NextPrevBtn } from "../NextPrevBtns/NextPrevBtns";
import type { ITimeline } from "../../../../data/timelineData";

import styles from "./TimelineSwiper.module.scss";

interface TimelineSwiperProps {
  timelineDataCategoryItems: ITimeline[];
  categoriesLength: number;
  onActiveIndex: number;
  onHandleChangeActiveIndex: (id: number) => void;
}

function TimelineSwiper({
  timelineDataCategoryItems,
  categoriesLength,
  onActiveIndex,
  onHandleChangeActiveIndex,
}: TimelineSwiperProps) {
  const disabledNext = onActiveIndex >= categoriesLength - 1 ? true : false;
  const disabledPrev = onActiveIndex <= 0 ? true : false;

  const windowWidth: number = useGetWidthWindow();

  const currentSlides: number = windowWidth >= 1200 ? 3 : 2;
  const gapSlides: number = windowWidth >= 1200 ? 80 : 40;

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
      onResize={(swiper: SwiperType) => swiper.update()}
      observer={true}
      observeParents={true}
      observeSlideChildren={true}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination]}
      spaceBetween={gapSlides}
      slidesPerView={currentSlides}
    >
      <div className={styles["slider__current"]}>0{onActiveIndex + 1}/06</div>
      <div className={styles["slider__btns"]}>
        <SlidePrevButton
          disabled={disabledPrev}
          onActiveIndex={onActiveIndex}
          onHandleChangeActiveIndex={onHandleChangeActiveIndex}
        />
        <SlideNextButton
          disabled={disabledNext}
          onActiveIndex={onActiveIndex}
          onHandleChangeActiveIndex={onHandleChangeActiveIndex}
        />
      </div>
      {timelineDataMap}
      <div className={styles["slider__nextprev-btns"]}>
        <NextPrevBtn onActiveIndex={onActiveIndex} />
      </div>
    </Swiper>
  );
}

export default TimelineSwiper;
