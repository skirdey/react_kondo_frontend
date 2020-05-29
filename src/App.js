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
          <div>
              <h1><span>&lt;</span>semantic-similarity<span>/&gt;</span></h1>
              <p className="desc">
                Playground front-end written as demonstration of the concepts introduced in the article
                "Semantic Similarity Search at Scale" published <a href="#" target="_blank">here</a>
              </p>
          </div>

          <Container id="content">
              <Row>
                  <Col
                      xs={{ span: 12 }}
                      md={{ span: 10, offset: 1 }}
                      lg={{ span: 6, offset: 3 }}
                      className="terminal-window"
                  >
                      <div className="header">
                          <div className="button">&nbsp;</div>
                          <div className="button">&nbsp;</div>
                          <div className="button">&nbsp;</div>
                      </div>
                      <div className="terminal">
                          <div className="title">
                              <p className="highlight">
                                  <span>Semantic Similarity Playground</span>
                              </p>
                              <p className="content">
                                  Submit two sentences and we'll run it through
                                  our magical API that will show if the sentences
                                  share semantic similarity.
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
                              >&#36; run semantic-similarity</Button>
                          </Form>
                          <div>
                              { response !== '' ? <Response
                                  response={ response }
                                  outputA={ outputA }
                                  outputB={ outputB }
                              /> : <span>&nbsp;</span> }
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
