// type Props = {
//   seconds: number;
//   size: number;
//   strokeBgColor: string;
//   strokeColor: string;
//   strokeWidth: number;
// };

// type State = {
//   countdown: number;
//   isPlaying: boolean;
// };

// class CountdownTimer extends React.Component<Props, State> {
//   milliseconds: number;
//   radius: number;
//   circumference: number;
//   strokeDashoffset: () => number;

//   constructor(props: Props) {
//     super(props);

//     this.milliseconds = this.props.seconds * 1000;
//     this.radius = this.props.size / 2;
//     this.circumference = this.props.size * Math.PI;

//     this.state = {
//       countdown: this.milliseconds,
//       isPlaying: false,
//     };

//     this.strokeDashoffset = () =>
//       this.circumference -
//       (this.state.countdown / this.milliseconds) * this.circumference;
//   }

//   startTimer = () => {
//     this.setState({ isPlaying: true });

//     const interval = setInterval(() => {
//       this.setState({ countdown: this.state.countdown - 10 });

//       if (this.state.countdown === 0) {
//         clearInterval(interval);
//         this.setState({
//           countdown: this.milliseconds,
//           isPlaying: false,
//         });
//       }
//     }, 10);
//   };

//   render() {
//     const countdownSizeStyles = {
//       height: this.props.size,
//       width: this.props.size,
//     };

//     const textStyles = {
//       color: this.props.strokeColor,
//       fontSize: this.props.size * 0.3,
//     };

//     const seconds = (this.state.countdown / 1000).toFixed();

//     return (
//       <div>
//         <div
//           style={{
//             pointerEvents: this.state.isPlaying ? "none" : "all",
//             opacity: this.state.isPlaying ? 0.4 : 1,
//           }}
//         >
//           <button
//             style={styles.button}
//             onClick={!this.state.isPlaying ? this.startTimer : () => {}}
//           >
//             START
//           </button>
//         </div>
//         <div
//           style={Object.assign(
//             {},
//             styles.countdownContainer,
//             countdownSizeStyles
//           )}
//         >
//           <p style={textStyles}>{seconds}s</p>
//           <svg style={styles.svg}>
//             <circle
//               cx={this.radius}
//               cy={this.radius}
//               r={this.radius}
//               fill="none"
//               stroke={this.props.strokeBgColor}
//               strokeWidth={this.props.strokeWidth}
//             ></circle>
//           </svg>
//           <svg style={styles.svg}>
//             <circle
//               strokeDasharray={this.circumference}
//               strokeDashoffset={
//                 this.state.isPlaying ? this.strokeDashoffset() : 0
//               }
//               r={this.radius}
//               cx={this.radius}
//               cy={this.radius}
//               fill="none"
//               strokeLinecap="round"
//               stroke={this.props.strokeColor}
//               strokeWidth={this.props.strokeWidth}
//             ></circle>
//           </svg>
//         </div>
//       </div>
//     );
//   }
// }

// const styles = {
//   countdownContainer: {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     position: "relative",
//     margin: "auto",
//   },
//   svg: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     width: "100%",
//     height: "100%",
//     transform: "rotateY(-180deg) rotateZ(-90deg)",
//     overflow: "visible",
//   } as React.CSSProperties,
//   button: {
//     fontSize: 16,
//     padding: "15px 40px",
//     margin: "10px auto 30px",
//     display: "block",
//     backgroundColor: "#4d4d4d",
//     color: "lightgray",
//     border: "none",
//     cursor: "pointer",
//     outline: 0,
//   },
// };

// ReactDOM.render(
//   <div style={{
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
//   </div>, 
//   document.getElementById('app')
// );