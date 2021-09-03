import { useEffect } from 'react';
import style from './UserPalette.module.css';
import { v4 as uuidv4 } from 'uuid';

function ModalPalette({
  colors,
  toggleUserPalette,
  onColorChange,
  onTemporaryColorChange,
}) {
  useEffect(() => {}, []);

  const handleClickChooseColor = event => {
    event.preventDefault();
    onColorChange(event.target.innerText);
    onTemporaryColorChange(event.target.innerText);
    toggleUserPalette();
  };

  return (
    <div className={style.Container}>
      <h2 className={style.Text}>Your color collection</h2>
      {colors && (
        <ul className={style.List}>
          {colors.map(color => (
            <li
              key={uuidv4()}
              className={style.Item}
              onClick={handleClickChooseColor}
            >
              <h2 className={style.ItemText}>{color}</h2>
              <div
                style={{
                  width: '15px',
                  height: '15px',
                  backgroundColor: color,
                  border: '1px solid #b6b6b4',
                }}
              ></div>
              {/* <X onClick={deleteColor(key)} /> */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
export default ModalPalette;
