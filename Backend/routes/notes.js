const express = require("express");
const router = express.Router();
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");
var fetchuser = require("../middleware/fetchuser");

//Route:1  Fetching all notes using: "Get"  dosn't require Auth: /api/notes

router.get("/fetchallnotes", fetchuser, async function (req, res) {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Error Occured");
  }
});

//Route:2  Adding  Notes notes using: "Post"  dosn't require Auth: /api/addnotes

router.post("/addnote",fetchuser,
  [
    body("title", "Enter a valid Title").isLength({ min: 5 }),
    body("description", "Enter a long desc").isLength({ min: 5 }),
  ],
  async (req, res) => {
    // if there are error show this
    try {
     
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()});
      }

      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      })

      const savednote = await note.save();
      res.json(savednote);

    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Error Occured");
    }
  })

//Route:3  Updating the notes using: "put"  dosn't require Auth: /api/notes

router.put("/updatenote/:id", fetchuser, async function (req, res) {
  const { title, description, tag } = req.body;

  // create new note

  const newNote = {};
  if(title){newNote.title=title};
  if(description){newNote.description=description};
  if(tag){newNote.tag=tag};

  let note = await  Notes.findById(req.params.id);
  if(!note) return res.status(401).send("Not Found")

  if(note.user.toString()!==req.user.id)
  {
    return res.status(401).send("Not Allowed")
  }

  note = await Notes.findByIdAndUpdate(req.params.id, {$set : newNote}, {new:true})
  res.json({note});
})

//Route: 4 Delete the notes using: "delete"  dosn't require Auth: /api/notes

router.delete("/deletenote/:id", fetchuser, async function (req, res) {
  const { title, description, tag } = req.body;

  //Finding the id

  let note = await  Notes.findById(req.params.id);
  if(!note) return res.status(401).send("Not Found")

  if(note.user.toString()!==req.user.id) {
    return res.status(401).send("Not Allowed")
  }

  note = await Notes.findByIdAndDelete(req.params.id);
  res.send("Success -> Your Note has been deleted")
})

module.exports = router;
