var express = require('express');
var router = express.Router();

var { addHabit, getHabits, updatehabit } = require('../controller/renderController');
var { createHabit, updateOneHabit, deleteHabit } = require('../controller/habitController');

router.get('/dashboard/add/:userId', addHabit);
router.get('/dashboard/view/:userId', getHabits);
router.get('/update/:Id', updatehabit);

router.post('/dashboard/add/:userId', createHabit);
router.patch('/dashboard/edit', updateOneHabit);
router.delete('/dashboard/delete/:Id', deleteHabit)

module.exports = router;