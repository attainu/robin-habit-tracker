import { Router } from 'express';
var router = Router();

var { addHabit, getHabits, updatehabit } = require('../controller/renderController').default;
var { createHabit, updateOneHabit, deleteHabit } = require('../controller/habitController').default;

router.get('/dashboard/add/:userId', addHabit);
router.get('/dashboard/view/:userId', getHabits);
router.get('/update/:Id', updatehabit);

router.post('/dashboard/add/:userId', createHabit);
router.patch('/dashboard/edit', updateOneHabit);
router.delete('/dashboard/delete/:Id', deleteHabit)

export default router;