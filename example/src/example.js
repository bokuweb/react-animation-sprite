import React, {Component} from 'react';
import AnimationSprite from '../../src';

export default class Example extends Component{
  handleOnclick() {
    this.refs.sprite1.start();
  }

  render() {
    return (
      <div>
        <AnimationSprite customClass="item"
                         ref="sprite1"
                         name="sprite1"
                         width={20}
                         height={20}
                         onClick={this.handleOnclick.bind(this)} >
        </AnimationSprite>
      </div>
    );
  }
}
