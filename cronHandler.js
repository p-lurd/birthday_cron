const cron = require('node-schedule');
const nodemailer = require('nodemailer');
const UserModel = require('./models/user');
const sendEmail = require('./utils/sendEmail');
const logger = require('./logger');
const db = require('./db/index')

db.connect();

const sendBirthday = async ()=>{
    try {
      cron.scheduleJob('0 7 * * *', async () => {
        const today = new Date();
        const month = today.getMonth() + 1;
        const day = today.getDate();
        // const todayDate = `${today.getMonth() + 1}-${today.getDate()}`;
        const users = await UserModel.find({
            $expr: {
              $and: [
                { $eq: [{ $month: '$DOB' }, month] },
                { $eq: [{ $dayOfMonth: '$DOB' }, day] },
              ],
            },
          }
        )
        if(users.length === 0) {
          logger.info('no birthdays found');
          return;
        }
        users.forEach(user => {
          
          sendEmail(user)
        });

        
        logger.info('All emails have been sent')
      });
    } catch (error) {
        logger.info('error sending => in cron handler', error);
    }
  }

module.exports = sendBirthday;