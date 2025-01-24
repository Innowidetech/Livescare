const confirmRegistration = (fullname, username, email, password, designation, mobileNumber, pincode)=>`
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
          <h2 style="color: #333;">Account Confirmation - Livescare.</h2><br>
          <p>Dear ${fullname},</p>
          <p>Your account has been successfully created for Livescare. You can login through the following credentials:</p>
          <p><strong>Name :</strong> ${fullname}</p>
          <p><strong>Username :</strong> ${username}</p>
          <p><strong>Email :</strong> ${email}
          <p><strong>Password :</strong> ${password}</p>
          <p><strong>Designation :</strong> ${designation}</p>
          <p><strong>Mobile Number :</strong> ${mobileNumber}</p>
          <p><strong>Pin Code :</strong> ${pincode}</p>
          <p>You can reset your password by clicking on forgot password button in the login page.</p>
          <br>
          <h4>Thank you for being a valued member of Livescare.</h4>
          <p>We value your trust and are dedicated to supporting you every step of the way on your journey with us.</p>

        </div>
        <div class="footer">
            <p>&copy; 2025 Livescare. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`

module.exports = confirmRegistration