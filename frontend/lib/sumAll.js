export default function sumAll(videos) {
  let countH = 0;
  let countM = 0;
  let countS = 0;
  videos.map((item, index) => {
    const m = parseInt(item.video.duration.split(':')[0]);
    const s = parseInt(item.video.duration.split(':')[1]);
    if (countS + s > 59) {
      countM += 1;
      countS -= 60;
    }
    if (countM + m >= 60) {
      countH += 1;
      countM -= 60;
    }

    countS += s;
    countM += m;
  });

  return `${countH} : ${countM} : ${countS}`;
}
