export const linear = (progress: number) => progress;

export function animate({
  timing,
  draw,
  duration,
}: {
  timing: (fraction: number) => number;
  draw: (progress: number) => void;
  duration: number;
}) {
  const start = performance.now();
  let stopped = false;

  requestAnimationFrame(function frame(time) {
    if (stopped) return;

    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;
    if (timeFraction < 0) timeFraction = 0;

    const progress = timing(timeFraction);

    draw(progress);

    if (timeFraction < 1) {
      requestAnimationFrame(frame);
    }
  });
  return function stop() {
    stopped = true;
  };
}
