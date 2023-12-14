import { useState, useEffect } from 'react';
import _ from 'lodash';

// import { ethers } from 'ethers';
// import { Number } from '@/lib/helpers/number';
// import Highcharts from 'highcharts';
// import HighchartsReact from 'highcharts-react-official';
// import highchartsMap from 'highcharts/modules/map';
// import mapDataIE from '@highcharts/map-collection/countries/ie/ie-all.geo.json';
// highchartsMap(Highcharts);

import WidgetList from '@/components/widget-list';
import { useData } from '@/contexts/data/use-data';
import { ICountryNode, IGeoNode } from '@/types';
import {
  calculateContinentStake,
  formatEtherAmount,
  getGeos,
  groupedByCountry,
} from '@/utils';
import Loader from '../ui/loader';

const baseMapPath =
  'https://code.highcharts.com/mapdata/custom/world.topo.json';

const MapChart = () => {
  const { nodes } = useData();
  const [isLoading, setIsLoading] = useState(true);
  const [markers, setMarkers] = useState<IGeoNode[]>([]);
  const [continents, setContinents] = useState([]);
  const [countries, setCountries] = useState<ICountryNode[]>([]);

  useEffect(() => {
    if (nodes.length > 0) {
      setMarkers(getGeos(nodes));
      setCountries(Object.values(groupedByCountry(nodes)));
    }
  }, [nodes]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const topologyResponse = await fetch(baseMapPath);
        const mapData = await topologyResponse.json();

        setContinents(calculateContinentStake(mapData, countries));

        Highcharts.mapChart('map-container', {
          chart: {
            map: mapData,
          },
          credits: {
            enabled: false,
          },
          title: null,
          subtitle: null,
          mapNavigation: {
            enabled: true,
            align: 'right',
            buttonOptions: {
              align: 'right',
              verticalAlign: 'bottom',
            },
          },
          tooltip: {
            headerFormat: '',
            pointFormatter: function () {
              return (
                '<b>' +
                this.name +
                '</b><br>' +
                'Nodes: ' +
                this.value +
                '<br>' +
                'Total Stake: ' +
                formatEtherAmount(this.stake)
              );
            },
            clusterFormat: 'Clustered points: {point.clusterPointsAmount}',
          },
          colorAxis: {
            min: 0,
            stops: [
              [0, '#efefff'],
              [0.5, Highcharts.getOptions().colors[0]],
              [
                1,
                Highcharts.color(Highcharts.getOptions().colors[0])
                  .brighten(-0.2)
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
              tooltip: {
                pointFormatter: function () {
                  return (
                    'Nodes: ' +
                    this.count +
                    '<br>Total Stake: ' +
                    formatEtherAmount(this.stake)
                  );
                },
              },
            },
          },
          legend: {
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'bottom',
          },
          series: [
            {
              data: countries,
              mapData: mapData,
              joinBy: ['hc-key', 'key'],
              name: 'Data',
            },
            {
              type: 'mappoint',
              name: 'Nodes',
              color: Highcharts.getOptions().colors[0],
              enableMouseTracking: true,
              // marker: {
              //   fillColor: '#ff5e0d',
              //   radius: 6,
              //   symbol: 'circle',
              // },
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

    if (markers.length > 0 && countries.length > 0) {
      fetchData();
      setIsLoading(false);
    }
  }, [markers, countries]);

  return (
    <>
      <div className="panel !px-3 !py-5 col-span-3">
        <div className="flex items-center justify-center" id="map-container">
          {isLoading && <Loader variant="scaleUp" />}
        </div>
      </div>
      <div className="panel !p-8 col-span-1">
        <WidgetList data={continents} />
      </div>
    </>
  );
};

export default MapChart;
