// import _ from 'lodash';

// import { latencyFilter } from '@/lib/helpers/table';
// import * as Toast from '@/config/toast';

// const MAX_BINS = 40;

// const findIndex = (search) => _.findIndex(nodes, search);

// const addNewNode = (data) => {
//   const index = findIndex({ id: data.id });

//   if (_.isUndefined(data.history)) {
//     data.history = new Array(40);
//     _.fill(data.history, -1);
//   }

//   if (index < 0) {
//     if (!_.isUndefined(data.stats) && _.isUndefined(data.stats.hashrate)) {
//       data.stats.hashrate = 0;
//     }

//     data.pinned = false;

//     nodes.push(data);

//     return true;
//   }

//   data.pinned = !_.isUndefined(nodes[index].pinned)
//     ? nodes[index].pinned
//     : false;

//   if (!_.isUndefined(nodes[index].history)) {
//     data.history = nodes[index].history;
//   }

//   nodes[index] = data;
//   updateActiveNodes();
//   return false;
// };

// const updateActiveNodes = () => {
//   updateBestBlock();
//   setNodesTotal(nodes.length);
//   const data = _.filter(nodes, (node) => {
//     return node.stats.active === true;
//   }).length;

//   setNodesActive(data);
// };

// const updateBestBlock = () => {
//   if (nodes.length) {
//     const currentBestBlock = nodes.find((el) => {
//       return (
//         el.info.name.includes('atlas') && el.info.node.includes('OpenEthereum')
//       );
//     }).stats.block.number;
//     if (currentBestBlock && currentBestBlock !== bestBlock) {
//       setBestBlock(currentBestBlock);
//       const data = _.max(nodes, (node) => {
//         return parseInt(node.stats.block.number);
//       }).stats;
//       setBestStats(data);

//       bestStats && setLastBlock(bestStats.block.arrived);
//       lastDifficulty = bestStats && bestStats.block.difficulty;
//     }
//   }
// };

// export const socketAction = (action, data) => {
//   let index;
//   switch (action) {
//     case 'init':
//       data.forEach((node) => {
//         // Init hash rate
//         if (_.isUndefined(node.stats.hashrate)) node.stats.hashrate = 0;

//         // Init latency
//         latencyFilter(node);

//         // Init history
//         if (_.isUndefined(data.history)) {
//           data.history = new Array(40);
//           _.fill(data.history, -1);
//         }

//         pinned = localStorage.pinned && JSON.parse(localStorage.pinned);

//         // Init or recover pin
//         node.pinned = new RegExp(node.id).test(pinned);
//       });
//       break;
//     case 'block':
//       index = findIndex({ id: data.id });
//       if (index >= 0 && !_.isUndefined(nodes[index].stats)) {
//         if (nodes[index].stats.block.number < data.block.number) {
//           const best = _.max(nodes, (node) => {
//             return parseInt(node.stats.block.number);
//           }).stats.block;

//           if (data.block.number > best.number) {
//             data.block.arrived = _.now();
//           } else {
//             data.block.arrived = best.arrived;
//           }
//           nodes[index].history = data.history;
//         }

//         nodes[index].stats.block = data.block;
//         nodes[index].stats.propagationAvg = data.propagationAvg;
//       }
//       updateBestBlock();
//       break;
//     case 'add':
//       index = findIndex({ id: data.id });

//       if (addNewNode(data)) {
//         Toast.success(
//           'New node ' +
//             nodes[findIndex({ id: data.id })].info.name +
//             ' connected!',
//           'New node!'
//         );
//       } else {
//         Toast.info(
//           'Node ' + nodes[index].info.name + ' reconnected!',
//           'Node is back!'
//         );
//       }

//       break;
//     case 'update':
//       index = findIndex({ id: data.id });

//       if (
//         index >= 0 &&
//         !_.isUndefined(nodes[index]) &&
//         !_.isUndefined(nodes[index].stats)
//       ) {
//         if (!_.isUndefined(nodes[index].stats.latency))
//           data.stats.latency = nodes[index].stats.latency;

//         if (_.isUndefined(data.stats.hashrate)) data.stats.hashrate = 0;

//         if (nodes[index].stats.block.number < data.stats.block.number) {
//           const best = _.max(nodes, function (node) {
//             return parseInt(node.stats.block.number);
//           }).stats.block;

//           if (data.stats.block.number > best.number) {
//             data.stats.block.arrived = _.now();
//           } else {
//             data.stats.block.arrived = best.arrived;
//           }

//           nodes[index].history = data.history;
//         }

//         nodes[index].stats = data.stats;

//         if (
//           !_.isUndefined(data.stats.latency) &&
//           _.get(nodes[index], 'stats.latency', 0) !== data.stats.latency
//         ) {
//           nodes[index].stats.latency = data.stats.latency;

//           nodes[index] = latencyFilter(nodes[index]);
//         }

//         updateBestBlock();
//       }
//       break;
//     case 'pending':
//       index = findIndex({ id: data.id });

//       if (!_.isUndefined(data.id) && index >= 0) {
//         const node = nodes[index];

