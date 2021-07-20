const Nes = require('@hapi/nes/lib/client');
const $ = require('jquery');
const Handlebars = require('handlebars');

//Compile the template
const source = $("#entry-template").html();
const template = Handlebars.compile(source);

//Load initial entries
$.getJSON('/timeline', function (data) {

    data.forEach(function (item) {

        const html = template(item);
        $("#timeline").append(html);
    });
});

//Create a new entry
$('#add-entry').on('click', function () {
    $.post('/timeline/createEntry');
});

//Setup the websocket connection and react to updates
const client = new Nes.Client('ws://localhost:3000');

async function start () {
    try {
        await client.connect();

        const handler = function (item) {
            console.log('item:', item);

            const html = template(item);
            $('#timeline').prepend(html);
        };

        client.subscribe('/timeline/updates', handler);
    } catch (error) {
        throw new Error(error);
    }
}

start();
