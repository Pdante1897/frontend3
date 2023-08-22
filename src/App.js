import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState('');
  const [musicData, setMusicData] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { titulo: title, artista: artist, anio: year, genero: genre };
    
    try {
      await axios.post('http://localhost:8080/music', formData);
      fetchMusicData();
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  const fetchMusicData = async () => {
    try {
      //const response = await axios.get('http://localhost:8080/music');
      //setMusicData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchMusicData();
  }, []);

  return (
    <div className="App">
      <h1>Música</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Título" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="text" placeholder="Artista" value={artist} onChange={(e) => setArtist(e.target.value)} />
        <input type="number" placeholder="Año" value={year} onChange={(e) => setYear(e.target.value)} />
        <input type="text" placeholder="Género" value={genre} onChange={(e) => setGenre(e.target.value)} />
        <button type="submit">Enviar</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Artista</th>
            <th>Año</th>
            <th>Género</th>
          </tr>
        </thead>
        <tbody>
          {musicData.map((item, index) => (
            <tr key={index}>
              <td>{item.title}</td>
              <td>{item.artist}</td>
              <td>{item.year}</td>
              <td>{item.genre}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;