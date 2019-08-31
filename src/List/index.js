import React, { Component } from "react";

class List extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <div className="list">
        <ul>
          {this.props.bookmarks.map((b, i) => (
            <li className="bookmark" key={i}>
              <a href={b.url} title={new Date(b.date)} target="_blank">
                {b.name}
              </a>
              <button
                className="delete"
                value={b.key}
                onClick={this.props.onRemove}
              >
                x
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default List;
