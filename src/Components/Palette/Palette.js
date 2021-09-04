import { useEffect, useState } from 'react';
import style from './Palette.module.css';
import PropTypes from 'prop-types';

function Palette({
  value,
  onColorChange,
  onTemporaryColorChange,
  onCancelColorSelection,
}) {
  const [red, setRed] = useState(parseInt(value.slice(1, 3), 16));
  const [green, setGreen] = useState(parseInt(value.slice(3, 5), 16));
  const [blue, setBlue] = useState(parseInt(value.slice(6), 16));
  const [color, setColor] = useState(value);

  useEffect(() => {
    onTemporaryColorChange(color);
  }, [color, value, onTemporaryColorChange]);

  function convertColors(rgb) {
    const hex =
      '#' +
      rgb
        .map(function (x) {
          x = parseInt(x).toString(16);
          return x.length === 1 ? '0' + x : x;
        })
        .join('');
    return hex;
  }

  function handleChangeRed(e) {
    e.preventDefault();
    const newRed = e.target.value;
    setRed(newRed);
    setColor(convertColors([newRed, green, blue]));
  }

  function handleChangeGreen(e) {
    e.preventDefault();
    const newGreen = e.target.value;
    setGreen(newGreen);
    setColor(convertColors([red, newGreen, blue]));
  }

  function handleChangeBlue(e) {
    e.preventDefault();
    const newBlue = e.target.value;
    setBlue(newBlue);
    setColor(convertColors([red, green, newBlue]));
  }

  const handleCancelBtnClick = event => {
    event.preventDefault();
    onTemporaryColorChange(value);
    onCancelColorSelection();
  };

  const handleOKClick = event => {
    event.preventDefault();
    onColorChange(color);
    onTemporaryColorChange(color);
  };

  return (
    <div className={style.Container}>
      <div className={style.Triangle}></div>
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

export default Palette;

Palette.propTypes = {
  value: PropTypes.string.isRequired,
  onColorChange: PropTypes.func.isRequired,
  onTemporaryColorChange: PropTypes.func.isRequired,
  onCancelColorSelection: PropTypes.func.isRequired,
};
