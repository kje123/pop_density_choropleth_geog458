mapboxgl.accessToken =
'pk.eyJ1IjoiamFrb2J6aGFvIiwiYSI6ImNpcms2YWsyMzAwMmtmbG5icTFxZ3ZkdncifQ.P9MBej1xacybKcDN_jehvw';
let map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/dark-v10',
    zoom: 4, // starting zoom
    center: [-96, 40], // starting center
    projection: {
        name: 'albers',
        center: [-96, 40]
    }
});

map.on('load', () => {
    map.addSource('covid-rates', {
        type: 'geojson',
        data: 'assets/us-covid-2020-rates.json'
    });

    map.addLayer({
        'id': 'covid-rates-layer',
        'type': 'fill',
        'source': 'covid-rates',
        'paint': {
            'fill-color': [
                'step',
                ['get', 'rates'],
                '#FFEDA0',   // stop_output_0
                15,          // stop_input_0
                '#FED976',   // stop_output_1
                30,          // stop_input_1
                '#FEB24C',   // stop_output_2
                45,          // stop_input_2
                '#FD8D3C',   // stop_output_3
                60,         // stop_input_3
                '#FC4E2A',   // stop_output_4
                75,         // stop_input_4
                '#E31A1C',   // stop_output_5
                90,         // stop_input_5
                '#BD0026',   // stop_output_6
                105,        // stop_input_6
                "#800026"    // stop_output_7
            ],
            'fill-outline-color': '#FFFFFF',
            'fill-opacity': 0.7,
        }
    });
});

// legend
const layers = [
    '0-15',
    '16-30',
    '31-45',
    '46-60',
    '61-75',
    '76-90',
    '91-105',
    '106+'
];
const colors = [
    '#FFEDA0',
    '#FED976',
    '#FEB24C',
    '#FD8D3C',
    '#FC4E2A',
    '#E31A1C',
    '#BD0026',
    '#800026'
];

const legend = document.getElementById('legend');
legend.innerHTML = "<b>Covid Transmission Rate<br>(pop/cases)</b><br><br>";

layers.forEach((layer, i) => {
    const color = colors[i];
    const item = document.createElement('div');
    const key = document.createElement('i');
    key.className = 'dot';
    key.style.backgroundColor = color;

    const value = document.createElement('span');
    value.innerHTML = `${layer}`;
    item.appendChild(key);
    item.appendChild(value);
    legend.appendChild(item);
});

const src = document.createElement('a');
src.href = "https://github.com/nytimes/covid-19-data";
src.innerHTML = "Source: NY Times";
legend.appendChild(src);