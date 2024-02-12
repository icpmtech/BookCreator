import React, { useState, useEffect } from 'react';

import initTemplate from './template.json';
const formTemplate =[{
  "bookName": {
      "label": "Book Name",
      "type": "text",
      "validation": {
          "required": "Book Name is required",
          "minLength": {
              "value": 3,
              "message": "Book Name should have at least 3 characters"
          }
      }
  },
  "bookDescription": {
      "label": "Book Description",
      "type": "textarea",
      "validation": {
          "required": "Book Description is required"
      }
  },
  "email": {
      "label": "Email",
      "type": "email",
      "validation": {
          "required": "Email is required",
          "pattern": {
              "value": "^\\S+@\\S+$",
              "message": "Invalid email address"
          }
      }
  },
  "additionalNotes": {
      "label": "Additional Notes",
      "type": "textarea",
      "validation": {
          "required": "Additional Notes are required"
      }
  },
  "chapters": {
      "label": "Chapters",
      "type": "array",
      "itemStructure": {
          "title": {
              "label": "Title",
              "type": "text",
              "validation": {
                  "required": "Title is required"
              }
          },
          "content": {
              "label": "Content",
              "type": "textarea"
          },
          "image": {
              "label": "Image",
              "type": "image" 
          }
      },
      "validation": {
          "required": "At least one chapter is required"
      }
  },
  "sections": {
      "label": "Sections",
      "type": "array",
      "itemStructure": {
          "title": {
              "label": "Title",
              "type": "text",
              "validation": {
                  "required": "Title is required"
              }
          },
          "content": {
              "label": "Content",
              "type": "textarea"
          },
          "image": { 
              "label": "Image",
              "type": "image"
          }
      },
      "validation": {
          "required": "At least one section is required"
      }
  },
  "anexs": {
      "label": "Sections",
      "type": "array",
      "itemStructure": {
          "title": {
              "label": "Title",
              "type": "text",
              "validation": {
                  "required": "Title is required"
              }
          },
          "content": {
              "label": "Content",
              "type": "textarea"
          },
          "image": { 
              "label": "Image",
              "type": "image"
          }
      },
      "validation": {
          "required": "At least one section is required"
      }
  }
},
{
  "bookName": {
      "label": "Book Name",
      "type": "text",
      "validation": {
          "required": "Book Name is required",
          "minLength": {
              "value": 3,
              "message": "Book Name should have at least 3 characters"
          }
      }
  },
  "bookDescription": {
      "label": "Book Description",
      "type": "textarea",
      "validation": {
          "required": "Book Description is required"
      }
  },
  "email": {
      "label": "Email",
      "type": "email",
      "validation": {
          "required": "Email is required",
          "pattern": {
              "value": "^\\S+@\\S+$",
              "message": "Invalid email address"
          }
      }
  },
  "additionalNotes": {
      "label": "Additional Notes",
      "type": "textarea",
      "validation": {
          "required": "Additional Notes are required"
      }
  },
  "chapters": {
      "label": "Chapters",
      "type": "array",
      "itemStructure": {
          "title": {
              "label": "Title",
              "type": "text",
              "validation": {
                  "required": "Title is required"
              }
          },
          "content": {
              "label": "Content",
              "type": "textarea"
          }
      },
      "validation": {
          "required": "At least one chapter is required"
      }
  },
  "sections": {
      "label": "Sections",
      "type": "array",
      "itemStructure": {
          "title": {
              "label": "Title",
              "type": "text",
              "validation": {
                  "required": "Title is required"
              }
          },
          "content": {
              "label": "Content",
              "type": "textarea"
          }
      },
      "validation": {
          "required": "At least one section is required"
      }
  },
 "anexs": {
      "label": "Sections",
      "type": "array",
      "itemStructure": {
          "title": {
              "label": "Title",
              "type": "text",
              "validation": {
                  "required": "Title is required"
              }
          },
          "content": {
              "label": "Content",
              "type": "textarea"
          }
      },
      "validation": {
          "required": "At least one section is required"
      }
  }
},
{
  "bookName": {
      "label": "Book Name",
      "type": "text",
      "validation": {
          "required": "Book Name is required",
          "minLength": {
              "value": 3,
              "message": "Book Name should have at least 3 characters"
          }
      }
  },
  "bookDescription": {
      "label": "Book Description",
      "type": "textarea",
      "validation": {
          "required": "Book Description is required"
      }
  },
  "email": {
      "label": "Email",
      "type": "email",
      "validation": {
          "required": "Email is required",
          "pattern": {
              "value": "^\\S+@\\S+$",
              "message": "Invalid email address"
          }
      }
  },
  "additionalNotes": {
      "label": "Additional Notes",
      "type": "textarea",
      "validation": {
          "required": "Additional Notes are required"
      }
  },
  "chapters": {
      "label": "Chapters",
      "type": "array",
      "itemStructure": {
          "title": {
              "label": "Title",
              "type": "text",
              "validation": {
                  "required": "Title is required"
              }
          },
          "content": {
              "label": "Content",
              "type": "textarea"
          },
          "image": {
              "label": "Image",
              "type": "image"
          },
          "sections": { 
              "label": "Sections",
              "type": "array",
              "itemStructure": {
                  "title": {
                      "label": "Title",
                      "type": "text",
                      "validation": {
                          "required": "Title is required"
                      }
                  },
                  "content": {
                      "label": "Content",
                      "type": "textarea"
                  },
                  "image": {
                      "label": "Image",
                      "type": "image"
                  }
              },
              "validation": {
                  "required": "At least one section is required"
              }
          }
      },
      "validation": {
          "required": "At least one chapter is required"
      }
  },
  "sections": {
      "label": "Sections",
      "type": "array",
      "itemStructure": {
          "title": {
              "label": "Title",
              "type": "text",
              "validation": {
                  "required": "Title is required"
              }
          },
          "content": {
              "label": "Content",
              "type": "textarea"
          },
          "image": {
              "label": "Image",
              "type": "image"
          }
      },
      "validation": {
          "required": "At least one section is required"
      }
  },
  "anexs": {
      "label": "Sections",
      "type": "array",
      "itemStructure": {
          "title": {
              "label": "Title",
              "type": "text",
              "validation": {
                  "required": "Title is required"
              }
          },
          "content": {
              "label": "Content",
              "type": "textarea"
          },
          "image": {
              "label": "Image",
              "type": "image"
          }
      },
      "validation": {
          "required": "At least one section is required"
      }
  }
}

];
function DynamicBookForm() {
  const [formData, setFormData] = useState({});

  // Load initial form data from localStorage or use the provided template
  useEffect(() => {
    const storedForms = localStorage.getItem('savedForms');
    if (storedForms) {
      setFormData(JSON.parse(storedForms));
    } else {
      // Assuming the template is structured in a way that it needs to be processed
      // to fit into the formData state structure. This might involve transforming
      // the initial structure into a more suitable format for your form component.
      const initialFormData = processTemplate(formTemplate);
      setFormData(initialFormData);
    }
  }, []);

  // Function to process the JSON template into a suitable structure for formData
  const processTemplate = (template) => {
    // Processing logic here
    // This would involve iterating over the template and constructing an object
    // that matches the structure expected by your form fields.
    return {}; // Return processed form data
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Submit logic here
  };

  // Function to render form fields dynamically based on formData
  const renderFormFields = (data) => {
    // Iterate over formData and render fields accordingly
    // This would involve checking the field type and rendering
    // the appropriate input element with validation rules applied.
  };

  return (
    <form onSubmit={handleSubmit}>
      {renderFormFields(formData)}
      <button type="submit">Submit</button>
    </form>
  );
}

export default DynamicBookForm;
