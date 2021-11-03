import React, { Component } from 'react';
import { connect } from 'react-redux';
import StopwatchControls from './StopwatchControls';
import Timer from './Timer';
import LapList from './LapList';
import Lap from './Lap';
import FontAwesome from 'react-fontawesome';
import { convertToCentiSeconds } from '../helpers/helpers';

class App extends Component {

  state = {
    totalTime: 0,
    currentLapTime: 0
  };

  componentDidMount() {
    this.tick();
  }

  componentDidUpdate() {
    requestAnimationFrame(this.tick.bind(this));
  }

  tick() {
    if (this.props.started) {
      const now = convertToCentiSeconds(Date.now());
      const totalTime = now - this.props.started + this.props.recordedTime;
      this.setState({
        now,
        totalTime,
        currentLapTime: totalTime - this.props.lapTotal
      });
    } else {
      if (this.props.recordedTime !== this.state.totalTime) {
        this.setState({
          totalTime: this.props.recordedTime,
          currentLapTime: this.props.recordedTime - this.props.lapTotal
        });
      }
    }
  }

  render() {
    const {reset} = this.props;
    let boolreturn = false;
    if(reset) {
      boolreturn = true;
    }
    
    return (
      <div className="App">
        <h1 className="app__title">{this.props.taskName}</h1>
        <Timer label={'Total'} time={this.state.totalTime} />
        <StopwatchControls reset={boolreturn}/>
        <Lap label={`Lap #${this.props.laps.length + 1}`} time={this.state.currentLapTime} />
        <LapList />
        <a className="app__github" target="_blank" href="https://github.com/third774/react-stopwatch"><FontAwesome name="github" size='2x'/></a>
      </div>
    );
  }

}

export default connect(store => store)(App);
