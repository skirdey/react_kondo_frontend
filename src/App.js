import React, { Component } from 'react';
import './App.css';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
          fieldA: '',
          fieldB: ''
        };

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
    };

    handleSubmission = event => {
        event.preventDefault();
        this.setState((prevState, props) => {
            return { fieldA: '', fieldB: '' }
        });
    };

  render() {
      const { fieldA, fieldB } = this.state;

      return (
      <div className="kondo-playground">
        kondo-playground
        <form>
          <input
              type="text"
              value={ fieldA }
              onChange={ event => this.handleInputChange(event, "fieldA") }
          />
          <input
              type="text"
              value={ fieldB }
              onChange={ event => this.handleInputChange(event, "fieldB") }
          />
          <button
              onClick={ this.handleSubmission }
          >
            search
          </button>
        </form>
      </div>
    );
  }
}

export default App;
