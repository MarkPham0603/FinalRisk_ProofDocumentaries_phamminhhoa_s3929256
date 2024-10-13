const users = [
  { id: 1, name: 'Alice', following: 0, followers: 0 },
  { id: 2, name: 'Bob', following: 0, followers: 0 },
  { id: 3, name: 'Carol', following: 0, followers: 0 },
  { id: 4, name: 'Pham Minh Hoa', following: 0, followers: 0 }
];

const links = [
  { from: 1, to: 2 },
  { from: 1, to: 3 },
  { from: 2, to: 1 },
  { from: 2, to: 3 },
  { from: 2, to: 4 },
  { from: 3, to: 2 },
  { from: 3, to: 4 },
  { from: 4, to: 2 },
  { from: 4, to: 3 }
];

exports.users = users;
exports.links = links
