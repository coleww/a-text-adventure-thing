export default [
  {
    id: 1,
    description: 'Center of a quiet town',
    name: 'home',
    north: 2,
    south: 3,
    east: 4,
    west: 5
  },
  {
    id: 2,
    description: 'At the entrance to town, shud u stay or shud u go?',
    name: 'main gate',
    south: 1,
    north: 3
  },
  {
    id: 3,
    description: 'You gaze at the edge of the planet. You feel deja vu.',
    name: 'main road',
    north: 1,
    south: 2
  },
  {
    id: 4,
    description: 'A lovely garden surrounded by walls.',
    name: 'inner gate',
    west: 1
  },
  {
    id: 5,
    description: 'Garbage as far as the eye can see.',
    name: 'junkyard',
    east: 1
  },
];
