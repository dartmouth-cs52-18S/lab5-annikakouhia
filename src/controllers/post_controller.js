import Post from '../models/post_model';

export const createPost = (req, res) => {
  const post = new Post();
  post.title = req.body.title;
  post.tags = req.body.tags;
  post.contents = req.body.contents;
  post.cover_url = req.body.cover_url;
  post.author = req.user;
  post.username = req.user.username;
  post.save()
    .then((result) => {
      // res.json({ message: 'Post created!' });
      res.json('another post created');
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const getPosts = (req, res) => {
  // got this from mongoosejs docs online
  Post.find({})
    .then((result) => {
      // res.json({ message: 'found all the posts!' });
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const getPost = (req, res) => {
  Post.findOne({ _id: req.params.id })
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const deletePost = (req, res) => {
  Post.findOne({ _id: req.params.id, author: req.user }).remove()
    .then((result) => {
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const updatePost = (req, res) => {
  return Post.findOne({ _id: req.params.id, author: req.user })
    .then((result) => {
      result.title = req.body.title;
      result.tags = req.body.tags;
      result.contents = req.body.contents;
      result.cover_url = req.body.cover_url;
      result.save();
    })
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
