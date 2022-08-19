// Get the first few lines after the heading tags

const getFirstFewLines = (page) => {
  return page
    .evaluate(() => {
      const headings = Array.from(
        document.querySelectorAll("h1, h2, h3, h4, h5, h6")
      );
      const firstFewLines = [];
      let currentLine = 0;
      let currentHeading = 0;
      while (currentLine < 10 && currentHeading < headings.length) {
        const heading = headings[currentHeading];
        const headingPosition = heading.getBoundingClientRect().top;
        if (headingPosition > currentLine) {
          firstFewLines.push(heading.textContent);
          currentLine = headingPosition;
        }
        currentHeading++;
      }
      return firstFewLines;
    })
    .then((firstFewLines) => {
      return firstFewLines;
    })
    .catch((error) => {
      console.log(error);
    });
};

export default getFirstFewLines;
