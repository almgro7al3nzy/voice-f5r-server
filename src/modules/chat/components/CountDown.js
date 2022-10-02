/* eslint-disable */
import React from 'react'

class CountdownTimer extends React.Component {
    state = {
        secondsRemaining: 60
    }
    // displayName: 'CountdownTimer',
    getInitialState = () => {
        return {
            secondsRemaining: 0
        };
    }
    tick = () => {
        console.log(this.state)
        this.setState({ secondsRemaining: this.state.secondsRemaining - 1 });
        if (this.state.secondsRemaining <= 0) {
            clearInterval(this.interval);
            this.props.onCountEnd();
        }
    }
    componentDidMount() {
        this.setState({ secondsRemaining: this.props.secondsRemaining });
        this.interval = setInterval(this.tick, 1000);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    render() {
        return (
            React.DOM.span(null, '', this.state.secondsRemaining)
        );
    }

}

export default CountdownTimer
