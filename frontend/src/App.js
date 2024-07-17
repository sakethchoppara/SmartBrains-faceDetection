import './App.css';
import { Routes,Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import Signin from './Components/Signin/Signin';
import Register from './Components/Register/Register';
import ParticlesBg from 'particles-bg'


function App() {
  return (
    <div className="App">
      <ParticlesBg color={['#FF5EDF','#04C8DE']}num={30} type="circle" bg={true} />
      <Routes>
          <Route path='/home' element={<Home/>} />
          <Route path='/signin' element={<Signin/>} />
          <Route path='/register' element={<Register/>} />
      </Routes>
    </div>
  );
}

export default App;