//         if (
//           !_.isUndefined(node) &&
//           !_.isUndefined(node.stats.pending) &&
//           !_.isUndefined(data.pending)
//         )
//           nodes[index].stats.pending = data.pending;
//       }
//       break;
//     case 'stats':
//       index = findIndex({ id: data.id });

//       if (!_.isUndefined(data.id) && index >= 0) {
//         const node = nodes[index];

//         if (!_.isUndefined(node) && !_.isUndefined(node.stats)) {
//           nodes[index].stats.active = data.stats.active;
//           nodes[index].stats.mining = data.stats.mining;
//           nodes[index].stats.hashrate = data.stats.hashrate;
//           nodes[index].stats.peers = data.stats.peers;
//           nodes[index].stats.gasPrice = data.stats.gasPrice;
//           nodes[index].stats.uptime = data.stats.uptime;

//           if (
//             !_.isUndefined(data.stats.latency) &&
//             _.get(nodes[index], 'stats.latency', 0) !== data.stats.latency
//           ) {
//             nodes[index].stats.latency = data.stats.latency;
//             latencyFilter(nodes[index]);
//           }
//           updateActiveNodes();
//         }
//       }
//       break;
//     case 'info':
//       index = findIndex({ id: data.id });

//       if (index >= 0) {
//         nodes[index].info = data.info;

//         if (_.isUndefined(nodes[index].pinned)) nodes[index].pinned = false;

//         // Init latency
//         latencyFilter(nodes[index]);
//         updateActiveNodes();
//       }
//       break;
//     case 'blockPropagationChart':
//       blockPropagationChart = data.histogram;
//       blockPropagationAvg = data.avg;
//       break;
//     case 'uncleCount':
//       uncleCount = uncleCount.data[0] + uncleCount.data[1];
//       data.reverse();
//       uncleCountChart = uncleCount.data;
//       break;
//     case 'charts':
//       if (!_.isEqual(avgBlockTime, data.avgBlocktime))
//         setAvgBlockTime(data.avgBlocktime / 24 / 60 / 60);

//       if (!_.isEqual(avgHashrate, data.avgHashrate))
//         avgHashrate = data.avgHashrate;

//       if (
//         !_.isEqual(lastGasLimit, data.gasLimit) &&
//         data.gasLimit.length >= MAX_BINS
//       )
//         lastGasLimit = data.gasLimit;

//       if (
//         !_.isEqual(lastBlocksTime, data.blocktime) &&
//         data.blocktime.length >= MAX_BINS
//       )
//         lastBlocksTime = data.blocktime;

//       if (
//         !_.isEqual(difficultyChart, data.difficulty) &&
//         data.difficulty.length >= MAX_BINS
//       )
//         difficultyChart = data.difficulty;

//       if (!_.isEqual(blockPropagationChart, data.propagation.histogram)) {
//         blockPropagationChart = data.propagation.histogram;
//         blockPropagationAvg = data.propagation.avg;
//       }

//       data.uncleCount.reverse();

//       if (
//         !_.isEqual(uncleCountChart, data.uncleCount) &&
//         data.uncleCount.length >= MAX_BINS
//       ) {
//         uncleCount =
//           data.uncleCount[data.uncleCount.length - 2] +
//           data.uncleCount[data.uncleCount.length - 1];
//         uncleCountChart = data.uncleCount;
//       }

//       if (
//         !_.isEqual(transactionDensity, data.transactions) &&
//         data.transactions.length >= MAX_BINS
//       )
//         transactionDensity = data.transactions;

//       if (
//         !_.isEqual(gasSpending, data.gasSpending) &&
//         data.gasSpending.length >= MAX_BINS
//       )
//         gasSpending = data.gasSpending;

//       if (!_.isEqual(miners, data.miners)) {
//         miners = data.miners;
//       }
//       break;
//     case 'inactive':
//       index = findIndex({ id: data.id });
//       if (index >= 0) {
//         if (!_.isUndefined(data.stats)) nodes[index].stats = data.stats;
//         updateActiveNodes();
//       }
//       break;
//     case 'latency':
//       if (!_.isUndefined(data.id) && !_.isUndefined(data.latency)) {
//         const index = findIndex({ id: data.id });

//         if (index >= 0) {
//           const node = nodes[index];
//           if (
//             !_.isUndefined(node) &&
//             !_.isUndefined(node.stats) &&
//             !_.isUndefined(node.stats.latency) &&
//             node.stats.latency !== data.latency
//           ) {
//             node.stats.latency = data.latency;
//             latencyFilter(node);
//           }
//         }
//       }
//       break;
//     case 'client-ping':
//       sendMessage(
//         JSON.stringify({
//           emit: [
//             'client-pong',
//             {
//               serverTime: data.serverTime,
//               clientTime: new Date().getTime(),
//             },
//           ],
//         })
//       );
//       break;
//     case 'client-latency':
//       setLatency(data.latency);
//       break;
//     default:
//       console.info('lost action:', action);
//   }
// };
