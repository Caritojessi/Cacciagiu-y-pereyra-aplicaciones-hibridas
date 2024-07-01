// App.jsx
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Welcome from './component/Welcome';
import InfoCity from './component/cities/InfoCity';
import InfoActivity from './component/activities/InfoActivity';
import NewTravel from './component/users/NewTravel';
import Recomendaciones from './component/activities/Recomendaciones';
import Nav from './component/Nav';
import Footer from './component/Footer';
import Agenda from './component/users/Agenda'; // Importa el componente Agenda
import Register from './component/users/Register';
import Login from './component/users/Login';
import Contacto from './component/Contacto';
import ProtectedRoutes from './utils/ProtectedRoutes';
import Funcionamiento from './component/info/Funcionamiento'
import SecurityInfo from './component/info/SecurityInfo'
import Descargar from './component/info/Descargar'
import Travels from './component/users/Travels'
import TravelDetail from './component/travelDetail/TravelDetail';
import UpdateSpends from './component/users/UpdateSpends';
import UpdateEvents from './component/users/UpdateEvents'
import UpdateTravel from './component/users/UpdateTravel';
import ModifySpend from './component/users/ModifySpend';
import Perfil from './component/users/Perfil';



function App() {

  return (
    <>
    <Nav/>
      <main className='mt-16'>
      <Routes>
        {/* Rutas accesibles para cualquier usuario*/}

        <Route path='/' element={<Welcome />} />
        <Route path='/login' element={<Login />} />
        <Route path='/registro' element={<Register />} />
        <Route path='/contacto' element={<Contacto />} />
        <Route path='/funcionamiento' element={<Funcionamiento />} />
        <Route path='/seguridad' element={<SecurityInfo />} />
        <Route path='/descargar' element={<Descargar />} />

        {/* Rutas accesibles para el usuario registrado y autenticado */}

        <Route element={<ProtectedRoutes/>}>
          <Route path='/inicio' element={<Agenda />} /> 
          <Route path='/perfil' element={<Perfil/>}></Route>
          <Route path='/viajes/:id' element={<Travels />} /> 
          <Route path='/viajes/detalle/:id' element={<TravelDetail />} /> 
          <Route path='/localidades/:nombre' element={<InfoCity />} />
          <Route path='/actividades/id/:id' element={<InfoActivity />} />
          <Route path='/viajes/nuevo-viaje' element={<NewTravel />} />
          <Route path='/registro-gastos/:id' element={<UpdateSpends />} /> 
          <Route path='/registro-eventos/:id' element={<UpdateEvents />} /> 
          <Route path='/modificar-gasto/:id' element={<ModifySpend />} /> 
          <Route path='/modificar/:id' element={<UpdateTravel />} /> 
          <Route path='/actividades/recomendaciones' element={<Recomendaciones />} />
        </Route>

      </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
