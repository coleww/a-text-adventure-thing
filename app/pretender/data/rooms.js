export default [
  {
    id: 1,
    description: 'in the center of a quiet town',
    name: 'home',
    north: 2,
    south: 3,
    east: 4,
    west: 5,
    items: [1]
  },
  {
    id: 2,
    description: 'at the entrance to town, shud u stay or shud u go?',
    name: 'main gate',
    south: 1,
    north: 3
  },
  {
    id: 3,
    description: 'staring at the edge of the planet. You feel deja vu.',
    name: 'main road',
    north: 1,
    south: 2
  },
  {
    id: 4,
    description: 'resting in a lovely garden surrounded by walls.',
    name: 'inner gate',
    west: 1
  },
  {
    id: 5,
    description: 'surrounded by garbage as far as the eye can see.',
    name: 'junkyard',
    east: 1
  },
];