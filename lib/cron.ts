import { CronJob } from 'cron';

const initScheduledJobs = () => {
  if (process.env.name === 'primary') {
    new CronJob(
      '0 0 * * * *',
      function() {
        console.log('start cron job');
      },
      null,
      true,
      'Asia/Taipei',
    );
  }
};

export default initScheduledJobs;
