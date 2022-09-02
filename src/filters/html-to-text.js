module.exports = (value) => {
  const htmlString = value;
  return htmlString.replace(/<[^>]+>/g, "");
};
