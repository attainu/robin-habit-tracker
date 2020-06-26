import Habit from "../model/habitSchema";
import User from "../model/userSchema";
import mongoose from "mongoose";

var habitController = {};

habitController.createHabit = async function(req, res) {
    try {
        var userId = req.params.userId;
        var habit = {
            title: req.body.title,
            body: req.body.body,
            priority: req.body.priority,
            reminder: req.body.reminder,
            goals: req.body.goals,
            createdBy: userId
        };
        var habit = new Habit(habit);
        await habit.save();
        console.log(habit)
        if (!habit.title ||
            !habit.body ||
            !habit.priority ||
            !habit.reminder ||
            !habit.goals
        )
            return res.redirect("/habit");

        else if (habit.createdBy == userId) return res.redirect(`/dashboard/view/${userId}`);
        else return res.render('dashboard', { message: "NO habits found, click Add habits to add one" });
    } catch (error) {
        console.log(error);
        res.render('dashboard', { message: error })
    }
};

habitController.updateOneHabit = async function(req, res) {
    var Id = req.query.Id;
    console.log(req.body);
    await Habit.updateOne({
        _id: Id,
    }, {
        $set: {
            title: req.body.title,
            body: req.body.body,
            priority: req.body.priority,
            reminder: req.body.reminder,
            goals: req.body.goals,
        },
    });
    return res.redirect(`/dashboard/view/${Id}`);
};

habitController.deleteHabit = async function(req, res) {
    var Id = req.query.Id;
    await Habit.deleteOne({
        _id: Id,
    }).then(function() {
        return res.redirect(`/dashboard/view/${Id}`);
    });
};

export default habitController;