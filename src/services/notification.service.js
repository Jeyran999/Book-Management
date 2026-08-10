const sendEmailNotification = async (email, message) => {
  console.log(`Sending email to ${email}`);

  await new Promise((resolve) => {
    setTimeout(resolve, 3000);
  });

  console.log(`Email sent to ${email}: ${message}`);
};

module.exports = { sendEmailNotification };