/*
    Author: Dave Paquette
    Date: January 2019
*/

$(document).ready(function() {
"use strict"

/*
    Function farm
    ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
*/
function createCharacters() {
    function character(name,image,attack,counter,hp) {
        this.name = name
        this.image = image
        this.attack = attack
        this.counter = counter
        this.hp = hp
        this.chosen = false
        this.fought = false
        this.dead = false
    }
    var c = {
        maul: new character('Darth Maul','maul',64,32,128),
        obiwan: new character('Obi Wan Kenobi','obiwan',2,32,128),
        vader: new character('Darth Vader','vader',32,16,512),
        luke: new character('Luke Skywalker','luke',4,2,256),
    }
    return c
}

function avatar(c,start=false) {
    // draws avatars
    let image,hp,atk,name,stats,out                                     // function variables
    if (c.dead === true) {c.image = 'dead'}                             // use the dead image if they're dead
    image = $('<img>',{                                                 // create html image object
        id: c.name,
        src: 'assets/images/' + c.image + '.jpg',
        height: 200,
        width: 200,
    })
    image = $("<div>").html(image).addClass('image')                    // html image & container
    hp = $("<div>").text('HP: ' + c.hp).addClass('col')                 // add hitpoints
    if (c.chosen === true) {                                            // toggle attack & counter if target is chosen
        atk = $("<div>").text('Attack: ' + c.attack).addClass('col')
    } else {
        atk = $("<div>").text('Counter: ' + c.counter).addClass('col')
    }
    name = $('<h4>').text(c.name)                                       // create name & stats
    stats = $("<div>").html(hp.add(atk)).addClass('row')                // merge hp & attack into one row
    if (start === true) {stats = ''}                                    // hide stats if choosing character at beginning
    out = $("<div>").html(name.add(image).add(stats))
    out.addClass('character text-center mx-auto view overlay selectable')
    out.attr('data-name',c.image)
    return out
}

function findPlayer(image=false) {
    let av = [false,false]
    if (image === false) {                                              // returns player & alive opponent
        for (let i in c) {
            if (c[i].chosen === true) {av[0] = c[i]}                    // player
        }
        for (let i in c) {
            if (c[i].fought === true && c[i].dead === false) {          // not dead opponent
                av[1] = c[i]
            }
        }
    } else {                                                            // return just the player requested
        for (let i in c) {
            if (c[i].image === image) {av[0] = c[i]}
        }
    }
    return av
}

function chooseOpponent() {
    if (findPlayer()[1] != false) {return}                      // ignore if an alive opponent exists
    $('#them').empty()
    $(this).remove()
    $(this).appendTo('#them').addClass('ignore-hover')
    findPlayer($(this).attr('data-name'))[0].fought = true      // record that this avatar has fought
    let anyoneAlive = false                                     // hide bullpen if no alive & unfought avatars remain
    for (let i in c) {
        if (c[i].fought === false && c[i].chosen === false) {
            anyoneAlive = true
            break
        }
    }
    if (anyoneAlive === false) {$('#anyone-left').hide()}
}

function selectFunction() {                                     // selects opponent to fight
    $('#you').empty()
    $('#them').empty()
    $('#enemies-remaining').empty()
    let name = findPlayer($(this).attr('data-name'))[0]
    name.chosen = true
    avatar(name,false).addClass('ignore-hover').appendTo($('#you'))
    for (let i in c) {
        if (c[i] != name) {
            let av = avatar(c[i],false)
            av.addClass('remaining').appendTo($('#enemies-remaining'))
            av.on('click',chooseOpponent)
        }
    }
    $('#choose-hero').hide()
    $('#bullpen').empty()
    $('#game-screen').show()
}

function reset() {                                              // resets game
    c = createCharacters()
    heroSelection = true
    $('#game-screen').hide()
    $('#choose-hero').show()
    $('#anyone-left').show()
    for (let i in c) {
        avatar(c[i],true).appendTo($('#bullpen')).on('click',selectFunction)
    }
}

function fight() {                                              // governs fights & outcomes
    let players = findPlayer()
    let you = players[0]
    let them = players[1]
    if (them === false || you.dead === true) {return}           // ignore if no enemy
    you.hp -= them.counter
    them.hp -= you.attack
    you.attack += Math.min(you.attack,100)
    $('#you').empty()
    $('#them').empty()
    if (you.hp <= 0) {you.dead = true}
    if (them.hp <= 0) {them.dead = true}
    avatar(you,false).addClass('ignore-hover').appendTo($('#you'))
    avatar(them,false).addClass('ignore-hover').appendTo($('#them'))
    findPlayer()
    audio.play()
}


/*
    Main
    ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    No main function, this section functions as main & operates the program
*/

var c = createCharacters()
var audio = new Audio('assets/audio/lightsaber.mp3')
var heroSelection = true
reset()
$('#game-screen').hide()
$('.selectable').on('click',selectFunction)
$('.btn-danger').on('click',fight)
$('.btn-dark').on('click',reset)

})