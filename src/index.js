import React, {Component, PropTypes} from 'react';
import assign from 'lodash.assign';

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
      },
      hideUntilStart: props.hideUntilStart
    }
    let image = new Image();
    image.src = this.props.src;
    image.onload = () => {
      this.row = image.width / this.props.width;
      this.column = image.height / this.props.height;
    }
  }

  update(time) {
    console.log(time);
    let {row, column} = this.state.frame;
    if (++row >= this.row) {
      row = 0;
      if (++column >= this.column) {
        column = 0;
        cancelAnimationFrame(this.timerId);
        this.timerId = null;
        this.setState({hideUntilStart: this.props.hideUntilStart});
        this.props.onAnimationEnd(this.props.name);
      }
    }
    this.setState({frame : {row, column}});
    if (this.timerId) requestAnimationFrame(this.update.bind(this), FPS);
  }

  start() {
    if (this.timerId) return;
    this.setState({hideUntilStart: false});
    this.timerId = requestAnimationFrame(this.update.bind(this), FPS);
  }

  stop() {
    if (!this.timerId) return;
    cancelAnimationFrame(this.timerId);
    this.setState({frame : {row: 0, column: 0}, hideUntilStart: this.props.hideUntilStart});
  }

  pause() {
    if (this.timerId) cancelAnimationFrame(this.timerId);
  }

  render() {
    const {width, height, src} = this.props;
    const {frame, hideUntilStart} = this.state;
    const style = {
      width,
      height,
      backgroundImage: `url(${src})`,
      backgroundPosition: `${frame.row*width}px ${frame.column*height}px`,
      visibility: (hideUntilStart) ? 'hidden' : 'visible'
    };
    return (
      <div
        style={assign({}, this.props.customStyle, style)}
        onClick={this.props.onClick} />
    );
  }
}

AnimationSprite.propTypes = {
  onClick: PropTypes.func,
  onDoubleClick: PropTypes.func,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
};

