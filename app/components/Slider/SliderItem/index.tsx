import { useEffect, useRef, useState } from "react";
import { Product } from "../../../api/products";
import { ReactComponent as BidIcon } from "@/app/assets/icons/bid.svg";
import s from "./styles.module.scss";
import { useMounted } from "../../../hooks/useMounted";

interface Props {
  item: Product;
  disabled: boolean;
}

export const SliderItem = ({ item, disabled }: Props) => {
  const mounted = useMounted();
  const expectClickRef = useRef(false);
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
    if (disabled === true && expectClickRef.current) {
      preventClickRef.current = true;
    }
  }, [disabled]);

  return (
    <div className={s.container}>
      <div className={s.date}>
        {mounted && formatMilliseconds(item.stopDate - now)}
      </div>
      <img src={item.img} alt="NFT" className={s.img} />
      <div className={s.name}>{item.name}</div>
      <div className={s.bottom}>
        <div className={s.bid}>
          <div className={s.bidTitle}>Current bid</div>
          <div className={s.bidPrice}>
            <BidIcon className={s.bidIcon} /> {item.bid} ETH
          </div>
        </div>
        <button
          className={s.button}
          onMouseDown={() => (expectClickRef.current = true)}
          onClick={(e) => {
            expectClickRef.current = false;
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
  if (ms < 0) ms = 0; // защита от отрицательных значений

  const totalSeconds = Math.floor(ms / 1000);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  // Добавляем ведущий ноль
  const hh = String(hours).padStart(2, "0");
  const mm = String(minutes).padStart(2, "0");
  const ss = String(seconds).padStart(2, "0");

  return `${hh}h ${mm}m ${ss}s`;
}
