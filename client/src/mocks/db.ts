import { factory, manyOf, oneOf, primaryKey } from '@mswjs/data';

export const db = factory({
    user: {
        id: primaryKey(String),
        username: String,
        currentProgram: oneOf('programs')
    },
    programs: {
        id: primaryKey(String),
        user: oneOf('user'),
        name: String,
        startDate: Date,
        duration: Number,
        endDate: Date,
        trainingBlocks: manyOf('trainingBlocks'),
    },
    trainingBlocks: {
        id: primaryKey(String),
        name: String,
        user: oneOf('user'),
        workoutBlocks: manyOf('workoutBlocks')
    },
    workoutBlocks: {
        id: primaryKey(String),
        name: String,
        user: oneOf('user'),
        workouts: manyOf('workouts')
    },
    workouts: {
        id: primaryKey(String),
        name: String,
        user: oneOf('user'),
        progressionRules: Object,
        exercises: Array
    }
})

db.user.create({
    id: "user1",
    username: "user1"
})