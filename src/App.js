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

  // console.log(selectedNumber);
  return selectedNumber;
};

const App = () => {
  const [tries, setTries] = useState([]);
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const [answer, setAnswer] = useState(getNumbers);
  const inputRef = useRef(null);

  console.log(answer);
  // console.log(`answer: ${answer}`);
  // console.log(typeof answer[0]);

  //onChange={onChangeInput}

  const onSubmit = (e) => {
    e.preventDefault();

    console.log(`value: ${value}, value type = ${typeof value}`);
    // console.log(`result: ${result}`);

    console.log(
      `answer.join(): ${answer.join(
        ''
      )}, answer.join type: ${typeof answer.join('')}`
    );

    console.log(`value.split(''): ${value.split('')[0]}`);
    // console.log(value === answer);
    if (value === answer.join('')) {
      setResult(
        'Congratuation. You got the correct numbers, The game will be restarted'
      );

      setTimeout(() => {
        setResult('');
        setTries([]);
        setValue('');
        setAnswer(getNumbers);
      }, 3000);
    } else {
      let strike = 0;
      let ball = 0;
      for (let i = 0; i < answer.length; i++) {
        if (value.split('')[i] === answer[i]) {
          strike++;
        } else if (value.includes(answer[i])) {
          ball++;
        }
      }

      console.log(`strike: ${strike}`);
      console.log(`ball: ${ball}`);

      setTries((prevState) => [
        ...prevState,
        {
          userInput: value,
          resultState: `${strike} Strike and ${ball} Ball`,
        },
      ]);

      setValue('');

      inputRef.current.focus();
    }
  };

  const onChangeInput = (c) => {
    setValue(c.target.value);
  };

  return (
    <div className='App'>
      <p>{result}</p>

      <form onSubmit={onSubmit}>
        <input
          ref={inputRef}
          type='text'
          value={value}
          maxLength='4'
          onChange={onChangeInput}></input>
      </form>
      <div>{/* <span>Tries: {tries}</span> */}</div>
      <ul>
        {tries.map((v, i) => {
          return (
            <li key={i}>
              <p>{v.userInput}</p>
              <p>{v.resultState}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default App;
