const express = require('express');
const requireAuth = require('../middelware/requireAuth')

const router = express.Router();

const {getAllWorkouts,createWorkout, getWorkout, updateWorkout, deleteWorkout } = require('../controllers/workoutController');


// require auth for all workouts
router.use(requireAuth)

router.post('/',createWorkout)


router.get('/',getAllWorkouts)

router.get('/:id', getWorkout)


router.put('/:id', updateWorkout)


router.delete('/:id', deleteWorkout)
module.exports = router