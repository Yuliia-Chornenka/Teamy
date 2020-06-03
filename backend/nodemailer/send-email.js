const nodemailer = require('nodemailer');

module.exports = async (email) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      secure: true,
      port: 465,
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD
      },
    });

    const mailOptions = {
      from: `Teamy ${process.env.EMAIL_ADDRESS}`,
      to: email,
      subject: 'Details about the project ${project.name}',
      html:
        `<p>Hello, <b>{user.name}</b>!</p>
        Your mentor has created teams in the project <b>{project.name}</b>.<br>
        We are glad to announce that a chat for your team has already been created: {chat.link} <br>
        You can talk there with your teammates and save all necessary information.<br>
        Also you can find all information about the project here: {project.link} <br>
        And in your <a href="https://teamy-app.herokuapp.com/profile" target="_blank">profile</a>
        you can find information about all the projects in which you are participating.<br>
        <p>
            <span style="vertical-align: middle">Don't forget about deadlines and <b>Good Luck</b></span>
            <img src="https://uc-emoji.azureedge.net/orig/ef/0043faa8a0c18322a6bd9f5d13583c.png" alt="smile" style="width: 24px; height: 24px; vertical-align: middle">
        </p>
        Yours sincerely, <br>
        <span style="font-size: 18px; letter-spacing: 1px; font-weight: bold">Teamy</span> <br> <br>
        <img src="https://cdn3.iconfinder.com/data/icons/tiny-line/48/Line_ui_icons_Svg-06-512.png" alt="logo" style="width: 60px; height: 60px">`,
    };

    await transporter.sendMail(mailOptions);
    return 'Success';
  } catch (e) {
    return 'Error';
  }
};
