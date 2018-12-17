let preload = function () {
  this.load.spritesheet('due', '../../static/assets/dude.png', {frameWidth: 39, frameHeight: 33});
}

let create = function () {
  let group = this.add.group({
    key: 'due',
    frame: [0, 1, 2, 3, 4],
    frameQuantity: 20
  })

  Phaser.Actions.GridAlign(group, group.getChildren(), {
    width: 10,
    height: 10,
    cellWidth: 32,
    cellHeight: 32,
    x: 100,
    y: 100
  })
}

let config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: '#2d2d2d',
  parent: 'js-game',
  scene: {
    preload,
    create
  }
}

var game = new Phaser.Game(config);

