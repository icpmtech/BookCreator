import { Document, Packer, Paragraph } from 'docx';

export const createDocx = async (bookData) => {
  
  // Array to hold all document elements
  const doc = new Document();
  const title = new Paragraph(bookData.title).heading1();
  const description = new Paragraph(bookData.description);
 docElements = [title, description];

  // Add overall content
  const overallContent = new Paragraph(bookData.content);
  docElements.push(overallContent);

  // Add chapters and sections
  bookData.chapters.forEach((chapter, index) => {
    const chapterTitle = new Paragraph(`Chapter ${index + 1}: ${chapter.name}`).heading2();
    docElements.push(chapterTitle);

    chapter.sections.forEach((section, sIndex) => {
      const sectionTitle = new Paragraph(`Section ${sIndex + 1}: ${section.title}`).bold();
      const sectionContent = new Paragraph(section.content);
      docElements.push(sectionTitle, sectionContent);
    });
  });

  // Add all elements to the document
  doc.addSection({
    children: docElements,
  });

  return await Packer.toBlob(doc);
};
