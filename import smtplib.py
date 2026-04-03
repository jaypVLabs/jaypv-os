import smtplib

smtp_server = "smtp.office365.com"
port = 587
sender_email = "jayhere@jaypventuresllc.com"
password = "Zoey&Mort2026!" 
"

with smtplib.SMTP(smtp_server, port) as server:
    server.starttls()
    server.login(sender_email, password)
    server.sendmail(sender_email, "recipient@example.com", "Subject: Test\n\nThis is a test email.")