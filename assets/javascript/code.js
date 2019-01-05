$(document).ready(function() {

"use strict"
/*
    Function farm
    ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
*/
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

function createCharacters() {
    var c = {
        maul: new character('Darth Maul','maul',64,32,128),
        obiwan: new character('Obi Wan Kenobi','obiwan',2,32,128),
        vader: new character('Darth Vader','vader',32,16,512),
        luke: new character('Luke Skywalker','luke',4,2,256),
    }
    return c
}

function avatar(c,start=false) {
    let image,hp,atk,name,stats,out                                     // function variables
    if (c.dead === true) {
        c.image = 'dead'
    }
    image = $('<img>',{                                                 // create image
        id: c.name,
        src: 'assets/images/' + c.image + '.jpg',
        height: 200,
        width: 200,
    })
    image = $("<div>").html(image).addClass('image')                    // html image & container
    hp = $("<div>").text('HP: ' + c.hp).addClass('col')
    if (c.chosen === true) {                                            // toggle attack & counter if target is chosen
        atk = $("<div>").text('Attack: ' + c.attack).addClass('col')
    } else {
        atk = $("<div>").text('Counter: ' + c.counter).addClass('col')
    }
    name = $('<h4>').text(c.name)                                       // create name & stats
    stats = $("<div>").html(hp.add(atk)).addClass('row')
    if (start === true) {                                               // hide stats if choosing character at beginning
        stats = ''
    }
    out = $("<div>").html(name.add(image).add(stats)).addClass('character text-center mx-auto view overlay selectable')
    out.attr('data-name',c.image)
    return out
}

function findPlayer() {
    let av = [false,false]
    for (let i in c) {
        if (c[i].chosen === true) {
            av[0] = c[i]
        }
    }
    for (let i in c) {
        if (c[i].fought === true && c[i].dead === false) {
            av[1] = c[i]
        }
    }
    return av
}

function chooseOpponent() {
    // on(click) function called from elements created from '.selectable'
    for (let i in c) {                                      // ignore if an alive contender is already chosen
        if (c[i].fought === true && c[i].dead === false) {
            return
        }
    }
    $('#them').empty()
    $(this).remove()
    $(this).appendTo('#them').addClass('ignore-hover')
    for (let i in c) {                                      // record that this avatar has fought
        if (c[i].image === $(this).attr('data-name')) {
            c[i].fought = true
        }
    }
    let anyoneAlive = false
    for (let i in c) {
        if (c[i].fought === false && c[i].chosen === false) {
            anyoneAlive = true
            console.log(c[i].fought,c[i].chosen)
            break    
        }
    }
    console.log(anyoneAlive)
    if (anyoneAlive === false) {
        $('#anyone-left').hide()
    }
}

function selectFunction() {
    $('#you').empty()
    $('#them').empty()
    $('#enemies-remaining').empty()
    let name = $(this).attr('data-name')
    for (let i in c) {
        let av                                      // indicate the chosen avatar
        if (c[i].image == name) {
            c[i].chosen = true
            av = avatar(c[i],false)
            av.addClass('ignore-hover').appendTo($('#you'))
        } else {
            av = avatar(c[i],false)
            av.addClass('remaining').appendTo($('#enemies-remaining'))
            av.on('click',chooseOpponent)
        }
    }
    $('#choose-hero').hide()
    $('#bullpen').empty()
    $('#game-screen').show()
}

function reset() {
    c = createCharacters()
    heroSelection = true
    $('#game-screen').hide()
    $('#choose-hero').show()
    for (let i in c) {
        avatar(c[i],true).appendTo($('#bullpen')).on('click',selectFunction)
    }
}

function fight() {
    let players = findPlayer()
    let you = players[0]
    let them = players[1]
    if (them === false) {                               // ignore if no enemy chosen
        return
    }
    you.hp -= them.counter
    them.hp -= you.attack
    you.attack += you.attack
    $('#you').empty()
    $('#them').empty()
    if (you.hp <= 0) {
        alert('you lost')
    }
    if (them.hp <= 0) {
        them.dead = true
    }
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