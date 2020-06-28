import { Router } from 'express';
var router = Router();

var { addHabit, getHabits, updatehabit, setReminder } = require('../controller/renderController').default;
var { createHabit, updateOneHabit, deleteHabit } = require('../controller/habitController').default;

//get add habit page
router.get('/dashboard/add/:userId', addHabit);

//get habits on dashbaord
router.get('/dashboard/view/:userId', getHabits);

//get update habit page
router.get('/update/:Id', updatehabit);

//add habit
router.post('/dashboard/add/:userId', createHabit);

//update habit
router.patch('/dashboard/edit', updateOneHabit);

//delete habit
router.delete('/delete/:Id', deleteHabit);

//Set Reminder
router.get('/dashboard/reminder/:Id', setReminder)

export default router;