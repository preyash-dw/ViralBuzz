import React, { useState, useEffect } from 'react';

function App() {
  const [contents, setContents] = useState([]);

  useEffect(() => {
    fetchContents();
  }, []);

  async function fetchContents() {
    try {
      const response = await fetch('https://viral-buzz-api.vercel.app/api/contents');
      const data = await response.json();
      console.log(data);
      setContents(data);
    } catch (error) {
      console.error('Error fetching contents:', error);
    }
  }

  const func=(url)=>{
    const parts = url.split('/');
    const filename = parts[parts.length - 1];
    return filename;
  }
  return (
    <div className="App">
      <div className="content-list">
        {contents.map(content => (
          <div className="content-item" key={content._id}>
            <img src={`http://localhost:5000/${func(content.image)}`} alt={content.title} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;