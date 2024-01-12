import React, { useState } from 'react';
import Papa from 'papaparse';

const CsvReader = () => {
  const [data, setData] = useState([]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    
    Papa.parse(file, {
      complete: (result) => {
        console.log('Parsed: ', result.data);
        setData(result.data);
        
        // Save to localStorage
        localStorage.setItem('csvData', JSON.stringify(result.data));
      },
      header: true
    });
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      {/* Render your data */}
    </div>
  );
};

export default CsvReader;