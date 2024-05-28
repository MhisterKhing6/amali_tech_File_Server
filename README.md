# Amalitech NSS File Server Backend Project

## Description
A file server that allows admins to upload files, enables user authentication, file downloads, and email messaging.

## Setup Backend
---
The file `Backend/config/default.json` contains configuration details used to set up the backend of the project.
- **host**: Used to set up a connection with the backend server.
  - **port**: Sets the port the backend server is listening on.
  *Example:* If the backend server is configured to run on listens on port 5000, then `port:5000`.

- **MONGO_URL**: A mongo db connection String
  *Example:* If the backend server uses MongoDB Atlas with connection string `xxxxxx`, then `MONGO_URI: "xxxxxx"`.

- **token**: Used for setting Json web authentication secrets.
  - **secretKey**: Secret for user authentication token.
  - **downloadSecretKey**: Secret key for download authentication token.

- **email**: Used to provide options for email transmission.
  - **email**: The email address the app uses to send messages.
  - **secret**: The secret key the email provider uses to authenticate the email.
  *Example:* If the backend server uses `xxx@gmail.com` email to send information and Gmail server uses `AAAA` to authenticate the `xxx@gmail.com` user, then `email: "xxx@gmail.com"`, `secret: "AAAA"`.

- **files**: Used to set parameters for file upload.
  - **maxSize**: Sets the maximum file size.
  *Example:* If the maximum file size the server accepts is 500MB, then `maxSize: "500MB"`.

## Setup Frontend
---
The file `Front/utils/config.js` contains the configuration file used to set up the frontend.
- **backend**: For backend connection.
  - **url**: Sets the URL for the backend server.
  *Example:* If the backend is configured to listen on IP `192.168.2.1` and port `8000`, then `url: "http://192.168.2.1:8000"`.

- **token**: Keys to identify and save tokens in cookies.

## Installation Backend
---
From the root directory:
```bash
cd Backend
npm install
npm start
```
## Installation FrontEnd
---
From the root directory:
```bash
cd Frontend
npm install
npm start
```
<h3>Features</h3>
<hr>
<ul>
<li>Register Customer </li>
<li>Login Customer </li>
<li>User Verification Through Email</li>
<li>Reset Password</li>
<li>Upload File</li>
<li>View File Stats with email and downloads</li>
<li>Send File To Email</li>
<li>Send Search To Email</li>
</ul>
<h3>Deployment Links </h3>
<hr>
 <a href="https://frontend-8z9dn8c5h-kingsley-botchways-projects.vercel.app" target="_blank ">Cutomer</a> <br> 
<a href="https://frontend-8z9dn8c5h-kingsley-botchways-projects.vercel.app/admin/register" target="_blank">Admin Interface for testing purpose</a>

<h3>Database Schema</h3>
<hr>
<a href="https://drive.google.com/file/d/1yVu5aPue3grfJM7csbmcPPCdfC96MPag/view?usp=sharing" target="_blank">Database Schema </a>