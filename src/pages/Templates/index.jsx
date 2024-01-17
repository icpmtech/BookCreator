import React from 'react';
import ReactDOM from 'react-dom';
import DynamicForm from './DynamicForm';

const schema = {
  title: "My Form",
  type: "object",
  required: ["firstName", "lastName"],
  properties: {
    firstName: { type: "string", title: "First Name" },
    lastName: { type: "string", title: "Last Name" },
    age: { type: "integer", title: "Age" },
    bio: { type: "string", title: "Bio" },
    password: { type: "string", title: "Password", minLength: 3 }
  }
};

const TemplateApp = () => {
  const handleFormSubmit = formData => {
    console.log("Form Data: ", formData);
  };

  return <DynamicForm schema={schema} onSubmit={handleFormSubmit} />;
};


