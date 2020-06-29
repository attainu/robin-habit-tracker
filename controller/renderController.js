import Habit from "../model/habitSchema";
import User from "../model/userSchema";
import schedule from 'node-schedule';
import transporter from '../helper/nodemailer';


var renderController = {};

//Get Add Habit Form
renderController.addHabit = async(req, res) => {
    try {
        return res.render("habit", { userId: req.params.userId });
    } catch (error) {
        console.log(error);
    }
};

//View Habits on Dashboard
renderController.getHabits = async(req, res) => {
    try {
        var userId = req.params.userId;
        await Habit.find({ createdBy: userId }).then(function(habits) {
            if (habits) {
                return res.render("dashboard", { habits: habits, userId: userId });
            } else return res.render("dashboard", { message: "Error fetching user Habits" })
        });
    } catch (error) {
        console.log(error);
    }
};

//Get Edit Habits form
renderController.updatehabit = async(req, res) => {
    try {
        return res.render("updateHabit", { habit: req.params.Id });
    } catch (error) {
        console.log(error)
    }
};

//Set Reminder (Under Construction)
renderController.setReminder = async(req, res) => {
    try {
        const Id = req.params.Id
        const habit = await Habit.findOne({ _id: Id });
        const reminderTime = habit.reminder.toString();
        const user = await User.findById(habit.createdBy);
        console.log(reminderTime);
        console.log(user);
        const addStr = " * * * *";
        if (user) {
            //Reminder info
            let mailOption = {
                from: 'coolkaran.singh4frndz@gmail.com',
                to: user.email,
                subject: 'Reminder from Habit-Tracker',
                text: "This mail is regarding a Habit Reminder you need to perform now",
                html: `hi "${user.name}", This is the time where you step up to change yourself a bit as you have planned!`
            }

            //Scheduling Reminder
            schedule.scheduleJob(reminderTime.concat(addStr), function() {
                transporter.sendMail(mailOption, (err, info) => {
                    if (err) throw err;
                    res.render('dashboard', { message: "reminder set", userId: userId });
                    console.log("mail sent")
                })
            });
        } else res.render('dashboard', { message: "Error setting reminder" });
    } catch (error) {
        console.log(error)
    }
};

export default renderController;