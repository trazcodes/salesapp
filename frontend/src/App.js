import './App.css';
import Header from './components/common/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddSale from './components/AddSale';
import TopSale from './components/TopSale';
import Login from './components/Login';
import Logout from './components/Logout';
import Register from './components/Register';
import Revenue from './components/Revenue';
import PrivateRoute from './components/common/PrivateRoute';


function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes >
          <Route path="/" element={<Login />} index={true} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          {/* ============PRIVATE ROUTE=============== */}
          <Route path='/user' element={<PrivateRoute />} >
            <Route path='addsale' element={<AddSale />} />
            <Route path='topsale' element={<TopSale />} />
            <Route path='revenue' element={<Revenue />} />
            <Route path='logout' element={<Logout />} />
          {/* ========================================= */}
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
