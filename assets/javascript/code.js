$(document).ready(function() {

    "use strict"

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
            obiwan: new character('Obi Wan Kenobi','obiwan',2,64,128),
            vader: new character('Darth Vader','vader',32,16,512),
            luke: new character('Luke Skywalker','luke',4,8,256),
        }
        return c
    }

    function avatar(c,start=false) {
        let image,hp,atk,name,stats,out                                             // function variables
        image = $('<img>',{                                                         // create image
            id: c.name,
            src: 'assets/images/' + c.image + '.jpg',
            height: 200,
            width: 200,
        })
        image = $("<div>").html(image).addClass('image')                            // html image & container
        hp = $("<div>").text('HP: ' + c.hp).addClass('col')
        if (c.chosen === true) {                                                    // toggle attack & counter if target is chosen
            atk = $("<div>").text('Attack: ' + c.attack).addClass('col')
        } else {
            atk = $("<div>").text('Counter: ' + c.counter).addClass('col')
        }
        name = $('<h4>').text(c.name)                                               // create name & stats
        stats = $("<div>").html(hp.add(atk)).addClass('row')
        if (start === true) {                                                       // hide stats if choosing character at beginning
            stats = ''
        }
        out = $("<div>").html(name.add(image).add(stats)).addClass('character text-center mx-auto view overlay selectable')
        out.attr('data-name',c.image)
        return out
    }

    function chooseOpponent() {
        // on(click) function called from elements created from '.selectable'
        console.log('click',this)
        $('#them').empty()
        $(this).remove()
        $(this).appendTo('#them')
    }

    var c = createCharacters()
    var heroSelection = true

    function main(reset) {
        for (let i in c) {                                                          // display avatars in bullpen
            avatar(c[i],true).appendTo($('#bullpen'))
        }
    }


    main()

    $('#game-screen').hide()

    $('.selectable').on('click',function() {
        let name = $(this).attr('data-name')
        for (let i in c) {                                                          // indicate the chosen avatar
            if (c[i].image == name) {
                c[i].chosen = true
                avatar(c[i],false).removeClass('selectable').appendTo($('#you'))
            } else {
                let av = avatar(c[i],false).removeClass('selectable')
                av.addClass('remaining').appendTo($('#enemies-remaining'))
                av.on('click',chooseOpponent)
            }
        }
        $('#choose-hero').hide()
        $('#bullpen').empty()
        $('#game-screen').show()
    })


    // $('.remaining').on('click',function() {
    //     $('#them').empty()
    //     $('#bullpen').empty()
    //     $(this).remove()
    //     // redraw reamining enemies
    //     let name = $(this).attr('data-name')
    //     for (let i in c) {
    //         if (c[i].image == name) {
    //             c[i].fought = true
    //             avatar(c[i],false).appendTo('#them')
    //         } else if (c[i].fought === false) {
    //             avatar(c[i],false).addClass('remaining').appendTo('#bullpen')
    //         }
    //     }
    //     console.log('click remove')

    // })

})