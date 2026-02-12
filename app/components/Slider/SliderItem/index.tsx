import { useEffect, useRef, useState } from "react";
import { Product } from "../../../api/products";
import { ReactComponent as BidIcon } from "@/app/assets/icons/bid.svg";
import s from "./styles.module.scss";
import cn from "classnames";
import { useIsScaleInitialized } from "../../ScaleContainer/useScale";

interface Props {
  item: Product;
  isMoving: boolean;
}

export const SliderItem = ({ item, isMoving }: Props) => {
  const initialized = useIsScaleInitialized();
  const expectedClickRef = useRef(false);
  const preventClickRef = useRef(false);

  // eslint-disable-next-line react-hooks/purity
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const intervalId = setInterval(() => {
      setNow(Date.now());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (isMoving === true && expectedClickRef.current) {
      preventClickRef.current = true;

      const onPointerUp = (e: PointerEvent) => {
        if (
          e.target instanceof HTMLElement &&
          !e.target?.classList.contains(s.button)
        ) {
          preventClickRef.current = false;
        }
        document.documentElement.removeEventListener("pointerup", onPointerUp);
      };
      document.documentElement.addEventListener("pointerup", onPointerUp);
    }
  }, [isMoving]);

  return (
    <div className={cn(s.container, { [s.isMoving]: isMoving })}>
      <div className={s.date}>
        {initialized && formatMilliseconds(item.stopDate - now)}
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={item.img} alt="NFT" className={s.img} />
      <div className={s.name} title={item.name}>
        {item.name}
      </div>
      <div className={s.bottom}>
        <div className={s.bid}>
          <div className={s.bidTitle}>Current bid</div>
          <div className={s.bidPrice}>
            <BidIcon className={s.bidIcon} /> {item.bid} ETH
          </div>
        </div>
        <button
          className={s.button}
          onPointerDown={() => (expectedClickRef.current = true)}
          onPointerUp={(e) => {
            if (preventClickRef.current) {
              preventClickRef.current = false;
              return;
            }
            console.log(e);
          }}
        >
          PLACE BID
        </button>
      </div>
    </div>
  );
};

function formatMilliseconds(ms: number): string {
  if (ms < 0) ms = 0;

  const totalSeconds = Math.floor(ms / 1000);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const hh = String(hours).padStart(2, "0");
  const mm = String(minutes).padStart(2, "0");
  const ss = String(seconds).padStart(2, "0");

  return `${hh}h ${mm}m ${ss}s`;
}
