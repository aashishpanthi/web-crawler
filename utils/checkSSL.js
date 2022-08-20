// check if the url is using SSL

const checkSSL = (url) => {
  const urlSplit = url.split("://");

  return urlSplit[0] === "https" ? true : false;
};

export default checkSSL;
