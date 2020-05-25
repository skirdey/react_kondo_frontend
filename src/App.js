import React, { Component } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
          fieldA: '',
          fieldB: ''
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmission = this.handleSubmission.bind(this);
    }

    handleInputChange = (event, field) => {
        let inputValue = event.target.value;

        this.setState((prevState, props) => {
            if(field === "fieldA") {
                return { fieldA: inputValue }
            } else {
                return { fieldB: inputValue }
            }
        });
    }

    handleSubmission = event => {
        event.preventDefault();
        this.setState((prevState, props) => {
            return { fieldA: '', fieldB: '' }
        });
    }

  render() {
      const { fieldA, fieldB } = this.state;

      let request_json = {
          "sentence_one":"I am flying a car",
          "sentence_two":"I am flying a helicopter"
      }

      let response_json = {
          "sentence_meta": {
          "angle": 42.93550485861645,
              "levenshtein_distance": 8.0,
              "same_bucket": true
            }
      }

      return (
      <Container fluid>
          <Container>
              <Row>
                  <Col>
                      <Form>
                          <Form.Control
                              type="text"
                              value={ fieldA }
                              onChange={ event => this.handleInputChange(event, "fieldA") }
                          />
                          <Form.Control
                              type="text"
                              value={ fieldB }
                              onChange={ event => this.handleInputChange(event, "fieldB") }
                          />
                          <Button
                              onClick={ this.handleSubmission }
                          >Search</Button>
                      </Form>
                  </Col>
              </Row>
          </Container>
      </Container>
    );
  }
}

export default App;
