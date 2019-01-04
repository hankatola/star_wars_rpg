$(document).ready(function() {

    "use strict"

    function character(name,image,attack,counter,hp) {
        function pic(image,name) {
            image = 'assets/images/' + image + '.jpg'
            let y = $('<img />',{
                id: name,
                src: image,
                height: 200,
                width: 200,
            })
            return y
        }
        this.name = name
        this.image = pic(image,name)
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

    characters.luke.image.appendTo('#test')
    $('<div>').text(characters.luke.name).appendTo('#test')

})