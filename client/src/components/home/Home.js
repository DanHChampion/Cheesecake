import './Home.css'
import { useEffect , useState } from 'react';
import apiRequest from '../hooks/apiRequest.js';

const Home = () => {
  const [randomNum ,setRandomNum] = useState(null);

  useEffect(() => getRandomNum(), []);

  const getRandomNum = () => {
    apiRequest().get('randomnum', (res, err) => {
			if(!err) {
        console.log(res.data);
				setRandomNum(res.data.num);
			}
		});
  }

  return (
    <div className="App">
      <p>Random Number</p>
      <p>{randomNum}</p>
    </div>
  );
}

export default Home;
