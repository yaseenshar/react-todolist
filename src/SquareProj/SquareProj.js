import React, { useState } from 'react'
import Square from './Square';
import Input from './Input';
import './SquareProj.css';

const SquareProj = () => {

  const [colorValue, setColorValue] = useState('');
  const [hexValue, setHexValue] = useState('');
  const [isDarkColor, setIsDarkValue] = useState(true);
  return (
    <div className='square-proj'>
      <Square colorValue={colorValue} hexValue={hexValue} isDarkColor={isDarkColor}/>
      <Input colorValue={colorValue} 
        setColorValue={setColorValue} 
        hexValue={hexValue} 
        setHexValue={setHexValue} 
        isDarkColor={isDarkColor}
        setIsDarkValue={setIsDarkValue} />
    </div>
  )
}

SquareProj.defaultProps = {
    SquareHeading: ''
}

export default SquareProj;