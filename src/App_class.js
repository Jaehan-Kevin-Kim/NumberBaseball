import { Component } from 'react';
import List from './List';

function getNumbers() {
  const candidateNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  console.log(`initial candidate numbers: ${candidateNumbers}`);
  const selectedNumber = [];
  for (let i = 0; i < 4; i++) {
    const selectedIndex = Math.floor(
      Math.random() * (candidateNumbers.length - i)
    );
    selectedNumber.push(candidateNumbers.splice(selectedIndex, 1).toString());
  }

  return selectedNumber;
}

class App extends Component {
  state = {
    tries: [],
    value: '',
    result: '',
    answer: getNumbers(),
  };

  //   const [tries, setTries] = useState([]);
  //   const [value, setValue] = useState('');
  //   const [result, setResult] = useState('');
  //   const [answer, setAnswer] = useState(getNumbers);
  //   const inputRef = useRef(null);

  input;

  inputRef = (c) => {
    this.input = c;
  };

  onSubmit = (e) => {
    e.preventDefault();

    console.log(
      `value: ${this.state.value}, value type = ${typeof this.state.value}`
    );

    console.log(
      `answer.join(): ${this.state.answer.join(
        ''
      )}, answer.join type: ${typeof this.state.answer.join('')}`
    );

    console.log(`value.split(''): ${this.state.value.split('')[0]}`);
    if (this.state.value === this.state.answer.join('')) {
      this.setState({
        result:
          'Congratuation. You got the correct numbers, The game will be restarted',
      });

      setTimeout(() => {
        this.setState({
          result: '',
          tries: [],
          value: '',
          answer: getNumbers(),
        });
      }, 3000);
    } else {
      if (this.state.tries.length < 9) {
        let strike = 0;
        let ball = 0;

        for (let i = 0; i < this.state.answer.length; i++) {
          if (this.state.value.split('')[i] === this.state.answer[i]) {
            strike++;
          } else if (this.state.value.includes(this.state.answer[i])) {
            ball++;
          }
        }

        console.log(`strike: ${strike}`);
        console.log(`ball: ${ball}`);

        this.setState((prevState) => {
          return {
            tries: [
              ...prevState.tries,
              {
                userInput: this.state.value,
                try: this.state.tries.length + 1,
                resultState: `${strike} Strike and ${ball} Ball`,
              },
            ],
          };
        });
      } else {
        this.setState({
          result: 'You are failed to find correct numbers. Please try again.',
          tries: [],
          answer: getNumbers,
        });
      }

      this.input.focus();
      this.setState({
        value: '',
      });

      this.input.focus();
    }
  };

  onChangeInput = (c) => {
    this.setState({ value: c.target.value });
  };

  input;

  render() {
    console.log(this.state.answer);
    return (
      <div className='App'>
        <p>{this.state.result}</p>

        <form onSubmit={this.onSubmit}>
          <input
            ref={this.inputRef}
            type='text'
            value={this.state.value}
            maxLength='4'
            onChange={this.onChangeInput}></input>
        </form>
        <div>
          <h3>Number of Tries: {this.state.tries.length}</h3>
        </div>
        <ul>
          {this.state.tries.map((v, i) => {
            return <List key={`${i} try`} tryInfo={v} />;
          })}
        </ul>
      </div>
    );
  }
}

export default App;
