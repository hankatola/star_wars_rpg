$(document).ready(function() {

    "use strict"

    function character(name,image,attack,counter,hp) {
        this.name = name
        this.image = image
        this.attack = attack
        this.counter = counter
        this.hp = hp
    }

    var characters = {
        luke: new character('Luke Skywalker','luke',4,8,256),
        vader: new character('Darth Vader','vader',32,16,512),
        obiwan: new character('Obi Wan Kenobi','obiwan',2,64,128),
        maul: new character('Darth Maul','maul',64,32,128),
    }

    function create(character,chosen) {
        let image,hp,atk,name,stats,out
        image = $('<img>',{
            id: character.name,
            src: 'assets/images/' + character.image + '.jpg',
            height: 200,
            width: 200,
        })
        image = $("<div>").html(image).addClass('image')
        hp = $("<div>").text('HP: ' + character.hp).addClass('col')
        if (chosen === true) {
            atk = $("<div>").text('Attack: ' + character.attack).addClass('col')
        } else {
            atk = $("<div>").text('Counter: ' + character.counter).addClass('col')
        }
        name = $('<h4>').text(character.name)
        stats = $("<div>").html(hp.add(atk)).addClass('row')
        out = $("<div>").html(name.add(image).add(stats)).addClass('character text-center mx-auto')
        return out
    }

    let luke = create(characters.luke,true)
    let vader = create(characters.vader,false)
    let obiwan = create(characters.obiwan,false)
    let maul = create(characters.maul,false)

    $('#test').append(luke).append(vader).append(obiwan).append(maul)

})