import React, { Component } from 'react';
import Response from './Response.js';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
          fieldA: '',
          fieldB: '',
          outputA: '',
          outputB: '',
          response: ''
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

    fetchAPI = (fieldA, fieldB) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "sentence_one": fieldA,
                "sentence_two": fieldB
            })
        };
        return fetch('https://semanticsearchatscale.dmz.netflix.net/compare', requestOptions);
    }

    handleSubmission = event => {
        event.preventDefault();
        this.fetchAPI(this.state.fieldA, this.state.fieldB)
            .then(response => response.json())
            .then(result => { this.setState({ response: result }) })
            .catch(error => console.log(error))

        this.setState((prevState, props) => {
            return { fieldA: '', fieldB: '', outputA: prevState.fieldA, outputB: prevState.fieldB }
        });
    }

  render() {
      const { fieldA, fieldB, outputA, outputB, response } = this.state;

      return (
      <Container fluid>
          <Container id="content">
              <Row>
                  <Col md={{ span: 6, offset: 3 }} className="terminal-window">
                      <div className="header">
                          <div className="button green">&nbsp;</div>
                          <div className="button yellow">&nbsp;</div>
                          <div className="button red">&nbsp;</div>
                      </div>
                      <div className="terminal">
                          <div className="title">
                              <p className="highlight">
                                  Semantic Search Playground
                              </p>
                              <p className="content">

                                  enter two sentences and we'll run it through <br/>
                                  our API for you to see the magic happen
                              </p>
                          </div>
                          <Form>
                              <Form.Control
                                  type="text"
                                  placeholder="&#36; enter a sentence"
                                  value={ fieldA }
                                  onChange={ event => this.handleInputChange(event, "fieldA") }
                                  autoCapitalize="off"
                                  autoComplete="off"
                                  spellCheck="false"
                                  autoCorrect="off"
                              />
                              <Form.Control
                                  type="text"
                                  placeholder="&#36; enter another sentence"
                                  value={ fieldB }
                                  onChange={ event => this.handleInputChange(event, "fieldB") }
                                  autoCapitalize="off"
                                  autoComplete="off"
                                  spellCheck="false"
                                  autoCorrect="off"
                              />
                              <Button
                                  block
                                  variant="outline-light"
                                  onClick={ this.handleSubmission }
                              >&#36; run semantic-search</Button>
                          </Form>
                          <div className="response">
                              { response !== '' ? <Response response={ response } outputA={ outputA } outputB={ outputB }  /> : <p></p> }
                          </div>
                      </div>
                  </Col>
              </Row>
          </Container>
      </Container>
    );
  }
}

export default App;
