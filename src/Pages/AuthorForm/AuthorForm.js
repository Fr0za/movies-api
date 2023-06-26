import { useEffect, useState } from "react";
import { API_URL } from "../../config";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const AuthorForm = () => {
  const [author, setAuthor] = useState("");
  const authorId = useParams().id;
  const navigate = useNavigate();

  useEffect(() => {
    if (authorId) {
      axios.get(`${API_URL}/authors/${authorId}`)
        .then(res => setAuthor(res.data));
    }
  }, [authorId]);

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [picture, setPicture] = useState('');

  const [buttonText, setButtonText] = useState("Create new author");

  const nameHandler = event => setName(event.target.value);
  const usernameHandler = event => setUsername(event.target.value);
  const emailHandler = event => setEmail(event.target.value);
  const pictureHandler = event => setPicture(event.target.value);

  useEffect(() => {
    if (author) {
      setButtonText("Save")
      const { name, username, email, picture } = author
      setName(name)
      setUsername(username);
      setEmail(email);
      setPicture(picture);
    }
  }, [author]);

  const newAuthorHandler = (event) => {
    event.preventDefault();
    const newAuthor = {
      name,
      username,
      email,
      picture
    }
    if (author) {
      axios.put(`${API_URL}/authors/${authorId}`, newAuthor)
        .then(() => {
          toast.success("Author Edited");
          navigate('/Authors');
        })
        .catch(res => toast.error(res.message));
    } else {
      axios.post(`${API_URL}/authors`, newAuthor)
        .then(() => toast.info("Author Created"))
        .catch(res => toast.error(res.message));
      setName("");
      setUsername('');
      setEmail('');
      setPicture('');
    }
  }

  return (
    <Container>
      <div className="user-form-wrapper">
        <h1 className="user-data-form">Author Data</h1>
        <Form className="user-form" onSubmit={newAuthorHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name:</Form.Label>
            <Form.Control type="text" value={name} onChange={nameHandler} />
          </Form.Group>
          <Form.Group controlId="username">
            <Form.Label>Username:</Form.Label>
            <Form.Control type="text" value={username} onChange={usernameHandler} />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email:</Form.Label>
            <Form.Control type="email" value={email} onChange={emailHandler} />
          </Form.Group>
          <Form.Group controlId="picture">
            <Form.Label>Picture:</Form.Label>
            <Form.Control type="url" value={picture} onChange={pictureHandler} />
          </Form.Group>
          <Button variant="primary" type="submit">
            {buttonText}
          </Button>
        </Form>
        <Link className="user-form-link" to="/Authors">Back to authors page</Link>
      </div>
    </Container>
  );
}

export default AuthorForm;
