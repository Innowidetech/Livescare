const subscribeTemplate = (emails) => {
    let emailListHTML = `
        <div style="border: 1px solid #ccc; border-radius: 5px; padding: 20px; max-width: 600px; font-family: Arial, sans-serif;">
            <h2 style="color: #333;">New Subscription Email Submission.</h2>
            <ul>
    `;

    const latestEmail = emails[0];
    const formattedLatestDate = latestEmail.createdAt.toLocaleString();
    emailListHTML += `
        <li style="background-color: #f4f4f9; border: 1px solid #007bff; border-radius: 5px; padding: 15px; margin-bottom: 10px;">
            <strong style="color: #007bff;">Latest Email:</strong><br>
            <strong>Email :</strong> ${latestEmail.email} <br>
            <strong>Submitted on :</strong> ${formattedLatestDate} <br><br>
        </li>
    `;

    emails.slice(1).forEach(email => {
        const formattedDate = email.createdAt.toLocaleString();
        emailListHTML += `
            <li>
                <strong>Email :</strong> ${email.email} <br>
                <strong>Submitted on :</strong> ${formattedDate} <br><br>
            </li>
        `;
    });

    emailListHTML += `</ul></div>`;

    return emailListHTML;
};

module.exports = subscribeTemplate