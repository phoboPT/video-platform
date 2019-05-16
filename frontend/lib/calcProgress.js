export default function calcProgress(data, isShowVideo) {
  const { course, user } = data;
  const videosCourse = course.videos;
  const videoIds = [];

  const res = {
    percent: 0,
    total: 0,
    watched: 0,
  };

  videosCourse.forEach(item => {
    videoIds.push(item.video.id);
  });
  if (videoIds.length < 1) {
    return res;
  }
  const videosWatched = [];
  // MyCourses Card
  if (isShowVideo === 1) {
    const { videoUser } = user;
    videoUser.forEach(video => {
      video.videoItem.forEach(videoItem => {
        if (videoItem.watched) {
          videosWatched.push(videoItem.video.id);
        }
      });
    });
  }
  // ShowVideo
  if (isShowVideo === 2) {
    const videoUser = user;
    videoUser.forEach(video => {
      if (video.watched) {
        videosWatched.push(video.video.id);
      }
    });
  }

  let watchedVideos = 0;
  videoIds.forEach(video => {
    videosWatched.forEach(item => {
      if (video === item) {
        watchedVideos += 1;
      }
    });
  });

  res.percent = (watchedVideos * 100) / videoIds.length || 0;
  res.total = videoIds.length || 0;
  res.watched = watchedVideos || 0;

  return res;
}
