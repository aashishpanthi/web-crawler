// Get the id and class of the section tag

const getSectionDetails = (page) => {
  return page
    .evaluate(() => {
      const section = document.querySelector("section");
      return section ? { id: section.id, class: section.className } : {};
    })
    .then((sectionDetails) => {
      return sectionDetails;
    })
    .catch((error) => {
      console.log(error);
    });
};

export default getSectionDetails;
