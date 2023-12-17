// @ts-nocheck
import { useState, useEffect } from 'react';
import _ from 'lodash';

import { useData } from '@/contexts/data/use-data';
import { IContinentItem, ICountryNode, IGeoNode } from '@/types';
import {
  calculateContinentStake,
  formatEtherAmount,
  getGeos,
  groupedByCountry,
} from '@/utils';
import WidgetList from '@/components/widget-list';
import Loader from '@/components/ui/loader';

const baseMapPath =
  'https://code.highcharts.com/mapdata/custom/world.topo.json';

const MapChart = () => {
  const { nodes } = useData();
  const [isLoading, setIsLoading] = useState(true);
  const [markers, setMarkers] = useState<IGeoNode[]>([]);
  const [continents, setContinents] = useState<IContinentItem[]>([]);
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
        const mapChartOptions: Highcharts.Options = {
          chart: {
            map: mapData,
          },
          title: '',
          credits: {
            enabled: false,
          },
          mapNavigation: {
            enabled: true,
            buttonOptions: {
              align: 'right',
              verticalAlign: 'bottom',
            },
          },
          tooltip: {
            headerFormat: '',
            // @ts-ignore
            pointFormatter: function (): string {
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
                  gridSize: 100,
                },
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
              mapData,
              joinBy: ['hc-key', 'key'],
              name: 'Data',
            },
            {
              type: 'mappoint',
              name: 'Nodes',
              color: Highcharts.getOptions().colors[0],
              enableMouseTracking: true,
              data: markers,
              dataLabels: {
                verticalAlign: 'top',
              },
            },
          ],
        };

        Highcharts.mapChart('map-container', mapChartOptions);
        setContinents(calculateContinentStake(mapData, countries));
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
        <WidgetList isLoading={isLoading} data={continents} />
      </div>
    </>
  );
};

export default MapChart;
