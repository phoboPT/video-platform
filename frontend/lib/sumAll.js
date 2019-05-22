function zeroPad(num, places) {
  const zero = places - num.toString().length + 1;
  return Array(+(zero > 0 && zero)).join('0') + num;
}

function formatTime(time) {
  const splitTime = time.split(':');
  let countH = 0;
  let countM = 0;
  let countS = 0;

  if (splitTime.length === 3) {
    countH = parseInt(time.split(':')[0]);
    countM = parseInt(time.split(':')[1]);
    countS = parseInt(time.split(':')[2]);
  }
  if (splitTime.length === 2) {
    countM = parseInt(time.split(':')[0]);
    countS = parseInt(time.split(':')[1]);
  }
  if (splitTime.length === 1) {
    countS = parseInt(time.split(':')[0]);
  }

  // console.log(splitTime);
  return `${zeroPad(countH, 2)}:${zeroPad(countM, 2)}:${zeroPad(countS, 2)}`;
}

function sumAll(videos) {
  let countH = 0;
  let countM = 0;
  let countS = 0;
  videos.forEach(item => {
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

  return `${zeroPad(countH, 2)}:${zeroPad(countM, 2)}:${zeroPad(countS, 2)}`;
}

function sumAllDuration(time) {
  let countH = 0;
  let countM = 0;
  let countS = 0;
  time.forEach(item => {
    const m = parseInt(item.split(':')[0]);
    const s = parseInt(item.split(':')[1]);
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

  return `${zeroPad(countH, 2)}:${zeroPad(countM, 2)}:${zeroPad(countS, 2)}`;
}

export { sumAll, formatTime, sumAllDuration };
