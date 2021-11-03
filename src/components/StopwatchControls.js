import React, { Component } from 'react';
import { connect } from 'react-redux';
import { startTimer, stopTimer, addLap, resetTimer } from '../actions/actions';
import FontAwesome from 'react-fontawesome';
import { convertToCentiSeconds } from '../helpers/helpers';

export class StopwatchControls extends Component {

  componentDidMount() {
    const { started, dispatch } = this.props;
    dispatch(startTimer(convertToCentiSeconds(Date.now())))
  }

  render() {
    const { started, dispatch } = this.props;
    if (started) {
      return (
        <div className="stopwatch-controls">
          <button className="button button--red" onClick={() => dispatch(stopTimer(convertToCentiSeconds(Date.now())))}>
            <FontAwesome className="fa-fw" name='square' /> Stop
          </button>
          <button className="button button--blue" onClick={() => dispatch(addLap(convertToCentiSeconds(Date.now())))}>
            <FontAwesome className="fa-fw" name='refresh' /> Lap
          </button>
        </div>
      )
    } else {
      return (
        <div className="stopwatch-controls">
          <button className="button button--green" onClick={() => dispatch(startTimer(convertToCentiSeconds(Date.now())))}>
            <FontAwesome className="fa-fw" name='play' /> Start
          </button>
          <button className="button button--red" onClick={() => dispatch(resetTimer())}>
            <FontAwesome className="fa-fw" name='trash' /> Reset
          </button>
        </div>
      )
    }
  }
}

export default connect(state => {
  return {
    dispatch: state.dispatch,
    started: state.started
  };
})(StopwatchControls);
