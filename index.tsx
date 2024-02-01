import React, { useState, useEffect } from './React';
import render from './ReactDOM';

const FirstName = ({ firstName }) => <p>{firstName}</p>;

const App = () => {
  const [name, setName] = useState('Lee');
  const [count, setCount] = useState(0);
  const [firstName, setFirstName] = useState('');
  useEffect(() => {
    console.log('effect called');
    return () => console.log('effect cleared');
  }, []);
  useEffect(() => {
    let ignore = false;
    fetch('https://randomuser.me/api/?results=1')
      .then((res) => res.json())
      .then((res) => {
        if (!ignore) {
          setFirstName(res.results[0].name.first);
        }
      });
    return () => ignore = true;
  }, []);
  return (
    <div>
      <h1>Hi {name}</h1>
      <input
        type='text'
        value={name}
        oninput={(e) => setName(e.target.value)}
        placeholder='name'
      />
      <p>{count}</p>
      <button onclick={() => setCount(count + 1)}>+1</button>
      <FirstName firstName={ firstName } />
    </div>
  );
};

render(<App />, document.querySelector('#app'));
