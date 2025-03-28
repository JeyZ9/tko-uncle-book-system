import { useState } from 'react';
import './App.css'
import { useEffect } from 'react';
import { getAllMenu } from './fetch/fetchMenu';
import { Link } from 'react-router-dom';
import Navbar from './components/Navbar';

function App(props) {
  const {images} = props
  const [ menu, setMenu ] = useState([]);
  useEffect(() => {
    setMenu(getAllMenu())
  },[])

  return (
    <div className='container'>
      <Navbar />
      <main className='main'>
        {menu.map((item) => 
          <div key={item.id} className={`box box-${item.id}`}>
            <img className='menuImg' src={images[`/src/assets/images/${item.imagePath}`]?.default} alt="" />
            <div className="container-description">
              <div className="box-description">
                <h2 className='description'>{item.description}</h2>
                <Link to={`/shop/${item.description}/${item.id}`} className='shop-btn'>Read more</Link>
              </div>
            </div>
          </div>
        )}
        {/* <div className="box box-3">
          <img src={hot} alt="" />
        </div>

        <div className="box box-2">
          <img src={myself} alt="" />
        </div> */}
      </main>
    </div>
  )
}

export default App
