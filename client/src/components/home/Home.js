import './Home.css'
import { useEffect , useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [randomNum ,setRandomNum] = useState(null);

  useEffect(() => getRandomNum(), []);

  const getRandomNum = () => {
    const url = 'http://localhost:8080'
    axios.get(`${url}/randomnum`)
    .then (response => {
      setRandomNum(response.data.num)
    })
  }

  return (
    <div className="App">
      <p>Random Number</p>
      <p>{randomNum}</p>
    </div>
  );
}

export default Home;
