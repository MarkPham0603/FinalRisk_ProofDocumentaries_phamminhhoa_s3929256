const express = require("express");
const cors = require("cors");
const { users, links } = require("./data");

const app = express();
const port = 2222;

app.use(cors());

app.get('/users', (req, res) => {
  const usersData = users.map(({ id, name }) => ({ id, name }));
  res.json(usersData);
});

app.get('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(user => user.id === userId);

  if (!user) {
    return res.status(404).json({   
    msg: 'User not found' });
  }

  const followingCount = links.filter(link => link.from === userId).length;
  const followerCount = links.filter(link => link.to === userId).length;
  const followingList = links
    .filter((link) => link.from === userId)
    .map((link) => link.to);
  
  const followerList = links
    .filter((link) => link.to === userId)
    .map((link) => link.from);
  res.json({ id: user.id, name: user.name, following_count: followingCount, follower_count: followerCount, following_list: followingList, 
    follower_list: followerList
   });
});

app.post('/users/:from_id/follow/:to_id', (req, res) => {
  const fromId = parseInt(req.params.from_id);
  const toId = parseInt(req.params.to_id);

  if (fromId === toId) {
    return res.status(400).json({ msg: 'Cannot follow yourself' });
  }

  const existingLink = links.find(link => link.from === fromId && link.to === toId);
  if (existingLink) {
    links.splice(links.indexOf(existingLink), 1);
    return res.json({ msg: 'removed' });
  }

  links.push({ from: fromId, to: toId });
  return res.json({ msg: 'added' });
});

app.post('/users/:from_id/unfollow/:to_id', (req, res) => {
  const fromId = parseInt(req.params.from_id);
  const toId = parseInt(req.params.to_id);

  const existingLink = links.find(link => link.from === fromId && link.to === toId);
  if (!existingLink) {
    return res.status(400).json({ msg: 'Already unfollowed' });
  }

  links.splice(links.indexOf(existingLink), 1);
  res.json({ msg: 'unfollowed' });
});

app.all("*", (req, res) => {
  res.status(404).json({ msg: "not found" });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
