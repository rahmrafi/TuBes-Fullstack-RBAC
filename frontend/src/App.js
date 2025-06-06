import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Home from '.pagesHome';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';


function App() {
  return (
    <Router>
      <AuthProvider>
        <nav>
          <ul>
            <li><link to="/">Home</link></li>
            <li><link to="/login">Login</link></li>
            <li><link to="/dashboard">Dashboard</link></li>
            <li><link to="/admin">Admin Panel</link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" elemeent={<Home />} />
          <Route path="/login" elemeent={<Login />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
          <Route path='/admin' element={<PrivateRoute requiredRoles={['admin']}><Dashboard/></PrivateRoute>} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App;