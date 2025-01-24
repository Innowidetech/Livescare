const updateRequestStatusTemplate = (recipientName, item, oldStatus,newStatus, updatedBy, state, city, address, pincode)=>`
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
          <h2 style="color: #333;">Submit Request Status Update - Livescare.</h2><br>
          <p>Dear ${recipientName},</p>
          <p>The request for Item: <b>${item}</b> - status has been updated from <b>${oldStatus}</b> to <b>${newStatus}</b> by <b>${updatedBy}</b>.</p>
          <p>Below are the address details of request:</p>
          <p><strong>State :</strong> ${state},</p>
          <p><strong>City :</strong> ${city},</p>
          <p><strong>Address :</strong> ${address},</p>
          <p><strong>Pincode :</strong> ${pincode}.</p>
          <br>
          <p>We value your trust and are dedicated to supporting you every step of the way on your journey with us.</p>
          <p style="text-align: center">Thank you.</p>

        </div>
        <div class="footer">
            <p>&copy; 2025 Livescare. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`

module.exports = updateRequestStatusTemplate