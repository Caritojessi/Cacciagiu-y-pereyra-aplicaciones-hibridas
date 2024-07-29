import { Route, Routes } from 'react-router-dom';
import './App.css';
import Welcome from './component/Welcome';
import InfoCity from './component/cities/InfoCity';
import InfoActivity from './component/activities/InfoActivity';
import NewTravel from './component/users/NewTravel';
import Recomendaciones from './component/activities/Recomendaciones';
import Nav from './component/Nav';
import Footer from './component/Footer';
import Agenda from './component/users/Diary'; 
import Register from './component/users/Register';
import Login from './component/users/Login';
import Contacto from './component/Contact';
import ProtectedRoutes from './utils/ProtectedRoutes';
import Funcionamiento from './component/info/HowToUse'
import SecurityInfo from './component/info/SecurityInfo';
import Descargar from './component/info/Download';
import Travels from './component/users/Travels';
import TravelDetail from './component/travelDetail/TravelDetail';
import UpdateSpends from './component/users/UpdateSpends';
import UpdateEvents from './component/users/UpdateEvents'
import UpdateTravel from './component/users/UpdateTravel';
import ModifySpend from './component/users/ModifySpend';
import Perfil from './component/users/Profile';
import StoragedTravels from './component/users/StoragedTravels'
import AdminRoutes from './utils/AdminRoutes';
import AddNewCity from './component/admin/AddNewCity';
import Admin from './component/admin/Admin';
import AddNewActivity from './component/admin/AddNewActivity';



function App() {

  return (
    <>
    <Nav/>
      <main className='mt-20'>
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
          <Route path='/viajes/archivados/:id' element={<StoragedTravels />} /> 
          <Route path='/viajes/detalle/:id' element={<TravelDetail />} /> 
          <Route path='/localidades/:nombre' element={<InfoCity />} />
          <Route path='/actividades/id/:id' element={<InfoActivity />} />
          <Route path='/viajes/nuevo-viaje' element={<NewTravel />} />
          <Route path='/registro-gastos/:id' element={<UpdateSpends />} /> 
          <Route path='/registro-eventos/:id' element={<UpdateEvents />} /> 
          <Route path='/modificar-gasto/:idViaje/:id' element={<ModifySpend />} /> 
          <Route path='/modificar/:id' element={<UpdateTravel />} /> 
          <Route path='/actividades/recomendaciones' element={<Recomendaciones />} />
          
          <Route element={<AdminRoutes />}>
              <Route path='/admin' element={<Admin />} />
              <Route path='/admin/nueva-ciudad' element={<AddNewCity />} />
              <Route path='/admin/nueva-actividad' element={<AddNewActivity />} />
          </Route>
        </Route>

      </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
