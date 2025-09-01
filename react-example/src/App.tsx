import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";
import NavBarLayout from "./layouts/NavBar";
import RoomsPage from "./pages/RoomsPage";
import EmployeesPage from "./pages/EmployeePage";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage";
import RegisterEmployeePage from "./pages/RegisterEmployeePage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path="/" element={<LoginPage />}/>
      <Route element={<NavBarLayout/>} >
      <Route
        path='/home'
        element={
          <ProtectedRoute>
            <HomePage/>
          </ProtectedRoute>
        }
      />
      <Route 
        path="/rooms" 
        element={
          <ProtectedRoute>
            <RoomsPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/users" 
        element={
          <ProtectedRoute requiredRole="admin">
            <EmployeesPage />
          </ProtectedRoute>
        } 
      />
      <Route
        path='/registeruser'
        element={
          <ProtectedRoute requiredRole="admin">
            <RegisterEmployeePage/>
          </ProtectedRoute>
        }
      />
      
      <Route path="*" element={<NotFoundPage />} />
    </Route>
    </>
  )
);

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;