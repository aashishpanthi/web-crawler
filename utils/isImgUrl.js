const isImgUrl = (url) => {
  return /\.(jpg|jpeg|png|webp|avif|gif|pdf|mp3|mp4)$/.test(url);
};

export default isImgUrl;
