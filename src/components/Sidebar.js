import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { addDeck, showAddDeck, hideAddDeck } from '../actions';
import { Link } from 'react-router';
// var createReactClass = require('create-react-class');

const mapStateToProps = ({decks, addingDeck}) => ({
  decks,
  addingDeck
}); 

// Map dispatch function to 3 callbacks for Sidebar
const mapDispatchToProps = dispatch => ({
  addDeck: name => dispatch(addDeck(name)),
  showAddDeck: () => dispatch(showAddDeck()),
  hideAddDeck: () => dispatch(hideAddDeck())
});

class Sidebar extends React.Component{
  constructor(props) {
    super(props);
    this.createDeck = this.createDeck.bind(this);
  }
  componentDidUpdate() {
    var el = ReactDOM.findDOMNode(this.refs.add);
    if (el) el.focus();
  }
  render() {
    let props = this.props;
    return (
      <div className='sidebar'>
        <h2>All Decks </h2>
          <ul>
          {props.decks.map((deck, i) => 
            <li key={i}> 
            <Link to={`/deck/${deck.id}`}> {deck.name} </Link>
            </li>
          )}
          </ul>
        {/* if props.addingDeck than...*/}
          { props.addingDeck && <input ref='add' onKeyPress={this.createDeck} /> }
      </div>
    );
  }
  createDeck(evt) {
    const ENTER_KEY = 13;
    if (evt.which !== ENTER_KEY) return;
    
    // else Get the value of event (key pressed)
    var name = ReactDOM.findDOMNode(this.refs.add).value;
    this.props.addDeck(name);
    this.props.hideAddDeck();
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);