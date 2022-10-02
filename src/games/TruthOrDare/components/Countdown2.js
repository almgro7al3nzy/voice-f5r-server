import React from 'react';
import { View, Text, TouchableOpacity,  } from 'react-native';// type Props = {
import Svg, { Circle } from 'react-native-svg';

class CountdownTimer extends React.Component {
  // milliseconds: number;
  // radius: number;
  // circumference: number;
  // strokeDashoffset: () => number;

  constructor(props) {
    super(props);

    this.milliseconds = this.props.seconds * 1000;
    this.radius = this.props.size / 2;
    this.circumference = this.props.size * Math.PI;

    this.state = {
      countdown: this.milliseconds,
      isPlaying: false,
    };

    this.strokeDashoffset = () =>
      this.circumference -
      (this.state.countdown / this.milliseconds) * this.circumference;
  }

  startTimer = () => {
    this.setState({ isPlaying: true });

    const interval = setInterval(() => {
      this.setState({ countdown: this.state.countdown - 10 });

      if (this.state.countdown === 0) {
        clearInterval(interval);
        this.setState({
          countdown: this.milliseconds,
          isPlaying: false,
        });
      }
    }, 10);
  };

  render() {
    const countdownSizeStyles = {
      height: this.props.size,
      width: this.props.size,
    };

    const textStyles = {
      color: this.props.strokeColor,
      fontSize: this.props.size * 0.3,
    };

    const seconds = (this.state.countdown / 1000).toFixed();

    

    return (
      <View style={{ position: 'absolute',
      zIndex: 2,
      // top: 100,
      // left: 50,
    
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    
      justifyContent: "center",
      alignItems: "center",
    
      backgroundColor: 'green', }}>
        <View
          style={{
            pointerEvents: this.state.isPlaying ? "none" : "all",
            opacity: this.state.isPlaying ? 0.4 : 1,
          }}
        >
          <TouchableOpacity
            style={styles.button}
            onPress={!this.state.isPlaying ? this.startTimer : () => {}}
          >
            <Text>START</Text>
          </TouchableOpacity>
        </View>
        <View
          style={Object.assign(
            {},
            styles.countdownContainer,
            countdownSizeStyles
          )}
        >
          <Text style={textStyles}>{seconds}s</Text>
          <Svg style={styles.Svg}>
            <Circle
              cx={this.radius}
              cy={this.radius}
              r={this.radius}
              fill="none"
              stroke={this.props.strokeBgColor}
              strokeWidth={this.props.strokeWidth}
            />
          </Svg>
          <Svg style={styles.Svg}>
            <Circle
              strokeDasharray={this.circumference}
              strokeDashoffset={
                this.state.isPlaying ? this.strokeDashoffset() : 0
              }
              r={this.radius}
              cx={this.radius}
              cy={this.radius}
              fill="none"
              strokeLinecap="round"
              stroke={this.props.strokeColor}
              strokeWidth={this.props.strokeWidth}
            />
          </Svg>
        </View>
      </View>
    );
  }
}

const styles = {
  countdownContainer: {
    // display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    // margin: "auto",
  },
  Svg: {
    position: "absolute",
    zIindex: 3,
    top: 0,
    left: 0,

    // width: "100%",
    // height: "100%",

    width: 500,
    height: 500,
    // transform: "rotateY(-180deg) rotateZ(-90deg)",
    transform: [ { rotateY: '-180deg' },  { rotateZ: '-90deg' } ],
    // overflow: "visible",
  },
  button: {
    fontSize: 16,
    // padding: "15px 40px",
    paddinHorizontal: 40,
    paddingVertical: 15,
    margin: 20,
    // margin: "10px auto 30px",
    // display: "block",
    backgroundColor: "#4d4d4d",
    color: "lightgray",
    // border: "none",
    // cursor: "pointer",
    // outline: 0,
  },
};


export default CountdownTimer;

// ReactDOM.render(
//   <View style={{
//       display: 'flex',
//         justifyContent: 'space-around', 
//           flexWrap: 'wrap'
//     }}>
//     <CountdownTimer 
//       seconds={60} 
//       size={80}
//       strokeBgColor="black"
//       strokeColor="lightblue"
//       strokeWidth={3}
//       />
//     <CountdownTimer 
//       seconds={15} 
//       size={60}
//       strokeBgColor="black"
//       strokeColor="lemonchiffon"
//       strokeWidth={2}
//       />
//     <CountdownTimer 
//       seconds={30} 
//       size={200}
//       strokeBgColor="black"
//       strokeColor="lightgreen"
//       strokeWidth={12}
//       />
//     <CountdownTimer 
//       seconds={10} 
//       size={90}
//       strokeBgColor="black"
//       strokeColor="lightcoral"
//       strokeWidth={4}
//       />
//     <CountdownTimer 
//       seconds={5} 
//       size={120}
//       strokeBgColor="black"
//       strokeColor="lavender"
//       strokeWidth={8}
//       />
//   </View>, 
//   document.getElementById('app')
// );