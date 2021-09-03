import { useEffect, useState } from 'react';
import style from './Palette.module.css';

function Slider({ onColorChange, addColorToUsersPalette, togglePalette }) {
  const [red, setRed] = useState('255');
  const [green, setGreen] = useState('255');
  const [blue, setBlue] = useState('255');
  const [color, setColor] = useState('');
  useEffect(() => {
    onColorChange(color);
  }, [color, setColor]);

  function handleChangeRed(e) {
    e.preventDefault();
    let newRed = e.target.value;
    setRed(newRed);
    setColor(convertColors([newRed, green, blue]));
  }

  function convertColors(rgb) {
    let hex =
      '#' +
      rgb
        .map(function (x) {
          x = parseInt(x).toString(16);
          return x.length == 1 ? '0' + x : x;
        })
        .join('');

    return hex;
  }

  function handleChangeGreen(e) {
    e.preventDefault();
    let newGreen = e.target.value;
    setGreen(newGreen);
    setColor(convertColors([red, newGreen, blue]));
  }
  function handleChangeBlue(e) {
    e.preventDefault();
    let newBlue = `${e.target.value}`;
    setBlue(newBlue);
    setColor(convertColors([red, green, newBlue]));
    // mixColors(red, green, newBlue);
    // if (newBlue > 100) {
    //   setBlue(newBlue);
    //   mixColors(red, green, newBlue);
    // } else if (newBlue >= 0) {
    //   setBlue(newBlue.padStart(3, '0'));
    //   mixColors(red, green, newBlue.padStart(3, '0'));
    // }
  }

  const handleCancelBtnClick = event => {
    event.preventDefault();
    setColor(localStorage.getItem('currentColor'));
    togglePalette();
  };

  const handleOKClick = event => {
    event.preventDefault();
    addColorToUsersPalette(color);
    localStorage.setItem('currentColor', color);
    togglePalette();
  };

  return (
    <div className={style.Container}>
      <div className={style.Slider}>
        <input
          type="range"
          id="red"
          min="0"
          max="255"
          step="1"
          value={red}
          onChange={handleChangeRed}
          className={style.redInput}
        ></input>
        <input
          type="range"
          id="green"
          min="0"
          max="255"
          value={green}
          onChange={handleChangeGreen}
          className={style.greenInput}
        ></input>
        <input
          type="range"
          id="blue"
          min="0"
          max="255"
          value={blue}
          onChange={handleChangeBlue}
          className={style.blueInput}
        ></input>
      </div>
      <div className={style.ButtonContainer}>
        <button
          type="button"
          onClick={handleCancelBtnClick}
          className={style.CancelButton}
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleOKClick}
          className={style.OkButton}
        >
          Ok
        </button>
      </div>
    </div>
  );
}

export default Slider;
