import Subreddit from "../model/Subreddit.js"
import bcrypt from "bcrypt";

export const subredditcreate = async (req, res) => {
  try {
    const userchecke = await Subreddit.findOne({
      $or: [
        { email: req.body.email }]
    });
    if (userchecke) {
      return res.status(208).send(
        {
          status: false,
          msg: "user is already exises!",
          data: null
        })
    }
    req.body.password = await bcrypt.hash(req.body.password, 10)
    const usercreate = await Subreddit.create(req.body);

    return res.status(201).send(
      {
        status: true,
        msg: "user is create!",
        data: usercreate
      });


  } catch (err) {
    console.log(err)
  }



}


//////getSubreddit//////


export const Getsubreddit = async (req, res) => {
  const subredditId = await Subreddit.findById(req.params._id);
  if (!subredditId) {
    res.status(400).send(
      {
        status: false,
        msg: "subreddit not found!",
        data: null
      })
  }
  const subredditGet = await Subreddit.findById(subredditId)
  res.status(200).send(
    {
      status: true,
      msg: "subreddit data is successfully",
      data: subredditGet
    })
}



////updateSubreddit/////

export const updateSubreddit = async (req, res) => {
  try {
    const SubredditId = await Subreddit.findById(req.params._id)
    if (!SubredditId) {
      return res.status(400).send(
        {
          status: false,
          msg: "subreddit not found",
          data: null
        })
    }

    req.body.password = await bcrypt.hash(req.body.password, 10);
    const SubredditUpdate = await Subreddit.findByIdAndUpdate(SubredditId, req.body)
    res.status(200).send(
      {
        status: true,
        msg: "SubredditUpdate successfully",
        data: SubredditUpdate
      })

  } catch (err) {
    console.log(err)
  }
}

///deleteSubreddit//////////
export const deleteSubreddit = async (req, res) => {
  try {
    const SubredditId = await Subreddit.findById(req.params._id);
    if (!SubredditId) {

      return res.status(404).send(
        {
          status: false,
          msg: "Subreddit not found?"
        })
    }
    const SubredditDelete = await Subreddit.findByIdAndDelete(SubredditId)
    if (!SubredditDelete) {
      return res.status(400).send(
        {
          status: false,
          msg: "not delete data Bad request?"
        })
    }
    res.status(200).send({
      status: true,
      msg: "Subreddit delete successfully",
      data: SubredditDelete
    })
  } catch (err) {
    console.log(err)
  }
}


/////getAllSubreddits///////////////
export const SubredditAllData = async (req, res) => {
  try {
    const SubredditCheck = Subreddit.findOne({
      $or: [
        { email: req.body.email },
        { number: req.body.number }
      ],
    });
    if (!SubredditCheck) {
      res.status(400).send(
        {
          status: false,
          msg: "Subreddit data check and agen"
        });
    }
    const SubredditData = await Subreddit.find();
    res.status(200).send(
      {
        status: true,
        msg: "SubredditData is successfully data",
        data: SubredditData
      });
  } catch (err) {
    console.log(err);
  }
};