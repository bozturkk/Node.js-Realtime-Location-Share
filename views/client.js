state = {
        location:{
            x:null,
            y:null,
        }
    }
    let socket = io.connect('http://localhost:8080');
    navigator.geolocation.getCurrentPosition((pos)=>{
        this.state ={
            location:{
                x:{{p_x}},
                y:pos.coords.longitude,
            }
        }
        const position = [this.state.location.x, this.state.location.y]
        socket.emit('Client_send_pos',position)
        const map = L.map('map').setView(position, 10);

        var icon1 = L.icon ({
            iconUrl: "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
            shadowSize: [41, 41]
        })
        var icon2 = L.icon ({
            iconUrl: "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
            shadowSize: [41, 41],
        })
        var icon3 = L.icon ({
            iconUrl: "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
            shadowSize: [41, 41],
        })
            
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);
        socket.on('send_mang_pos',(data)=>{
            data.forEach((i,y,z)=>{
                if(y <2){
                L.marker(i,{icon:icon1})/*Blue*/
                .addTo(map)
                .bindPopup('hello '+i)
                .openPopup();
                }
                else if(y <3){
                L.marker(i,{icon:icon2})/*Red*/
                .addTo(map)
                .bindPopup('hello '+i)
                .openPopup();
                }
                else if(y<4 || z<4){
                L.marker(i,{icon:icon3})
                .addTo(map)
                .bindPopup('hello '+i)/*Yellow*/
                .openPopup();
                }
                else
                {
                    alert('en fazla 4 kullanıcı bağlantı kurabilir.')
                }

                });
            });
        });