import { useEffect } from 'react';
import _ from 'lodash';

// import Highcharts from 'highcharts';
// import HighchartsReact from 'highcharts-react-official';
// import highchartsMap from 'highcharts/modules/map';
// import mapDataIE from '@highcharts/map-collection/countries/ie/ie-all.geo.json';
// highchartsMap(Highcharts);

import { useData } from '@/contexts/data/use-data';

function getGeos(nodes) {
  // const pinned = JSON.parse(localStorage.pinned);

  return nodes.reduce((geos, node, i) => {
    return geos.concat({
      address: node.info.name,
      name: node.info.node,
      id: node.id,
      // pinned: pinned.some((pin) => {
      //   const value = node.info.name.match(new RegExp('\\S+$', 'g'))[0];
      //   return new RegExp(value, 'i').test(pin);
      // }),
      coordinates: [_.get(node, 'geo.ll', [])[1], _.get(node, 'geo.ll', [])[0]],
    });
  }, []);
  // .sort((a, b) => {
  //   return a.pinned < b.pinned ? -1 : 0;
  // });
}

const MapChart = () => {
  // const { nodes, bestBlock } = useData();

  // const mapOptions = {
  //   chart: {
  //     map: 'countries/ie/ie-all',
  //   },
  //   title: {
  //     text: ' ',
  //   },
  //   credits: {
  //     enabled: false,
  //   },
  //   mapNavigation: {
  //     enabled: false,
  //   },
  //   tooltip: {
  //     headerFormat: '',
  //     pointFormat: 'lat: {point.lat}, lon: {point.lon}',
  //   },
  //   series: [
  //     {
  //       // Use the gb-all map with no data as a basemap
  //       name: 'Basemap',
  //       mapData: mapDataIE,
  //       borderColor: '#A0A0A0',
  //       nullColor: 'rgba(200, 200, 200, 0.3)',
  //       showInLegend: false,
  //     },
  //     {
  //       // Specify points using lat/lon
  //       type: 'mapbubble',
  //       name: 'Locations',
  //       color: '#4169E1',
  //       data: [{ z: 10, keyword: 'Galway', lat: 53.27, lon: -9.25 }],
  //       cursor: 'pointer',
  //       point: {
  //         events: {
  //           click: function () {
  //             console.log(this.keyword);
  //           },
  //         },
  //       },
  //     },
  //   ],
  // };

  // var baseMapPath = 'https://code.highcharts.com/mapdata/custom/world.js',
  //   showDataLabels = false,
  //   mapCount = 0,
  //   searchText,
  //   mapOptions = '';

  // var mapGeoJSON = Highcharts.maps['custom/world'];

  // console.log('my: ', mapGeoJSON);

  // const options = {};

  // useEffect(() => {
  //   (async () => {

  //     const baseMapPath =
  //       'https://code.highcharts.com/mapdata/custom/world.topo.json';

  //     let showDataLabels = false,
  //       mapCount = 0,
  //       mapOptions = '';

  //     const mapData = await fetch(baseMapPath)
  //       .then((response) => {
  //         return response.json();
  //       })
  //       .catch((e) => console.log('Error in map', e));

  //     const data = mapData.objects.default.geometries.map((g, value) => ({
  //       key: g.properties['hc-key'],
  //       value,
  //     }));

  //     Highcharts.mapChart('map-container', {
  //       chart: {
  //         map: mapData,
  //       },

  //       title: {
  //         text: null,
  //       },

  //       accessibility: {
  //         series: {
  //           descriptionFormat:
  //             '{series.name}, map with {series.points.length} areas.',
  //           pointDescriptionEnabledThreshold: 50,
  //         },
  //       },

  //       mapNavigation: {
  //         enabled: true,
  //         buttonOptions: {
  //           alignTo: 'spacingBox',
  //           x: 10,
  //         },
  //       },

  //       colorAxis: {
  //         min: 0,
  //         stops: [
  //           [0, '#EFEFFF'],
  //           [0.5, Highcharts.getOptions().colors[0]],
  //           [
  //             1,
  //             Highcharts.color(Highcharts.getOptions().colors[0])
  //               .brighten(-0.5)
  //               .get(),
  //           ],
  //         ],
  //       },

  //       legend: {
  //         layout: 'vertical',
  //         align: 'left',
  //         verticalAlign: 'bottom',
  //       },

  //       series: [
  //         {
  //           data,
  //           joinBy: ['hc-key', 'key'],
  //           name: 'Random data',
  //           dataLabels: {
  //             enabled: showDataLabels,
  //             style: {
  //               fontWeight: 100,
  //               fontSize: '10px',
  //               textOutline: 'none',
  //             },
  //           },
  //         },
  //         {
  //           type: 'mapline',
  //           name: 'Lines',
  //           accessibility: {
  //             enabled: false,
  //           },
  //           data: Highcharts.geojson(mapData, 'mapline'),
  //           nullColor: '#333333',
  //           showInLegend: false,
  //           enableMouseTracking: false,
  //         },
  //       ],
  //     });
  //   })();
  // }, []);

  // return (
  //   <HighchartsReact
  //     constructorType={'mapChart'}
  //     highcharts={Highcharts}
  //     options={options}
  //   />
  // );

  return (
    <div id="countries" style={{ minHeight: '500px' }}>
      <div id="mapBox">
        <div id="up">&nbsp;</div>
        <div>
          <select id="mapDropdown"></select>
        </div>
        <div id="container">
          <div id="overlay">Spinner</div>
        </div>
      </div>
    </div>
  );
};

export default MapChart;
