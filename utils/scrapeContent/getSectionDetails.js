// Get the id and class of the section tag

const getSectionDetails = async (page) => {
  return page
    .evaluate(() => {
      const sections = Array.from(document.querySelectorAll("section"));
      return sections.map((section) => {
        return {
          id: section.id ? section.id : "",
          class: section.className ? section.className : "",
        };
      });
    })
    .then((sectionDetails) => {
      return sectionDetails;
    })
    .catch((error) => {
      console.log(error);
    });
};

export default getSectionDetails;
