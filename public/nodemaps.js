var baseMapPath = 'https://code.highcharts.com/mapdata/',
  showDataLabels = false,
  mapCount = 0,
  searchText,
  mapOptions = '';

if (typeof window !== 'undefined') {
  window.proj4 = window.proj4 || proj4;
}

$.each(Highcharts.mapDataIndex, function (mapGroup, maps) {
  if (mapGroup !== 'version') {
    mapOptions += '<option class="option-header">' + mapGroup + '</option>';
    $.each(maps, function (desc, path) {
      mapOptions += '<option value="' + path + '">' + desc + '</option>';
      mapCount += 1;
    });
  }
});

const colorAxis = {
  min: 0,
  stops: [
    [0, '#efefff'],
    [0.5, Highcharts.getOptions().colors[0]],
    [
      1,
      Highcharts.color(Highcharts.getOptions().colors[0]).brighten(-0.5).get(),
    ],
  ],
};

searchText = 'Search ' + mapCount + ' maps';
mapOptions =
  '<option value="custom/world.js">' + searchText + '</option>' + mapOptions;
$('#mapDropdown').append(mapOptions);
$('#mapDropdown').change(function () {
  //   var $selectedItem = $('option:selected', this),
  // mapDesc = $selectedItem.text(),
  var mapKey = this.value.slice(0, -3),
    javascriptPath = baseMapPath + this.value;
  // isHeader = $selectedItem.hasClass('option-header');
  //   if (mapDesc === searchText || isHeader) {
  //     $('.custom-combobox-input').removeClass('valid');
  //     location.hash = '';
  //   } else {
  //     $('.custom-combobox-input').addClass('valid');
  //     location.hash = mapKey;
  //   }
  //   if (isHeader) {
  //     return false;
  //   }
  //   if (Highcharts.charts[Highcharts.charts.length - 1]) {
  //     Highcharts.charts[Highcharts.charts.length - 1].showLoading(
  //       '<i class="fa fa-spinner fa-spin fa-2x"></i>'
  //     );
  //   }

  function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
      sURLVariables = sPageURL.split('&'),
      sParameterName,
      i;
    for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split('=');
      if (sParameterName[0] === sParam) {
        return sParameterName[1] === undefined ? true : sParameterName[1];
      }
    }
  }

  function mapReady() {
    var mapGeoJSON = Highcharts.maps[mapKey],
      range = getUrlParameter('range'),
      data = [],
      parent,
      cn,
      additional = '',
      match;
    match = mapKey.match(/^countries\/[a-z]{2}\/[a-z]{2}-all$/);
    if (!range) range = 1;
    if (match === null) {
      _match = mapKey.match(/^(countries\/[a-z]{2}\/[a-z]{2})-[a-z0-9]+-all$/);
      if (_match === null) cn = null;
      else cn = mapKey.split('/')[2].replace('-all', '');
    } else cn = mapKey.split('/')[1];
    if (cn) {
      if (cn.indexOf('-') !== -1) additional = '2,' + cn;
      else additional = '1,' + cn;
    }

    $.ajax({
      dataType: 'json',
      type: 'get',
      url: 'https://etherscan.io/stats_nodehandler.ashx?t=1&chainId=1',
      data: {
        code: cn,
        range: range,
        additional: additional,
      },
      success: function (_data) {
        LoadMap(mapGeoJSON, _data);
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        console.log(textStatus);
        console.log(errorThrown);
      },
    });
  }

  function LoadMap(mapGeoJSON, data) {
    match = mapKey.match(/^(countries\/[a-z]{2}\/[a-z]{2})-[a-z0-9]+-all$/);
    if (/^countries\/[a-z]{2}\/[a-z]{2}-all$/.test(mapKey)) {
      parent = {
        desc: 'World',
        key: 'custom/world',
      };
    } else if (match) {
      parent = {
        desc: $('option[value="' + match[1] + '-all.js"]').text(),
        key: match[1] + '-all',
      };
    }
    $('#up').html('');
    var _match = mapKey.match(/^countries\/[a-z]{2}\/[a-z]{2}-all$/);
    if (_match) {
      $('#up').append(
        $('<a>Return to world map view</a>')
          .attr({
            title: parent.key,
          })
          .click(function (e) {
            $('#mapDropdown')
              .val(parent.key + '.js')
              .change();
          })
      );
    }
    var series1 = [
      {
        mapData: mapGeoJSON,
        data: data,
        joinBy: ['hc-key', 'key'],
        states: {
          hover: {
            lineWidth: 0,
            lineWidthPlus: 0,
            color: Highcharts.getOptions().colors[2],
          },
        },
        tooltip: {
          headerFormat: '{point.name}',
          pointFormat: '{point.name}<br> {point.formattedValue}',
        },
        dataLabels: {
          enabled: showDataLabels,
          formatter: function () {
            return mapKey === 'custom/world' || mapKey === 'countries/us/us-all'
              ? this.point.properties && this.point.properties['hc-a2']
              : this.point.name;
          },
        },
        point: {
          events: {
            click: function () {
              var key = this.key;
              if (key.indexOf('-') === -1) {
                $('#mapDropdown option').each(function () {
                  if (
                    this.value ===
                    'countries/' + key.substr(0, 2) + '/' + key + '-all.js'
                  ) {
                    $('#mapDropdown').val(this.value).change();
                  }
                });
              }
            },
          },
        },
      },
      {
        type: 'mapline',
        name: 'Separators',
        data: Highcharts.geojson(mapGeoJSON, 'mapline'),
        nullColor: 'gray',
        showInLegend: false,
        enableMouseTracking: false,
      },
    ];

    var seriesgeo = {
      type: 'mapbubble',
      name: 'Cities',
      showInLegend: false,
      color: '#3498db',
      data: data,
      minSize: '3%',
      maxSize: '12%',
      tooltip: {
        headerFormat: '{point.name}',
        pointFormat: '{point.name}<br> {point.formattedValue}',
      },
    };
    var _series = series1;

    if (_match) {
      _series[0].tooltip = {
        headerFormat: '{point.name}',
        pointFormat: '{point.name}',
      };
      _series[0].legend = {
        enabled: false,
      };
      _series.push(seriesgeo);

      console.log('data; ', data);
      console.log('_series; ', _series);

      $('#container').highcharts('Map', {
        // title: {
        //   text: capitalizeFirstLetter(data[0].country),
        //   align: 'right',
        //   y: 480,
        // },
        // mapNavigation: {
        //   enabled: true,
        //   buttonOptions: {
        //     style: {
        //       color: '#bebebe',
        //     },
        //   },
        // },
        title: {
          text: null,
        },
        colorAxis,
        credits: {
          enabled: false,
        },
        legend: {
          enabled: false,
        },
        series: _series,
      });
    } else {
      $('#container').highcharts('Map', {
        title: {
          text: null,
        },
        // mapNavigation: {
        //   enabled: true,
        //   buttonOptions: {
        //     style: {
        //       color: '#BEBEBE',
        //     },
        //   },
        // },
        colorAxis,
        credits: {
          enabled: false,
        },
        legend: {
          layout: 'vertical',
          align: 'left',
          verticalAlign: 'bottom',
        },
        series: _series,
      });
    }
  }

  console.log('mapKey: ', mapKey);

  if (Highcharts.maps[mapKey]) {
    mapReady();
  } else {
    $.getScript(javascriptPath, mapReady);
  }
  if (sessionStorage.scrollTop !== 'undefined') {
    $(window).scrollTop(sessionStorage.scrollTop);
  }
});

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
if (location.hash) {
  $('#mapDropdown').val(location.hash.substr(1) + '.js');
} else {
  $($('#mapDropdown option')[0]).attr('selected', 'selected');
}
$('#mapDropdown').change();
