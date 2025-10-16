import { useGetWidthWindow } from "../../../../castomHooks/useGetWidthWindow";

import arrowNextSmall from "../../../../assets/icons/arrow-right-small.svg";
import arrowPrevSmall from "../../../../assets/icons/arrow-left-small.svg";
import arrowNextSmallDisabled from "../../../../assets/icons/arrow-right-small-disabled.svg";
import arrowPrevSmallDisabled from "../../../../assets/icons/arrow-left-small-disabled.svg";
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
  const windowWidth: number = useGetWidthWindow();
  const srcImage = windowWidth >= 756 ? arrowNext : arrowNextSmall;
  const srcImageDisabled =
    windowWidth >= 756 ? arrowNextDisabled : arrowNextSmallDisabled;

  return (
    <button
      disabled={disabled}
      onClick={() => onHandleChangeActiveIndex(onActiveIndex + 1)}
      className={styles["next-btn"]}
    >
      <img src={disabled ? srcImageDisabled : srcImage} alt="next" />
    </button>
  );
}

export function SlidePrevButton({
  disabled,
  onActiveIndex,
  onHandleChangeActiveIndex,
}: SlideButtonProps) {
  const windowWidth: number = useGetWidthWindow();
  const srcImage = windowWidth >= 756 ? arrowPrev : arrowPrevSmall;
  const srcImageDisabled =
    windowWidth >= 756 ? arrowPrevDisabled : arrowPrevSmallDisabled;

  return (
    <button
      disabled={disabled}
      onClick={() => onHandleChangeActiveIndex(onActiveIndex - 1)}
      className={styles["prev-btn"]}
    >
      <img src={disabled ? srcImageDisabled : srcImage} alt="prev" />
    </button>
  );
}
