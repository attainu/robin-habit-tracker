import schedule from 'node-schedule';
import transporter from './nodemailer';

let mailOption = {
    from: 'coolkaran.singh4frndz@gmail.com',
    to: user.email,
    subject: 'Reminder from Habit-Tracker',
    text: "This mail is regarding a Habit Reminder you need to perform now",
    html: `hi "${user.name}", This is the time where you step up to change yourself a bit as you have planned!`
}

var date = new Date(2012, 11, 21, 5, 30, 0);

var j = schedule.scheduleJob(date, function() {
    transporter.sendMail(mailOption, (err, info) => {
        if (err) throw err;
    })
});

export default j;