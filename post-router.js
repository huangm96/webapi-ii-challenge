const express = require("express");

const dbModel = require("./data/db.js");

const router = express.Router();



router.get("/", (req, res) => {
  dbModel
    .find()
    .then(post => {
      res.status(200).send(post);
    })
    .catch(error => {
      res.status(500).json({
        error: "The posts information could not be retrieved."
      });
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  dbModel
    .findById(id)
    .then(post => {
      if (post[0]) {
        res.send(post);
      } else {
        res.status(404).json({
          message: "The post with the specified ID does not exist."
        });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." });
    });
});

router.get("/:id/comments", (req, res) => {
  const id = req.params.id;
  dbModel
    .findCommentById(id)
    .then(comment => {
      if (comment[0]) {
        res.send(comment);
      } else {
        res.status(404).json({
          message: "The post with the specified ID does not exist."
        });
      }
    })
    .catch(() => {
      res
        .status(500)
        .json({ error: "The comments information could not be retrieved." });
    });
});

router.post("/", (req, res) => {
  if (!req.body.title || !req.body.contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  } else {
    dbModel
      .insert(req.body)
      .then(post => {
        res.status(201).json(req.body);
      })
      .catch(error => {
        res.status(500).json({
          error: "There was an error while saving the post to the database"
        });
      });
  }
});

router.post("/:id/comments", (req, res) => {
  if (!req.body.text) {
    res.status(400).json({
      errorMessage: "Please provide text for the comment."
    });
  } else {
    dbModel
      .insertComment(req.body)
      .then(comment => {
        if (comment) {
          res.status(201).json(req.body);
        } else {
          res.status(404).json({
            message: "The post with the specified ID does not exist."
          });
        }
      })
      .catch(() => {
        res.status(500).json({
          error: "There was an error while saving the comment to the database"
        });
      });
  }
});

router.delete("/:id", (req, res) => {
  dbModel
    .remove(req.params.id)
    .then(post => {
      if (post) {
        res.status(201).json(post);
      } else {
        res.status(404).json({
          message: "The user with the specified ID does not exist."
        });
      }
    })
    .catch(() => {
      res.status(500).json({
        error: "The post could not be removed"
      });
    });
});

router.put("/:id", (req, res) => {
  if (!req.body.title || !req.body.contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  } else {
    dbModel
      .update(req.params.id, req.body)
      .then(post => {
        if (post) {
          res.status(200).json(req.body);
        } else {
          res.status(404).json({
            message: "The post with the specified ID does not exist."
          });
        }
      })
      .catch(() => {
        res.status(500).json({
          error: "The post information could not be modified."
        });
      });
  }
});




module.exports = router;