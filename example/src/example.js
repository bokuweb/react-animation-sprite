import React, {Component} from 'react';
import AnimationSprite from '../../src';

export default class Example extends Component{
  handleOnclick1() {
    console.dir(this);
    this.refs.sprite1.start("test");
  }

  render() {
    return (
      <div>
        <AnimationSprite customClass="item"
                         ref="sprite1"
                         src="img/effect.png"
                         width={160}
                         height={160}
                         onClick={this.handleOnclick1.bind(this)} >
        </AnimationSprite>
      </div>
    );
  }
}
