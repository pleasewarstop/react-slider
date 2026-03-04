"use client";

import { useEffect, useState } from "react";
import cn from "classnames";
import { useIsScaleInitialized } from "@/components/ScaleContainer/useScale";
import { ReactComponent as BidIcon } from "@/assets/icons/bid.svg";
import s from "./styles.module.scss";
import { Product } from "@/api/products";
import { SliderItemProps } from "@/components/Slider";
import { SliderProductButton } from "@/components/SliderProduct/Button";

export function SliderProduct({ item, isMoving }: SliderItemProps<Product>) {
  const initialized = useIsScaleInitialized();

  // eslint-disable-next-line react-hooks/purity
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const intervalId = setInterval(() => {
      setNow(Date.now());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={cn(s.container, { [s.isMoving]: isMoving })}>
      <div className={s.date}>
        {initialized && formatMilliseconds(item.stopDate - now)}
      </div>
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
        <SliderProductButton onPointerUp={console.log} isMoving={isMoving} />
      </div>
    </div>
  );
}

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
