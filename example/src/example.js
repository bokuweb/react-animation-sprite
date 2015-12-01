import React, {Component} from 'react';
import AnimationSprite from '../../src';

export default class Example extends Component{
  constructor() {
    super();
  }

  handleOnclick1() {
    this.refs.sprite1.start();
  }

  handleAnimationEnd(name) {
    console.log(`${name} animation end!!`);
  }

  render() {
    return (
      <div>
        <AnimationSprite
          customClass="item"
          ref="sprite1"
          name="sprite1"
          src="img/effect.png"
          width={160}
          height={160}
          hideUntilStart={true}
          onAnimationEnd={this.handleAnimationEnd.bind(this)} >
        </AnimationSprite>
        <AnimationSprite customClass="item"
          ref="sprite2"
          src="img/effect.png"
          width={160}
          height={160}
          hideUntilStart={false}
          onClick={this.handleOnclick1.bind(this)} >
        </AnimationSprite>
      </div>
    );
  }
}
