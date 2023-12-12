import { useState, useEffect } from 'react';
import _ from 'lodash';

// import Highcharts from 'highcharts';
// import HighchartsReact from 'highcharts-react-official';
// import highchartsMap from 'highcharts/modules/map';
// import mapDataIE from '@highcharts/map-collection/countries/ie/ie-all.geo.json';
// highchartsMap(Highcharts);

import { useData } from '@/contexts/data/use-data';

function filterUniqueByKey(array, key) {
  const seen = new Set();
  return array.filter((obj) => {
    const value = obj[key];
    if (!seen.has(value)) {
      seen.add(value);
      return true;
    }
    return false;
  });
}

function getGeos(nodes) {
  // const pinned = JSON.parse(localStorage.pinned);

  const result = nodes.reduce((geos, node, i) => {
    return geos.concat({
      // address: node.info.name,
      // name: node.info.node,
      // id: node.id,
      // pinned: pinned.some((pin) => {
      //   const value = node.info.name.match(new RegExp('\\S+$', 'g'))[0];
      //   return new RegExp(value, 'i').test(pin);
      // }),

      key: _.get(node, 'geo.country').toLowerCase(),
      lat: _.get(node, 'geo.ll', [])[0],
      lon: _.get(node, 'geo.ll', [])[1],
      name: node.info.name.slice(-5),
      // coordinates: [_.get(node, 'geo.ll', [])[1], _.get(node, 'geo.ll', [])[0]],
    });
  }, []);

  return filterUniqueByKey(result, 'lat');
  // .sort((a, b) => {
  //   return a.pinned < b.pinned ? -1 : 0;
  // });
}

const MapChart = () => {
  const { nodes, bestBlock } = useData();
  const [markers, setMarkers] = useState([]);

  console.log('markers: ', markers);

  useEffect(() => {
    if (nodes.length > 0) {
      setMarkers(getGeos(nodes));
    }
  }, [nodes]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const baseMapPath = 'https://code.highcharts.com/mapdata/';

        const topologyResponse = await fetch(
          `${baseMapPath}custom/world.topo.json`
        );
        const mapData = await topologyResponse.json();

        const data = mapData.objects.default.geometries.map((g, value) => ({
          key: g.properties['hc-key'],
          value,
        }));

        // console.log(
        //   'data: ',
        //   mapData.objects.default.geometries.map((g, value) => {
        //     console.log('vaava; ', value);
        //   })
        // );

        Highcharts.mapChart('container', {
          chart: {
            map: mapData,
          },
          title: null,
          subtitle: null,
          mapNavigation: {
            enabled: true,
          },
          tooltip: {
            headerFormat: '',
            pointFormat:
              '<span>{point.name}</span>&nbsp;<b>{point.country}</b><br>Lat: {point.lat:.2f}, Lon: {point.lon:.2f}',
          },
          colorAxis: {
            min: 0,
            stops: [
              [0, '#efefff'],
              [0.5, Highcharts.getOptions().colors[0]],
              [
                1,
                Highcharts.color(Highcharts.getOptions().colors[0])
                  .brighten(-0.5)
                  .get(),
              ],
            ],
          },
          plotOptions: {
            mappoint: {
              cluster: {
                enabled: true,
                allowOverlap: false,
                animation: {
                  duration: 450,
                },
                layoutAlgorithm: {
                  type: 'grid',
                  gridSize: 70,
                },
                zones: [
                  {
                    from: 1,
                    to: 4,
                    marker: {
                      radius: 13,
                    },
                  },
                  {
                    from: 5,
                    to: 9,
                    marker: {
                      radius: 15,
                    },
                  },
                  {
                    from: 10,
                    to: 15,
                    marker: {
                      radius: 17,
                    },
                  },
                  {
                    from: 16,
                    to: 20,
                    marker: {
                      radius: 19,
                    },
                  },
                  {
                    from: 21,
                    to: 100,
                    marker: {
                      radius: 21,
                    },
                  },
                ],
              },
            },
          },
          legend: {
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'bottom',
          },
          series: [
            // {
            //   name: 'World',
            //   accessibility: {
            //     exposeAsGroupOnly: true,
            //   },
            //   borderColor: '#A0A0A0',
            //   nullColor: 'rgba(177, 244, 177, 0.5)',
            //   showInLegend: false,
            // },
            {
              data,
              mapData: mapData,
              joinBy: ['hc-key', 'key'],
              name: 'Random data',
              // dataLabels: {
              //   enabled: false,
              //   style: {
              //     fontWeight: 100,
              //     fontSize: '10px',
              //     textOutline: 'none',
              //   },
              // },
            },
            {
              type: 'mapline',
              name: 'Lines',
              accessibility: {
                enabled: false,
              },
              // /*
              // data: [{
              //     geometry: mapData.objects.default['hc-recommended-mapview'].insets[0].geoBounds
              // }],
              // // */
              nullColor: '#333',
              showInLegend: false,
              enableMouseTracking: false,
            },
            {
              type: 'mappoint',
              name: 'Nodes',
              enableMouseTracking: true,
              accessibility: {
                point: {
                  descriptionFormat:
                    '{#if isCluster}' +
                    'Grouping of {clusterPointsAmount} points.' +
                    '{else}' +
                    '{name}, country code: {country}.' +
                    '{/if}',
                },
              },
              // colorKey: 'clusterPointsAmount',
              data: markers,
              dataLabels: {
                verticalAlign: 'top',
              },
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (markers.length > 0) {
      fetchData();
    }
  }, [markers]);

  return (
    <div id="countries" style={{ minHeight: '500px' }}>
      <div id="container"></div>
    </div>
  );
};

export default MapChart;
