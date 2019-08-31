import React from "react";
import ReactDOM from "react-dom";

import List from "./List";
import Control from "./Control";

import "./styles.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookmarks: [{ id: 1, name: "Bookmark 1", url: "#" }]
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    const bookmark = {
      name: this.state.name,
      url: this.state.url,
      date: new Date()
    };
    this.setState(state => {
      const bookmarks = [...this.state.bookmarks, bookmark];
      return {
        bookmarks,
        name: "",
        url: ""
      };
    });

    fetch(
      "https://jsonstorage.net/api/items/acae24a2-0658-46d0-a154-065ab3d5cd5f",
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify([...this.state.bookmarks, bookmark])
      }
    ).catch(function(res) {
      console.log(res);
    });
  };

  handleRemove = e => {
    this.setState({
      bookmarks: this.state.bookmarks.filter(b => b.url !== e.target.value)
    });

    fetch(
      "https://jsonstorage.net/api/items/acae24a2-0658-46d0-a154-065ab3d5cd5f",
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(
          this.state.bookmarks.filter(b => b.url !== e.target.value)
        )
      }
    ).catch(function(res) {
      console.log(res);
    });
  };

  componentDidMount() {
    fetch(
      "https://jsonstorage.net/api/items/acae24a2-0658-46d0-a154-065ab3d5cd5f"
    )
      .then(res => res.json())
      .then(data => this.setState({ bookmarks: data }));
  }

  render() {
    return (
      <div className="App">
        <Control
          onSubmit={this.handleSubmit}
          onChange={this.handleChange}
          nameInput={this.state.name}
          urlInput={this.state.url}
        />
        <List bookmarks={this.state.bookmarks} onRemove={this.handleRemove} />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
