import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../../config";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import './Authors.css';

const Authors = () => {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API_URL}/authors?_embed=movies`)
      .then(res => {
        setAuthors(res.data);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        toast.error(error.message);
      });
  }, []);

  const deleteHandler = (id) => {
    axios.delete(`${API_URL}/authors/${id}`)
      .then(() => {
        toast.info("Author Deleted");
        setAuthors(prevState => prevState.filter(author => author.id !== id));
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
    <div id="authors-list">
      <Container>
        <h1>Authors:</h1>
        <Link className="authors-form-link" to="/AuthorForm">
          <Button variant="secondary">Add new author</Button>
        </Link>
        <div className="row">
          {authors.map(author => (
            <div className="col-md-4 mb-4" key={author.id}>
              <Card>
                <Card.Img variant="top" src={author.picture} style={{ height: '200px', objectFit: 'cover' }} />
                <Card.Body>
                  <Card.Title>{author.name}</Card.Title>
                  <div className="d-grid gap-2">
                    <Link to={`/authors/${author.id}`}>
                      <Button className="action-button" variant="primary">Go to Author</Button>
                    </Link>
                    <Button className="action-button" variant="danger" onClick={() => deleteHandler(author.id)}>Delete</Button>
                    <Link className="button" to={`/AuthorForm/${author.id}`}>
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

export default Authors;