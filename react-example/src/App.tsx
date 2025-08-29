import { Route,createBrowserRouter,createRoutesFromElements,RouterProvider } from "react-router-dom";
import HomePage from './pages/HomePage';
import NotFoundPage from "./pages/NotFoundPage";
import NavBarLayout from "./layouts/NavBar";
import RoomsPage from "./pages/RoomsPage";
import EmployeesPage from "./pages/EmployeePage";
import { ThemeProvider } from "./context/ThemeContext";

const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<NavBarLayout/>}>
    <Route index element={<HomePage/>} />
    <Route path='/rooms' element={<RoomsPage/>}/>
    <Route path='/users' element={<EmployeesPage/>}/>
    <Route path='*' element={<NotFoundPage/>}/>
    </Route>
  )
)

const App = () => {
  return (
  <ThemeProvider>
    <RouterProvider router={router}/>
  </ThemeProvider>
  );
}

export default App