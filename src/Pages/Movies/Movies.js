import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../../config";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import './Movies.css';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API_URL}/movies`)
      .then(res => {
        setMovies(res.data);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        toast.error(error.message);
      });
  }, []);

  const deleteHandler = (id) => {
    axios.delete(`${API_URL}/movies/${id}`)
      .then(() => {
        toast.info("Movie Deleted");
        setMovies(prevState => prevState.filter(movie => movie.id !== id));
      })
      .catch(error => toast.error(error.message));
  };

  if (loading) {
    return (
      <Container>
        <div className="loading-spinner">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      </Container>
    );
  }

  return (
    <div id="movies-list">
      <Container>
        <h1>Movies:</h1>
        <Link className="movies-form-link" to="/MovieForm">
          <Button variant="secondary">Add new movie</Button>
        </Link>
        <div className="row">
          {movies.map(movie => (
            <div className="col-md-4 mb-4" key={movie.id}>
              <Card>
                <Card.Img variant="top" src={movie.movieImage} style={{ height: '200px', objectFit: 'cover' }} />
                <Card.Body>
                  <Card.Title>{movie.title} ({movie.year}) </Card.Title>
                    <Card.Text>{movie.body}</Card.Text>
                  <div className="d-grid gap-2">
                    <Link to={`/movies/${movie.id}`}>
                      <Button className="action-button" variant="primary">Go to Movie</Button>
                    </Link>
                    <Button className="action-button" variant="danger" onClick={() => deleteHandler(movie.id)}>Delete</Button>
                    <Link className="button" to={`/MovieForm/${movie.id}`}>
                      <Button className="action-button" variant="dark">Edit</Button>
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Movies;