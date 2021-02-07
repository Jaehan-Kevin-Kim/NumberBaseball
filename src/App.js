import React, { useState, useRef } from 'react';

const getNumbers = () => {
  const candidateNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  console.log(`initial candidate numbers: ${candidateNumbers}`);
  const selectedNumber = [];
  for (let i = 0; i < 4; i++) {
    const selectedIndex = Math.floor(
      Math.random() * (candidateNumbers.length - i)
    );
    selectedNumber.push(candidateNumbers.splice(selectedIndex, 1).toString());
  }

  console.log(selectedNumber);
  return selectedNumber;
};

const App = () => {
  const [tries, setTries] = useState(0);
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const [answer, setAnswer] = useState(getNumbers);
  const inputRef = useRef(null);

  console.log(`answer: ${answer}`);
  console.log(typeof answer[0]);

  const onChangeInput = (c) => {
    setValue(c.target.value);
  };

  //onChange={onChangeInput}

  const onSubmit = (e) => {
    e.preventDefault();

    console.log(`value: ${value}`);

    inputRef.current.focus();
  };

  return (
    <div className='App'>
      <form onSubmit={onSubmit}>
        <input
          ref={inputRef}
          type='text'
          value={value}
          maxLength='4'
          onChange={onChangeInput}></input>
      </form>
      <div>
        <span>Tries: {tries}</span>
      </div>
      <ul>
        <li>
          <p>{value}</p>
          <p>{result}</p>
        </li>
      </ul>
    </div>
  );
};

export default App;
