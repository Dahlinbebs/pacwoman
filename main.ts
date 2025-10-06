controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    mySprite.setImage(assets.image`PacWoman`)
})
info.onCountdownEnd(function () {
    if (myScore >= 75) {
        game.gameOver(true)
    } else {
        game.gameOver(false)
    }
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    mySprite.setImage(img`
        . . . . . 5 5 5 5 5 5 5 . . . . 
        . . . 5 5 5 5 5 5 5 5 5 5 5 . . 
        . . 5 5 5 5 5 5 f f 5 5 5 5 5 . 
        . 5 5 5 5 5 5 5 f f 5 5 5 5 5 5 
        5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 . 
        5 5 5 5 5 5 5 5 5 5 5 5 . . . . 
        5 5 5 5 5 5 5 5 5 . . . . . . . 
        5 5 5 5 5 5 5 . . . . . . . . . 
        5 5 5 5 5 5 5 5 5 . . . . . . . 
        5 5 5 5 5 5 5 5 5 5 5 5 . . . . 
        5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
        . 5 5 5 5 5 5 5 5 5 5 5 5 5 5 . 
        . 5 5 5 5 5 5 5 5 5 5 5 5 5 . . 
        . . 5 5 5 5 5 5 5 5 5 5 5 . . . 
        . . . 5 5 5 5 5 5 5 5 5 . . . . 
        . . . . 5 5 5 5 5 5 . . . . . . 
        `)
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Player, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    game.gameOver(false)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    info.changeScoreBy(1)
    sprites.destroy(otherSprite, effects.confetti, 100)
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.collectibleRedCrystal, function (sprite, location) {
    if (myScore >= 50) {
        game.gameOver(true)
        game.showLongText(info.highScore(), DialogLayout.Bottom)
    } else {
        game.showLongText("Missing points!", DialogLayout.Bottom)
        tiles.placeOnTile(mySprite, tiles.getTileLocation(21, 6))
    }
})
let myEnemy: Sprite = null
let pacFood: Sprite = null
let mySprite: Sprite = null
let myScore = 0
info.setScore(0)
myScore = 0
let maxScore = 100
scene.setBackgroundColor(15)
tiles.setCurrentTilemap(tilemap`level1`)
mySprite = sprites.create(img`
    . . . . . 5 5 5 5 5 5 5 . . . . 
    . . . 5 5 5 5 5 5 5 5 5 5 5 . . 
    . . 5 5 5 5 5 5 f f 5 5 5 5 5 . 
    . 5 5 5 5 5 5 5 f f 5 5 5 5 5 5 
    5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 . 
    5 5 5 5 5 5 5 5 5 5 5 5 . . . . 
    5 5 5 5 5 5 5 5 5 . . . . . . . 
    5 5 5 5 5 5 5 . . . . . . . . . 
    5 5 5 5 5 5 5 5 5 . . . . . . . 
    5 5 5 5 5 5 5 5 5 5 5 5 . . . . 
    5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
    . 5 5 5 5 5 5 5 5 5 5 5 5 5 5 . 
    . 5 5 5 5 5 5 5 5 5 5 5 5 5 . . 
    . . 5 5 5 5 5 5 5 5 5 5 5 . . . 
    . . . 5 5 5 5 5 5 5 5 5 . . . . 
    . . . . 5 5 5 5 5 5 . . . . . . 
    `, SpriteKind.Player)
tiles.placeOnTile(mySprite, tiles.getTileLocation(0, 8))
controller.moveSprite(mySprite, 60, 60)
scene.cameraFollowSprite(mySprite)
info.startCountdown(120)
for (let index = 0; index < maxScore; index++) {
    pacFood = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . 2 2 . . . . . . . 
        . . . . . . 3 1 1 3 . . . . . . 
        . . . . . 2 1 1 1 1 2 . . . . . 
        . . . . . 2 1 1 1 1 2 . . . . . 
        . . . . . . 3 1 1 3 . . . . . . 
        . . . . . . . 2 2 . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Food)
    tiles.placeOnRandomTile(pacFood, assets.tile`transparency16`)
}
for (let index = 0; index < 4; index++) {
    myEnemy = sprites.create(img`
        ........................
        ........................
        ........................
        ........................
        ..........ffff..........
        ........ff6666ff........
        .......fb666666bf.......
        .......f66666666f.......
        ......fd66666666df......
        ......fd66666666df......
        ......fddd6666dddf......
        ......fbdbfddfbdbf......
        ......fcdcf66fcdcf......
        .......fb666666bf.......
        ......fffcdb6bdffff.....
        ....fc166cbfbfc666cf....
        ....f6b6b6ffff6b6b6f....
        ....fbfbffffffbfbfbf....
        .........ffffff.........
        ...........fff..........
        ........................
        ........................
        ........................
        ........................
        `, SpriteKind.Enemy)
    tiles.placeOnRandomTile(myEnemy, assets.tile`transparency16`)
    myEnemy.follow(mySprite, 45)
}
game.onUpdate(function () {
    if (info.score() > 0) {
        myScore += 1
    }
})
