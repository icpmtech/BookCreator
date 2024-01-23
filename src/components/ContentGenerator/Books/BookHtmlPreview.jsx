const BookHtmlPreview = ({ bookData }) => {
  return (
    <div style={stylesHtml.page}>
      <div style={stylesHtml.section}>
        <h1 style={stylesHtml.heading}>{bookData.title}</h1>
        <p>{bookData.description}</p>
        <p>{bookData.content}</p>
      </div>
      {bookData.chapters?.map((chapter, index) => (
        <div key={index} style={stylesHtml.section}>
          <h2 style={stylesHtml.heading}>Chapter {index + 1}: {chapter.name}</h2>
          {chapter.sections?.map((section, sIndex) => (
             <><h3 key={sIndex} style={stylesHtml.subHeading}>Section {sIndex + 1}: {section.title}</h3><p key={sIndex} style={stylesHtml.text}>Section {sIndex + 1}: {section.content}</p></>
          ))}
        </div>
      ))}
    </div>
  );
};

// Equivalent CSS styles
const stylesHtml = {
  page: { 
    flexDirection: 'column', 
    padding: '30px',
    fontFamily: 'sans-serif',
  },
  section: {
    fontSize: '14px', 
    margin: '10px', 
    padding: '10px', 
    flexGrow: 1,
  },
  heading: { 
    fontSize: '16px', 
    fontWeight: 'bold', 
    marginTop: '15px', 
    marginBottom: '10px',
  }, 
  subHeading: { 
    fontSize: '15px', 
    fontWeight: 'bold', 
    marginTop: '15px', 
    marginBottom: '10px',
  }, 
  text: { 
    fontSize: '14px', 
    fontWeight: 'normal', 
    marginTop: '15px', 
    marginBottom: '10px',
  }
};

export default BookHtmlPreview;
