import React, {Component, PropTypes} from 'react';
import assign from 'react/lib/Object.assign';

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
      frame: {row: 0, column: 0},
      hide: props.hideUntilStart
    };
    let image = new Image();
    image.src = this.props.src;
    image.onload = () => {
      this.row = image.width / this.props.width;
      this.column = image.height / this.props.height;
    };
  }

  componentDidMount() {
    if (this.props.autoStart) this.start();
  }

  update(time) {
    const {onAnimationEnd, name, hideUntilStart} = this.props;
    let {row, column} = this.state.frame;

    if (row >= this.row-1) {
      row = 0;
      column += 1;
      if (column >= this.column) {
        column = 0;
        cancelAnimationFrame(this.timerId);
        this.timerId = null;
        this.setState({hide:hideUntilStart});
        if (onAnimationEnd) onAnimationEnd(name);
        return;
      }
    } else {
      row += 1; 
    }
    console.log(`row=${row}, column=${column}`)
    this.setState({frame : {row, column}});
    if (this.timerId) requestAnimationFrame(this.update.bind(this), FPS);
  }

  start() {
    if (this.timerId) return;
    this.setState({hide: false});
    this.timerId = requestAnimationFrame(this.update.bind(this), FPS);
  }

  stop() {
    if (!this.timerId) return;
    const {hideUntilStart} = this.props;
    cancelAnimationFrame(this.timerId);
    this.setState({frame : {row: 0, column: 0}, hideUntilStart});
  }

  pause() {
    if (this.timerId) cancelAnimationFrame(this.timerId);
  }

  render() {
    const {width, height, src, customClass, customStyle, onClick} = this.props;
    const {frame, hide} = this.state;
    const style = {
      width,
      height,
      backgroundImage: `url(${src})`,
      backgroundPosition: `-${frame.row*width}px -${frame.column*height}px`,
      visibility: (hide) ? 'hidden' : 'visible'
    };
    return (
      <div
        className={customClass}
        style={assign({}, customStyle, style)}
        onClick={onClick} >
        {this.props.children}
      </div>
    );
  }
}

AnimationSprite.propTypes = {
  onClick: PropTypes.func,
  onDoubleClick: PropTypes.func,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
};

