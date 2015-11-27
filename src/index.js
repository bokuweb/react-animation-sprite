import React, {Component, PropTypes} from 'react';
import assign from 'lodash.assign';

export default class AnimationSprite extends Component{
  constructor(props) {
    super(props);
    const ua = window.navigator.userAgent.toLowerCase();
    const styleSheet = document.styleSheets[0];
    if (ua.indexOf('msie') !== -1 | ua.indexOf('trident') !== -1) {
      const keyframes =
        `@keyframes anim {
          10% {transform:scale(0.75) rotateY(0deg); }
          90% {transform:scale(0.75) rotateY(90deg); }
          100% {transform:scale(1) rotateY(90deg); }
        }`;
      styleSheet.insertRule(keyframes, styleSheet.rules.length-1);
    }else if (ua.indexOf('chrome') !== -1 || ua.indexOf('safari') !== -1) {
      const keyframes =
        `@-webkit-keyframes anim {
          10% {-webkit-transform:scale(0.75) rotateY(0deg); }
          90% {-webkit-transform:scale(0.75) rotateY(90deg); }
          100% {-webkit-transform:scale(1) rotateY(90deg); }
        }`;
      styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
    }else if (ua.indexOf('safari') !== -1) {

    }else if (ua.indexOf('firefox') !== -1) {
      const keyframes =
        `@-moz-keyframes anim {
          10% {-moz-transform:scale(0.75) rotateY(0deg); }
          90% {-moz-transform:scale(0.75) rotateY(90deg); }
          100% {-moz-transform:scale(1) rotateY(90deg); }
        }`;
      styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
    }
    console.dir(styleSheet);
    window.addEventListener('webkitAnimationEnd', this.onAnimationEnd.bind(this, this.props.name));
    window.addEventListener('animationend', this.onAnimationEnd.bind(this, this.props.name));
  }

  onAnimationEnd(name, event) {
    console.log(name);
  }

  start() {

  }

  render() {
    const {width, height} = this.props;
    const style = {
      width,
      height,
      backgroundColor: "#333",
      WebkitAnimationName : "anim",
      WebkitAnimationDuration : "1400ms",
      WebkitAnimationTimingFunction : "ease-in-out",
      MozAnimationName : "anim",
      MozAnimationDuration : "1400ms",
      MozAnimationTimingFunction : "ease-in-out",
      animationName : "anim",
      animationDuration : "1400ms",
      animationTimingFunction : "ease-in-out"
    }


    return (
      <div ref='animationSprite'
           style={assign({position:"relative"}, this.props.customStyle, style)}
           className={this.props.customClass} >
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
