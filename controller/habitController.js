var Habit = require("../model/habitSchema");
var User = require("../model/userSchema");
var mongoose = require("mongoose");

var habitController = {};

habitController.createHabit = async function(req, res) {
    try {
        var userId = req.params.userId;
        var user = await User.find({ _id: { userId } })
        user = await new User({
            taskAdded: Habit.title
        }).save();
        console.log(user);
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

        else return res.redirect(`/dashboard/view/:${userId}`);
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
    return res.redirect(`/dashboard/view/:${userId}`);
};

habitController.deleteHabit = function(req, res) {
    var Id = req.params.Id;
    Habit.deleteOne({
        _id: Id,
    }).then(function() {
        return res.redirect(`/dashboard/view/:${userId}`);
    });
};

module.exports = habitController;