import { useState } from 'react';
import Navbar from './Component/Navbar/Navbar';
import Home from './Component/Home/home';
import AddStudent from './Component/Add/Add';
import EditStudent from './Component/Edit/Edit';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './Component/Footer/Footer';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/saveStudent" element={<AddStudent />} />
          <Route path="/editStudent/:id" element={<EditStudent />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
