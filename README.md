# PDF Co-Viewer

PDF Co-Viewer is a real-time collaborative platform that allows multiple users to view and interact with a PDF document simultaneously. Users can raise their hands, switch between viewer and admin roles, and follow the admin’s screen as pages change. This project is built with **React** for the frontend and **Node.js** with **Socket.IO** for the backend, enabling seamless real-time updates.

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

---

## Demo

Check out the live demo:
- Frontend on [Vercel](https://pdf-co-viewer.vercel.app)
- Backend on [Render](https://pdf-coviewer-1.onrender.com)

---

## Features

- **Real-Time PDF Viewing**: All users view the same page as the admin, with real-time page updates.
- **Role Switching**: Users can switch between admin and viewer roles.
- **Hand Raise Feature**: Viewers can raise and lower their hands to indicate questions or requests.
- **Active Users Count**: Displays the number of active users.
- **Notifications**: Real-time notifications for page changes and role-switching.

---

## Tech Stack

- **Frontend**: React, Lucide-React for icons, and Socket.IO-client.
- **Backend**: Node.js, Express, Socket.IO, and CORS.
- **Hosting**: Vercel (Frontend), Render (Backend).

---

## Setup and Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/pdf-co-viewer.git
   cd pdf-co-viewer
# PDF Co-Viewer

2. **BackEnd**
    cd server
    npm install

    **FrontEnd**
    cd client
    npm install

3. Environment Configuration
    - FrontEnd: Update the URL for your backend server in the frontend's socket.io configuration.
    - BackEnd: Replace the CORS origin in the Express server setup with your frontend URL.

4. Run the Development Servers
    **BackEnd**
    node server.js
    **FrontEnd**
    npm run dev

## Usage 
    1. Admin Mode: Allows page navigation and controls the displayed    page for all users.
    2. Viewer Mode: Users can view the page the admin is currently on, raise hands, and receive notifications.
    3. Hand Raise: Viewers can raise hands, which will be visible to the admin.
## Available Commands
    - Page Navigation: Admin can move between pages with navigation buttons.
    - Hand Raise: Viewers can raise or lower their hand by clicking the hand icon.
    - Role Switch: Toggle between Admin and Viewer mode.

## API Endpoints
    - User Connection: Triggers when a user connects, assigns a unique ID, and sends the current page and raised hands.
    - Page Change: Admin users can emit a changePage event with the new page number.
    - Hand Raise Toggle: Viewer users can toggle their raised hand status with the toggleHandRaise event.

## License

### Additional Notes:

- Update the `README.md` file with any specific details, like repository URLs.
- Ensure proper setup and testing of the application on live servers before providing a live demo link.
