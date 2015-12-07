import React, {Component} from 'react';
import AnimationSprite from '../../src';

export default class Example extends Component{
  constructor() {
    super();
    this.state = {sprites: []};
    window.addEventListener('mousedown', this.start.bind(this));
    window.addEventListener('touchstart', this.start.bind(this));
  }

  start(e) {
    let {sprites} = this.state;
    sprites.push({
      x:e.clientX,
      y:e.clientY,
      id:sprites.length
    });
    this.setState({sprites});
  }

  handleAnimationEnd(name) {
    console.log(`${name} animation end!!`);
    let {sprites} = this.state;
    sprites.splice(name, 1);
    this.setState({sprites});
  }

  getSprites(sprites) {
    if (sprites.length === 0) return <div />;
    return sprites.map((sprite, i) => {
      return (
        <AnimationSprite
          key={i}
          customStyle={{
            position:"absolute",
            left:sprite.x-80,
            top:sprite.y-80
          }}
          ref={sprite.id}
          name={sprite.id}
          src="img/effect.png"
          width={160}
          height={160}
          hideUntilStart={true}
          autoStart={true}
          onAnimationEnd={this.handleAnimationEnd.bind(this)} >
        </AnimationSprite>
      );
    });
  }

  render() {
    return (
      <div>
        {this.getSprites(this.state.sprites)}
      </div>
    );
  }
}
