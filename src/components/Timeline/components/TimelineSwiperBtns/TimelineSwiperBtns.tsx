// import { useSwiper } from "swiper/react";

import arrowNext from "../../../../assets/icons/arrow-right.svg";
import arrowPrev from "../../../../assets/icons/arrow-left.svg";
import arrowNextDisabled from "../../../../assets/icons/arrow-right-disabled.svg";
import arrowPrevDisabled from "../../../../assets/icons/arrow-left-disabled.svg";
import styles from "./TimelineSwiperBtns.module.scss";

interface SlideButtonProps {
  disabled: boolean;
  onActiveIndex: number;
  onHandleChangeActiveIndex: (id: number) => void;
}

export function SlideNextButton({
  disabled,
  onActiveIndex,
  onHandleChangeActiveIndex,
}: SlideButtonProps) {
  // const swiper = useSwiper();

  return (
    <button
      disabled={disabled}
      onClick={() => onHandleChangeActiveIndex(onActiveIndex + 1)}
      className={styles["next-btn"]}
    >
      <img src={disabled ? arrowNextDisabled : arrowNext} alt="next" />
    </button>
  );
}

export function SlidePrevButton({
  disabled,
  onActiveIndex,
  onHandleChangeActiveIndex,
}: SlideButtonProps) {
  // const swiper = useSwiper();

  return (
    <button
      disabled={disabled}
      onClick={() => onHandleChangeActiveIndex(onActiveIndex - 1)}
      className={styles["prev-btn"]}
    >
      <img src={disabled ? arrowPrevDisabled : arrowPrev} alt="prev" />
    </button>
  );
}
