import { useState } from 'react';
import './App.css';
import ColorPicker from './ColorPicker';

function App() {
  const [value, setValue] = useState('#ff0000');
  const [colors, setColors] = useState(['#ff0000']);

  function handleOnChange(color) {
    setValue(color);
    if (!colors.includes(color)) {
      setColors(colors.concat(color));
    }

    localStorage.setItem('value', value);
  }

  return (
    <div className="App">
      <ColorPicker onChange={handleOnChange} colors={colors} value={value} />
    </div>
  );
}

export default App;
