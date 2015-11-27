import React, {Component} from 'react';
import AnimationSprite from '../../src';

export default class Example extends Component{
  handleOnclick1() {
    this.refs.sprite1.start();
  }

  handleOnclick2() {
    this.refs.sprite2.start();
  }

  render() {
    return (
      <div>
        <AnimationSprite customClass="item"
                         ref="sprite1"
                         name="sprite1"
                         width={20}
                         height={20}
                         onClick={this.handleOnclick1.bind(this)} >
        </AnimationSprite>
        <AnimationSprite customClass="item"
                         ref="sprite2"
                         name="sprite2"
                         width={20}
                         height={20}
                         onClick={this.handleOnclick2.bind(this)} >
        </AnimationSprite>
      </div>
    );
  }
}
