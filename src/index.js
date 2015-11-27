import React, {Component, PropTypes} from 'react';
import assign from 'lodash.assign';

export default class AnimationSprite extends Component{
  constructor(props) {
    super(props);
    this.state = {status: 'paused'};
    this.appendAnimationRule();
    window.addEventListener('webkitAnimationEnd', this.onAnimationEnd.bind(this, this.props.name));
    window.addEventListener('animationend', this.onAnimationEnd.bind(this, this.props.name));
  }

  appendAnimationRule() {
    const ua = window.navigator.userAgent.toLowerCase();
    const styleSheet = document.styleSheets[0];
    const {name} = this.props;
    if (ua.indexOf('msie') !== -1 | ua.indexOf('trident') !== -1) {
      const keyframes =
       `@keyframes anim${name} {
          10% {transform:scale(0.75) rotateY(0deg); }
          90% {transform:scale(0.75) rotateY(90deg); }
          100% {transform:scale(1) rotateY(90deg); }
        }`;
      styleSheet.insertRule(keyframes, styleSheet.rules.length-1);
    }else if (ua.indexOf('chrome') !== -1 || ua.indexOf('safari') !== -1 || ua.indexOf('safari') !== -1) {
      const keyframes =
        `@-webkit-keyframes anim${name} {
          10% {-webkit-transform:scale(0.75) rotateY(0deg); }
          90% {-webkit-transform:scale(0.75) rotateY(90deg); }
          100% {-webkit-transform:scale(1) rotateY(90deg); }
        }`;
      styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
    }else if (ua.indexOf('safari') !== -1) {
    }else if (ua.indexOf('firefox') !== -1) {
      const keyframes =
        `@-moz-keyframes anim${name} {
          10% {-moz-transform:scale(0.75) rotateY(0deg); }
          90% {-moz-transform:scale(0.75) rotateY(90deg); }
          100% {-moz-transform:scale(1) rotateY(90deg); }
        }`;
      styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
    }
  }

  onAnimationEnd(name, event) {
    this.setState({status: 'stop'});
  }

  start() {
    this.setState({status: 'runnning'});
  }

  render() {
    const {width, height, name} = this.props;
    const {status} = this.state;
    const style = {width, height};
    let animation;
    if (status === 'paused') {
      animation = {
          animationName : "anim" + name,
          animationDuration : "1400ms",
          animationTimingFunction : "ease-in-out",
          animationPlayState : "paused"
      }
    } else if (status === 'runnning') {
      animation = {
          WebkitAnimationName : "anim" + name,
          WebkitAnimationDuration : "1400ms",
          WebkitAnimationTimingFunction : "ease-in-out",
          WebkitAnimationPlayState : "running",
          MozAnimationName : "anim" + name,
          MozAnimationDuration : "1400ms",
          MozAnimationTimingFunction : "ease-in-out",
          animationName : "anim" + name,
          animationDuration : "1400ms",
          animationTimingFunction : "ease-in-out",
          animationPlayState : "running"
      }
    } else if (status === 'stop') {
      animation = {
        WebkitAnimationName : "none",
        MozAnimationName : "none",
        animationName : "none",
        animationDuration : "1400ms"
      }
    }

    return (
      <div ref='animationSprite'
           style={assign({}, this.props.customStyle, style, animation)}
           className={this.props.customClass}
           onClick={this.props.onClick} >
        {this.props.children}
      </div>
    );
  }
}

AnimationSprite.propTypes = {
  customStyle: PropTypes.object,
  customClass: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};
