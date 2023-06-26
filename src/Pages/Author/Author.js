import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../config";

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

const Author = () => {
  const [author, setAuthor] = useState([]);
  const { id } = useParams();
  let movies = "";
  let reviews = "";

  useEffect(() => {
    axios.get(`${API_URL}/authors/${id}/?_embed=movies&_embed=reviews`)
      .then(res => setAuthor(res.data));
  }, [id]);

  if (author.length === 0) {
    return "";
  }

  const name = <ListGroup.Item><b>Name:</b> {author.name}</ListGroup.Item>;
  const nick = <ListGroup.Item><b>Nick:</b> {author.username}</ListGroup.Item>;
  const email = <ListGroup.Item><b>Email:</b> {author.email}</ListGroup.Item>;

  const authorData = (
    <Card>
      <Card.Header>Author</Card.Header>
      <Card.Body>
        <ListGroup variant="flush">
          {name}
          {nick}
          {email}
        </ListGroup>
      </Card.Body>
    </Card>
  );

  if (author.movies.length > 0) {
    movies = author.movies.map(element => (
      <ListGroup.Item key={element.id}>
        <Link to={`/Movies/${element.id}`}>Title: {element.title}</Link>
      </ListGroup.Item>
    ));
  } else {
    movies = <ListGroup.Item>Empty</ListGroup.Item>;
  }

  if (author.reviews.length > 0) {
    reviews = author.reviews.map(element => (
      <ListGroup.Item key={element.id}>
        <Link to={`/Reviews/${element.id}`}>Title: {element.body}</Link>
      </ListGroup.Item>
    ));
  } else {
    reviews = <ListGroup.Item>Empty</ListGroup.Item>;
  }

  return (
    <Container>
      <h1>Author</h1>
      <div id="author-data">
        {authorData}
        <div>
          <h2>Movies:</h2>
          <ListGroup>{movies}</ListGroup>
        </div>
        <div>
          <h2>Reviews:</h2>
          <ListGroup>{reviews}</ListGroup>
        </div>
      </div>
    </Container>
  );
}

export default Author;