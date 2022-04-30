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

// for circles
const grades = [2500, 5000, 10000, 25000, 50000, 100000],
      clrs = ['rgb(237,248,251)', 'rgb(191,211,230)', 'rgb(158,188,218)', 'rgb(140,150,198)', 'rgb(136,86,167)', 'rgb(129,15,124)'],
      radii = [5, 15, 25, 35, 50, 65];

map.on('load', () => {
    map.addSource('covid-counts', {
        type: 'geojson',
        data: 'assets/us-covid-2020-counts.json'
    });

    map.addLayer({
        'id': 'covid-counts-layer',
        'type': 'circle',
        'source': 'covid-counts',
        'paint': {
            'circle-radius': {
                'property': 'cases',
                'stops': [
                    [{
                        zoom: 5,
                        value: grades[0]
                    }, radii[0]],
                    [{
                        zoom: 5,
                        value: grades[1]
                    }, radii[1]],
                    [{
                        zoom: 5,
                        value: grades[2]
                    }, radii[2]],
                    [{
                        zoom: 5,
                        value: grades[3]
                    }, radii[3]],
                    [{
                        zoom: 5,
                        value: grades[4]
                    }, radii[4]],
                    [{
                        zoom: 5,
                        value: grades[5]
                    }, radii[5]]
                ]
            },
            'circle-color': {
                'property': 'cases',
                'stops': [
                    [grades[0], clrs[0]],
                    [grades[1], clrs[1]],
                    [grades[2], clrs[2]],
                    [grades[3], clrs[3]],
                    [grades[4], clrs[4]],
                    [grades[5], clrs[5]]
                ]
            },
            'circle-stroke-color': 'white',
            'circle-stroke-width': 1,
            'circle-opacity': 0.75
        }
    });

    map.on('click', 'covid-counts-layer', (event) => {
        new mapboxgl.Popup()
            .setLngLat(event.features[0].geometry.coordinates)
            .setHTML(`<strong>County: </strong> ${event.features[0].properties.county}<br>
                      <strong>Cases: </strong> ${event.features[0].properties.cases}<br>
                      <strong>Deaths: </strong> ${event.features[0].properties.deaths}`)
            .addTo(map);
    });

});

// legend
const layers = [
    '0-5,000',
    '5,001-10,000',
    '10,001-25,000',
    '25,001-50,000',
    '50,001-100,000',
    '100,000+'
];
const colors = [
    '#edf8fb',
    '#bfd3e6',
    '#9ebcda',
    '#8c96c6',
    '#8856a7',
    '#810f7c'
];

const legend = document.getElementById('legend');
legend.innerHTML = "<b>Covid Cases</b><br><br>";

layers.forEach((layer, i) => {
    const color = colors[i];
    const item = document.createElement('div');
    const key = document.createElement('i');
    key.className = 'dot';
    key.style.width = radii[i] + "px";
    key.style.height = radii[i] + "px";
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