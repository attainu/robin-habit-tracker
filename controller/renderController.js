var Habit = require("../model/habitSchema");

var renderController = {};

renderController.addHabit = function(req, res) {
    return res.render("habit", { userId: req.params.userId });
};

renderController.getHabits = function(req, res) {
    var userId = req.params.userId;
    Habit.find().then(function(habits) {
        if (habits) {
            return res.render("dashboard", { habits: habits, userId: userId });
        } else return res.render("dashboard", { message: "Error fetching user Habits" })
    });
};

renderController.updatehabit = function(req, res) {
    //Habit.findOne({ _id: req.params.Id }).then(function (habit) {
    return res.render("updateHabit", { habit: req.params.Id });
    //});
};
module.exports = renderController;