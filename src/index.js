import React from "react";
import ReactDOM from "react-dom";
import firebase from "firebase/app";
import "firebase/database";

import { config } from "./Firebase";

import List from "./List";
import Control from "./Control";

import "./styles.css";

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const database = firebase.database();

function snapshotToArray(snapshot) {
  let returnArr = [];
  snapshot.forEach(childSnapshot => {
    let item = childSnapshot.val();
    item.key = childSnapshot.key;

    returnArr.push(item);
  });
  return returnArr;
}

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
      date: new Date().getTime()
    };
    this.setState(state => {
      const bookmarks = [...this.state.bookmarks, bookmark];
      return {
        bookmarks,
        name: "",
        url: ""
      };
    });

    database.ref("bookmarks/").push(bookmark);
  };

  handleRemove = e => {
    this.setState({
      bookmarks: this.state.bookmarks.filter(b => b.url !== e.target.value)
    });
    database
      .ref("bookmarks/")
      .child(e.target.value)
      .remove();
  };

  componentDidMount() {
    database.ref("bookmarks/").on("value", snapshot => {
      this.setState({ bookmarks: snapshotToArray(snapshot) });
    });
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
