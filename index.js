import 'ol/ol.css';
import {
    Map,
    View,
    Overlay
} from 'ol';
//import Overlay from 'ol';
import {
    toStringHDMS
} from 'ol/coordinate';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import 'jquery/dist/jquery.min';
import 'bootstrap/dist/js/bootstrap.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    fromLonLat,
    toLonLat
} from 'ol/proj';
import 'bootstrap/js/dist/popover.js';
import 'ol/MapBrowserEventType';

var layer = new TileLayer({
    source: new OSM()
});

//var mapCenter = [0,0];
//var pos = fromLonLat([16.3725, 48.208889]);
var pos = fromLonLat([76.87403794962249, 8.569385045000772]);
console.log(pos);
var viewOne = new View({
    center: pos,
    zoom: 10
})


var map = new Map({
    target: 'map',
    layers: [layer],
    view: viewOne
});

//We have given the zoom and center details in the View declaration
//map.getView().setCenter(pos);
//map.getView().setZoom(10);

//Vienna Marker

var marker = new Overlay({
    id: 'markerOverlay',
    position: pos,
    positioning: 'center-center',
    element: document.getElementById('marker'),
    stopEvent: true
});
map.addOverlay(marker);

// Vienna label
var kazha = new Overlay({
    position: pos,
    element: document.getElementById('kazha')
});
map.addOverlay(kazha);

// Popup showing the position the user clicked

var popup = new Overlay({
    element: document.getElementById('popup')
});
map.addOverlay(popup);

//Making the marker draggable

var markerElement = document.getElementById('marker');

markerElement.addEventListener('mousedown', function (event) {

    function move(event) {

        marker.setPosition(map.getEventCoordinate(event));
    }

    function end(event) {
        window.removeEventListener('mousemove', move);
        window.removeEventListener('mouseup', end);
    }
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', end);
})


// Adding popover to the map when we click
map.on('click', function (evt) {
    console.log('clicked!');
    //marker.setPosition(evt.coordinate);
    console.log(toLonLat(evt.coordinate));
    var element = popup.getElement();
    var coordinate = evt.coordinate;
    var hdms = toStringHDMS(toLonLat(coordinate));
    // map.getView().setCenter(coordinate);
    // map.getView().setZoom(5);


    //popover is a bootstrap plugin
    $(element).popover('destroy');
    popup.setPosition(coordinate);
    $(element).popover({
        placement: 'auto',
        animation: false,
        html: true,
        content: '<p id="locText">The location you clicked is:</p><code id="code1">' + hdms + '</code>'
    });
    $(element).popover('show');
});

$("#clearMarker").click(function () {

    //var mark = map.getOverlayById('markerOverlay');
    // map.removeOverlay(mark);
    $("#marker").toggle();
    //marker.setPosition(undefined);

})


marker.on('click', function (evt) {

    var pp = evt.coordinate;
    concole.log(pp);

})