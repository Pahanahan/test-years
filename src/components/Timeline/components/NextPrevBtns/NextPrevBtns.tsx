import { useState, useEffect } from "react";
import { useSwiper } from "swiper/react";

import arrowNext from "../../../../assets/icons/arrow-right-blue.svg";
import arrowPrev from "../../../../assets/icons/arrow-left-blue.svg";
import styles from "./NextPrevBtns.module.scss";

interface NextPrevBtnProps {
  onActiveIndex: number;
}

export function NextPrevBtn({ onActiveIndex }: NextPrevBtnProps) {
  const swiper = useSwiper();
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(true);

  useEffect(() => {
    if (!swiper) return;

    const updateButtons = () => {
      setIsBeginning(swiper.isBeginning);
      setIsEnd(swiper.isEnd);
    };

    swiper.on("afterInit", updateButtons);
    swiper.on("slideChange", updateButtons);
    swiper.on("reachBeginning", updateButtons);
    swiper.on("reachEnd", updateButtons);

    updateButtons();

    return () => {
      swiper.off("afterInit", updateButtons);
      swiper.off("slideChange", updateButtons);
      swiper.off("reachBeginning", updateButtons);
      swiper.off("reachEnd", updateButtons);
    };
  }, [swiper]);

  useEffect(() => {
    if (!swiper) return;
    swiper.slideTo(0, 0);
    setTimeout(() => {
      setIsBeginning(swiper.isBeginning);
      setIsEnd(swiper.isEnd);
    }, 50);
  }, [onActiveIndex, swiper]);

  if (isBeginning && isEnd) return null;

  return (
    <>
      {!isBeginning && (
        <button
          onClick={() => swiper.slidePrev()}
          className={styles["prev-btn"]}
        >
          <img src={arrowPrev} alt="prev" />
        </button>
      )}
      {!isEnd && (
        <button
          onClick={() => swiper.slideNext()}
          className={styles["next-btn"]}
        >
          <img src={arrowNext} alt="next" />
        </button>
      )}
    </>
  );
}
