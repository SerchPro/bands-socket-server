const BandList = require("./band-list");

class Sockets {
    constructor(io){
        this.io = io;
        this.bandList = new BandList()
        this.socketEvents();
    }

    socketEvents() {
        this.io.on('connection', (socket) => {
            console.log('cliente conectado');
            socket.emit('current-bands', this.bandList.getBands() );

            //vote by band

            socket.on('vote-band', (id) =>{
                this.bandList.encreaseVotes(id);
                this.io.emit('current-bands', this.bandList.getBands() );
            });

            // delete a band

            socket.on('delete-band', (id) =>{
                this.bandList.removeBand(id);
                this.io.emit('current-bands', this.bandList.getBands() );
            });

            // change name
            socket.on('change-band-name', ({id, name}) =>{
                this.bandList.changeName(id, name);
                this.io.emit('current-bands', this.bandList.getBands() );
            });

            // create a band
            socket.on('create-a-band', ( name) =>{
                this.bandList.addBand(name);
                this.io.emit('current-bands', this.bandList.getBands() );
            });
        });

    }
}

module.exports = Sockets;