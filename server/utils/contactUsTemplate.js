const contactUsTemplate = (firstName, lastName, email, mobileNumber, message) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
        .footer {
            text-align: center;
            font-size: 14px;
            color: #888888;
            margin-top: 25px;
        }
        .footer p {
            margin-top: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div style="border: 1px solid #ccc; border-radius: 5px; padding: 20px; max-width: 600px; font-family: Arial, sans-serif;">
          <h1 style="color: #333;">New Contact Us Form.</h1>
          <p>A new contact us from has been submitted for Livescare. Please find the details below:</p>
          <p><strong>Name :</strong> ${firstName} ${lastName}</p>
          <p><strong>Email :</strong> ${email}</p>
          <p><strong>Mobile Number :</strong> ${mobileNumber}</p>
          <p><strong>Message :</strong> ${message}</p>
          <p>Please contact them via provided Mobile Number or Email.</p>
        </div>
        <div class="footer">
            <p>&copy; 2025 Livescare. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`

module.exports = contactUsTemplate