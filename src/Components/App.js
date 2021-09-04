import { useState, useEffect } from 'react';
import './App.css';
import ColorPicker from './ColorPicker';

function App() {
  const [value, setValue] = useState('#ff0000');
  const [colors, setColors] = useState([]);

  useEffect(() => {}, [value]);

  function handleOnChange(color) {
    setValue(color);
    localStorage.setItem('value', value);
  }
  function handleChangePalette(newColor) {
    setColors([...colors, newColor]);
  }

  return (
    <div className="App">
      <ColorPicker
        onChange={handleOnChange}
        colors={colors}
        value={value}
        onChangePalette={handleChangePalette}
      />
    </div>
  );
}

export default App;
