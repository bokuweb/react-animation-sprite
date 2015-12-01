import React, { Component } from 'react';

const FPS = 1000 / 60;
const requestAnimationFrame = window.requestAnimationFrame
                           || window.webkitRequestAnimationFrame
                           || window.mozRequestAnimationFrame
                           || window.msRequestAnimationFrame
                           || window.setTimeout;

const cancelAnimationFrame = window.cancelAnimationFrame
                          || window.mozCancelAnimationFrame
                          || window.webkitCancelAnimationFrame
                          || window.msCancelAnimationFrame;

export default class AnimationSprite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      frame: {
        row: 0,
        column: 0
      }
    }
    let image = new Image();
    image.src = this.props.src;
    image.onload = () => {
      this.row = image.width / this.props.width;
      this.column = image.height / this.props.height;
    }
  }

  update() {
    let {row, column} = this.state.frame;
    if (++row >= this.row) {
      row = 0;
      if (++column >= this.column) {
        column = 0;
        console.log("end");
        cancelAnimationFrame(this.timerId);
        this.timerId = null;
      }
    }
    this.setState({frame : {row, column}});
    if (this.timerId) requestAnimationFrame(this.update.bind(this), FPS);
  }

  start() {
    if (this.timerId) return;
    this.timerId = requestAnimationFrame(this.update.bind(this), FPS);
  }

  render() {
    const {width, height, src} = this.props;
    const {row, column} = this.state.frame;
    const style = {
      width,
      height,
      backgroundImage: `url(${src})`,
      backgroundPosition: `${row*width}px ${column*height}px`
    };
    return (
      <div style={style} onClick={this.props.onClick} />
    );
  }
}
