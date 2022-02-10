'use strict';
import axios from 'axios';
import express, { Router } from 'express';
import SavedReq from '../models/savedReqModel';
import bodyParser from 'body-parser';
import { validInputs } from '../utils/validInputs';

const router = Router();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

module.exports = router;

/* 1. 2-letter state abbreviation is entered as a parameter in query;
2. respective data from the external API is fetched and served as a response;
3. a new entry is created in database, consisting of:
  - auto-generated unique id;
  - response data from the external api as a nested object;
  - created at date/time;
*/
router.route('').get(async (req, res) => {
  if (validInputs.includes(req.query.state.toUpperCase())) {
    const stateName = req.query.state;
    let apiUrl = `https://api.covidtracking.com/v1/states/${stateName.toLowerCase()}/current.json`;
    try {
      const result = await axios({
        url: `${apiUrl}`,
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
      });
      try {
        const savedReq = new SavedReq({
          savedRequest: result.data,
        });
        await savedReq.save();
        return res.status(200).send(savedReq);
      } catch (err) {
        res.status(400).send({ error: err.message });
      }
    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  } else {
    return res.status(400).send({
      error:
        'Input is not valid. Enter an existing state (two-letter abbreviation).',
    });
  }
});

// Get all saved entries:
router.route('/all').get(async (req, res) => {
  try {
    const { limit, skip } = req.query;
    const result = await SavedReq.find()
      .limit(limit)
      .skip(skip)
      .sort('-createdAt');
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

// Get/Delete by ID:
router
  .route('/:id')
  .get(async (req, res) => {
    const id = req.params.id;
    try {
      const result = await SavedReq.findById(id);
      if (result) {
        const info = result.savedRequest;
        res.status(200).send(info);
      } else {
        res
          .status(400)
          .send({ error: 'Document with such ID does not exist.' });
      }
    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  })
  .delete(async (req, res) => {
    const id = req.params.id;
    try {
      const idExists = await SavedReq.findById(id);
      if (!idExists) {
        res
          .status(400)
          .send({ error: 'Document with such ID does not exist.' });
      } else {
        const result = await SavedReq.deleteOne({ _id: id });
        res.status(200).send({
          msg: `Document with ID ${id} has been deleted from database.`,
        });
      }
    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  });
