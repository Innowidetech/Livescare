const registrationRequestTemplate = (fullname, username, email, password, mobileNumber, pincode) => `
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
          <h1 style="color: #333;">New Registration Request Form.</h1>
          <p>A new registration request from has been submitted for Livescare. Please find the details of the user below:</p>
          <p><strong>Name :</strong> ${fullname}</p>
          <p><strong>Username :</strong> ${username}</p>
          <p><strong>Email :</strong> ${email}</p>
          <p><strong>Mobile Number :</strong> ${mobileNumber}</p>
          <p><strong>Requested Password :</strong> ${password}</p>
          <p><strong>Area Pincode :</strong> ${pincode}</p>

          <br>
          <p>Please register the user in the 'Members' section, Once the account is created, an automated email will be sent to the user confirming that the account has been created successfully.</p>

        </div>
        <div class="footer">
            <p>&copy; 2025 Livescare. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`

module.exports = registrationRequestTemplate