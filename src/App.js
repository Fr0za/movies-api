import { Routes, Route, Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';

import Card from './Components/Card/Card';
import PageHeader from './Components/PageHeader/PageHeader';
import PageFooter from './Components/PageFooter/PageFooter';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';


import Home from './Pages/Home/Home';
import Authors from './Pages/Authors/Authors';
import Author from './Pages/Author/Author';
import AuthorForm from './Pages/AuthorForm/AuthorForm';
import Movies from './Pages/Movies/Movies';


function App() {
  return (
    <div className='App'>
      <Container>
        <PageHeader />
      </Container>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/authors' element={<Authors />} />
        <Route path='/authors/:id' element={<Author />} />
        <Route path='/authorform' element={<AuthorForm />} />
        <Route path='/authorform/:id' element={<AuthorForm />} />
        <Route path='/movies' element={<Movies />} />


        <Route path='*' element={
          <Container>
            <Card>
              <h1>Page not found</h1>
              <Link to='/'>Go Back to home page</Link>
            </Card>
          </Container>
        } />
      </Routes>

      <ToastContainer 
        position="top-right"
        autoClose={4000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="colored"
      />

      <Container>
        <PageFooter />
      </Container>

    </div>
  );
}

export default App;