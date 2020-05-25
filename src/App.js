import React, { Component } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
          fieldA: '',
          fieldB: '',
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

      return (
      <Container fluid>
          <Container id="content">
              <Row>
                  <Col md={{ span: 6, offset: 3 }} className="terminal">
                      <h5>Kondo Playground</h5>
                      <p>
                          go ahead, enter two sentences and we'll run it through kondo api so you can see the magic happen
                      </p>
                      <Form>
                          <Form.Control
                              type="text"
                              value={ fieldA }
                              onChange={ event => this.handleInputChange(event, "fieldA") }
                              autocapitalize="off"
                              autocomplete="off"
                              spellcheck="false"
                              autocorrect="off"
                          />
                          <Form.Control
                              type="text"
                              value={ fieldB }
                              onChange={ event => this.handleInputChange(event, "fieldB") }
                              autocapitalize="off"
                              autocomplete="off"
                              spellcheck="false"
                              autocorrect="off"
                          />
                          <Button
                              block
                              variant="outline-light"
                              onClick={ this.handleSubmission }
                          ><small>&#36;</small> run kondo search</Button>
                      </Form>
                      <div className="response">
                          <code>
                              &#123;
                              "sentence_meta"&#58; &#123;<br/>
                              "angle"&#58; 42.93550485861645,<br/>
                              "levenshtein_distance"&#58; 8.0,<br/>
                              "same_bucket"&#58; true<br/>
                              &#125;
                              &#125;
                          </code>
                      </div>
                  </Col>
              </Row>
          </Container>
      </Container>
    );
  }
}

export default App;
