// Sample tile data to populate game board - temporary
const types = ['sheep', 'ore', 'wheat', 'brick', 'wood'];
const getRandomType = () => types[Math.floor(Math.random() * 5)];
const getRandomRollval = () => Math.ceil(Math.random() * 12);

export default [
    {tile: [0, 0], data: {type: getRandomType(), rollVal: getRandomRollval()}},
    {tile: [0, 1], data: {type: getRandomType(), rollVal: getRandomRollval()}},
    {tile: [0, 2], data: {type: getRandomType(), rollVal: getRandomRollval()}},
    {tile: [1, 0], data: {type: getRandomType(), rollVal: getRandomRollval()}},
    {tile: [1, 1], data: {type: getRandomType(), rollVal: getRandomRollval()}},
    {tile: [1, 2], data: {type: getRandomType(), rollVal: getRandomRollval()}},
    {tile: [1, 3], data: {type: getRandomType(), rollVal: getRandomRollval()}},
    {tile: [2, 0], data: {type: getRandomType(), rollVal: getRandomRollval()}},
    {tile: [2, 1], data: {type: getRandomType(), rollVal: getRandomRollval()}},
    {tile: [2, 2], data: {type: getRandomType(), rollVal: getRandomRollval()}},
    {tile: [2, 3], data: {type: getRandomType(), rollVal: getRandomRollval()}},
    {tile: [2, 4], data: {type: getRandomType(), rollVal: getRandomRollval()}},
    {tile: [3, 0], data: {type: getRandomType(), rollVal: getRandomRollval()}},
    {tile: [3, 1], data: {type: getRandomType(), rollVal: getRandomRollval()}},
    {tile: [3, 2], data: {type: getRandomType(), rollVal: getRandomRollval()}},
    {tile: [3, 3], data: {type: getRandomType(), rollVal: getRandomRollval()}},
    {tile: [3, 4], data: {type: getRandomType(), rollVal: getRandomRollval()}},
    {tile: [3, 5], data: {type: getRandomType(), rollVal: getRandomRollval()}},
    {tile: [4, 0], data: {type: getRandomType(), rollVal: getRandomRollval()}},
    {tile: [4, 1], data: {type: getRandomType(), rollVal: getRandomRollval()}},
    {tile: [4, 2], data: {type: getRandomType(), rollVal: getRandomRollval()}},
    {tile: [4, 3], data: {type: getRandomType(), rollVal: getRandomRollval()}},
    {tile: [4, 4], data: {type: getRandomType(), rollVal: getRandomRollval()}},
    {tile: [5, 0], data: {type: getRandomType(), rollVal: getRandomRollval()}},
    {tile: [5, 1], data: {type: getRandomType(), rollVal: getRandomRollval()}},
    {tile: [5, 2], data: {type: getRandomType(), rollVal: getRandomRollval()}},
    {tile: [5, 3], data: {type: getRandomType(), rollVal: getRandomRollval()}},
    {tile: [6, 0], data: {type: getRandomType(), rollVal: getRandomRollval()}},
    {tile: [6, 1], data: {type: getRandomType(), rollVal: getRandomRollval()}},
    {tile: [6, 2], data: {type: getRandomType(), rollVal: getRandomRollval()}}
]
