import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Home from './pages/Home';
import { AuthProvider } from './store_UseContext/Auth';
import CreatePost from './pages/CreateBlog';
import PrivateRoute from './PrivateRoute';
import Loader from './pages/LoadingPage';
import ErrorPage from './pages/ErrorPage';
import Navbar from './components/Navbar';
import DetailView from './components/Details/DetailView';
import UpdatePost from './pages/UpdateBlog';
import Posts from './pages/Post';


const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <MainContent />
      </BrowserRouter>
    </AuthProvider>
  );
};

const MainContent = () => {
  const location = useLocation();
  const showNavbar = !['/login', '/signup'].includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/load" element={<Loader />} /> */}
        <Route path="*" element={<ErrorPage />} />
        <Route
          path="/createpost"
          element={
            <PrivateRoute>
              <CreatePost />
            </PrivateRoute>
          }
        />
        <Route
          path="/"
          element={
              <Home />
          }
        />
        <Route
          path="/Home"
          element={
          
              <Home />
        
          }
        />
        <Route
          path="/Details/:id"
          element={
            <PrivateRoute>
              <DetailView/>
            </PrivateRoute> 
          }
        />
        <Route
          path="/Details/:id/edit"
          element={
            <PrivateRoute>
              <UpdatePost/>
            </PrivateRoute>
          }
        />
       
       <Route
          path="/Posts"
          element={
            // <PrivateRoute>
              <Posts/>
            // </PrivateRoute>
          }
        />
      </Routes>
      
      
     
    </>
  );
};

export default App;
