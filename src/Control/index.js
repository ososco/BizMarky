import React, { Component } from "react";

class Control extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <div className="control">
        <form className="form-container">
          <div className="form-title">
            <strong>Add new bookmark</strong>
          </div>
          <div className="field-title-a">
            <strong>Name</strong>
          </div>
          <input
            className="form-field"
            type="text"
            name="name"
            placeholder="Name"
            value={this.props.nameInput}
            onChange={this.props.onChange}
          />
          <br />
          <div className="field-title-b">
            <strong>URL</strong>
          </div>
          <input
            className="form-field"
            type="text"
            name="url"
            placeholder="URL"
            value={this.props.urlInput}
            onChange={this.props.onChange}
          />
          <br />
          <div className="submit-container">
            <button
              className="submit-button"
              type="button"
              onClick={this.props.onSubmit}
            >
              Add
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Control;
