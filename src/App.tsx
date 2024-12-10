import Router from './routes/route';
import { useRoutes } from "react-router-dom";
import './App.css';

function App() {
  const Routing=useRoutes(Router);
 return(
  //  <div className="container">
  //    <MainPage/>
  //   </div>
  <div >{Routing}</div>
 )
}
export default App