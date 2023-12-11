import moment from 'moment';
import _ from 'lodash';

export const checkData = (node, path, defaultValue = null) => {
  const data = _.get(node, path, defaultValue);

  return !_.isNaN(data) &&
    !_.isNull(data) &&
    !_.isUndefined(data) &&
    (!_.isString(data) || data.length)
    ? data
    : 'data is loading...';
};

export const formatBestBlockNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '\u00A0\u00A0');
};

export const lastBlockTime = (timestamp) => {
  if (timestamp === 0) return '∞';

  let time = new Date().getTime();
  const diff = Math.floor((time - timestamp) / 1000);

  if (diff < 60) return Math.round(diff) + ' s ago';

  return moment.duration(Math.round(diff), 's').humanize() + ' ago';
};

export const blockPropagationFilter = (ms, prefix = '+') => {
  let result = 0;

  if (ms < 1000) {
    return (ms === 0 ? '' : prefix) + ms + ' ms';
  }

  if (ms < 1000 * 60) {
    result = ms / 1000;
    return prefix + result.toFixed(1) + ' s';
  }

  if (ms < 1000 * 60 * 60) {
    result = ms / 1000 / 60;
    return prefix + Math.round(result) + ' min';
  }

  if (ms < 1000 * 60 * 60 * 24) {
    result = ms / 1000 / 60 / 60;
    return prefix + Math.round(result) + ' h';
  }

  result = ms / 1000 / 60 / 60 / 24;
  return prefix + Math.round(result) + ' days';
};

export const blockPropagationAvgFilter = (stats, bestBlock) => {
  let ms = stats.propagationAvg;

  if (bestBlock - stats.block.number > 40) {
    return '∞';
  }
  return blockPropagationFilter(ms, '');
};

export const hashFilter = (hash) => {
  if (!hash.length) return '';

  if (hash.substr(0, 2) === '0x') {
    hash = hash.substr(2, 64);
  }

  return hash.substr(0, 8) + '...' + hash.substr(56, 8);
};

export const latencyFilter = (node) => {
  if (_.isUndefined(node.readable)) node.readable = {};

  if (_.isUndefined(node.stats)) {
    node.readable.latencyClass = 'text-danger';
    node.readable.latency = 'offline';
  }

  if (node.stats.active === false) {
    node.readable.latencyClass = 'text-danger';
    node.readable.latency = 'offline';
  } else {
    if (node.stats.latency <= 3000) node.readable.latencyClass = 'success';

    if (node.stats.latency > 3000 && node.stats.latency <= 5000)
      node.readable.latencyClass = 'warning';

    if (node.stats.latency > 5000) node.readable.latencyClass = 'danger';

    node.readable.latency = node.stats.latency + ' ms';
  }
  return node;
};

export const hashRateFilter = (hashes, isMining) => {
  let result = 0;
  let unit = 'K';

  if (!isMining)
    return '<span><span class="icon-cancel size-s icon"></span></span>';

  if (hashes !== 0 && hashes < 1000) {
    result = hashes;
    unit = '';
  }

  if (hashes >= 1000 && hashes < Math.pow(1000, 2)) {
    result = hashes / 1000;
    unit = 'K';
  }

  if (hashes >= Math.pow(1000, 2) && hashes < Math.pow(1000, 3)) {
    result = hashes / Math.pow(1000, 2);
    unit = 'M';
  }

  if (hashes >= Math.pow(1000, 3) && hashes < Math.pow(1000, 4)) {
    result = hashes / Math.pow(1000, 3);
    unit = 'G';
  }

  if (hashes >= Math.pow(1000, 4) && hashes < Math.pow(1000, 5)) {
    result = hashes / Math.pow(1000, 4);
    unit = 'T';
  }

  return (
    '<span class="small">' +
    result +
    ' <span class="small-hash">' +
    unit +
    'H/s</span></span>'
  );
};

export const hashRateClass = (mining, active) => {
  if (!mining || !active) return 'gray';

  return 'success';
};

export const peersClass = (peers, active) => {
  if (!active) return 'gray';

  return peers <= 1 ? 'danger' : peers > 1 && peers < 4 ? 'warning' : 'success';
};

export const blockClass = (current, best) => {
  if (!current.active) return 'gray';

  return best - current.block.number < 1
    ? 'success'
    : best - current.block.number === 1
    ? 'warning'
    : best - current.block.number > 1 && best - current.block.number < 4
    ? 'orange'
    : 'danger';
};

export const timeClass = (timestamp, active) => {
  if (!active) {
    return 'gray';
  } else {
    const diff = (new Date().getTime() - timestamp) / 1000;
    return blockTimeClass(diff);
  }
};

export const blockTimeClass = (diff) => {
  if (diff <= 13) return 'success';

  if (diff <= 20) return 'warning';

  if (diff <= 30) return 'orange';

  return 'danger';
};

export const propagationTimeClass = (stats, bestBlock) => {
  if (!stats.active) return 'gray';

  if (stats.block.number < bestBlock) return 'gray';

  if (stats.block.propagation === 0) return 'info';

  if (stats.block.propagation < 1000) return 'success';

  if (stats.block.propagation < 3000) return 'warning';

  if (stats.block.propagation < 7000) return 'orange';

  return 'danger';
};

export const propagationNodeAvgTimeClass = (stats, bestBlock) => {
  if (!stats.active) return 'gray';

  if (stats.block.number < bestBlock) return 'gray';

  if (stats.propagationAvg === 0) return 'info';

  if (stats.propagationAvg < 1000) return 'success';

  if (stats.propagationAvg < 3000) return 'warning';

  if (stats.propagationAvg < 7000) return 'orange';

  return 'danger';
};

export const blockTimeFilter = (timestamp) => {
  if (timestamp === 0) return '∞';

  // var time = Math.floor((new Date()).getTime() / 1000);
  const time = new Date().getTime();
  const diff = Math.floor((time - timestamp) / 1000);

  if (diff < 60) return Math.round(diff) + ' s ago';

  return moment.duration(Math.round(diff), 's').humanize() + ' ago';
};

export const avgTimeFilter = (time) => {
  return `${time} s`;
};

export const nodesActiveClass = (active, total) => {
  const ratio = active / total;

  if (ratio >= 0.9) return 'success';

  if (ratio >= 0.75) return 'info';

  if (ratio >= 0.5) return 'warning';

  return 'danger';
};

export const gasPriceFilter = (price) => {
  switch (true) {
    case typeof price === 'undefined':
      return '0 wei';

    case price.length < 4:
      return numberFilter(price) + ' wei';

    case price.length < 7:
      return numberFilter(price / 1000) + ' kwei';

    case price.length < 10:
      return numberFilter(price / 1000000) + ' mwei';

    case price.length < 13:
      return numberFilter(price / 1000000000) + ' gwei';

    case price.length < 16:
      return numberFilter(price / 1000000000000) + ' szabo';

    case price.length < 19:
      return numberFilter(price.substr(0, price.length - 15)) + ' finney';

    default:
      return numberFilter(price.substr(0, price.length - 18)) + ' ether';
  }
};

export const latencyClass = (latency) => {
  return latency <= 100 ? 'success' : latency <= 1000 ? 'warning' : 'danger';
};

const numberFilter = (number) => number.toString();
