import React, { Component } from "react";

class List extends Component {
  constructor() {
    super();
    this.state = {
      bookmarks: [
        { id: 1, name: "Bookmark 1", url: "#", date: "2f" },
        { id: 2, name: "Bookmark 2", url: "#df", date: "aef" }
      ]
    };
  }
  render() {
    return (
      <div className="list">
        <ul>
          {this.props.bookmarks.map((b, i) => (
            <li className="bookmark" key={i}>
              <a href={b.url} title={b.date} target="_blank">
                {b.name}
              </a>
              <button
                className="delete"
                value={b.url}
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
