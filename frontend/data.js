const demoPosts = Array.from({ length: 30 }, (_, index) => ({
  id: index + 1,
  user: `User ${index + 1}`,
  content: `This is post number ${index + 1}.`,
  image: `https://via.placeholder.com/300.png/${Math.floor(
    Math.random() * 16777215
  ).toString(16)}/fff`,
  likes: Math.floor(Math.random() * 100),
  comments: [
    {
      id: 1,
      user: `Commenter ${Math.floor(Math.random() * 10)}`,
      text: `Comment text for post ${index + 1}.`,
    },
  ].slice(0, Math.floor(Math.random() * 5)),
  timestamp: new Date(
    Date.now() - Math.floor(Math.random() * 10000000000)
  ).toISOString(),
}));

export default demoPosts;
