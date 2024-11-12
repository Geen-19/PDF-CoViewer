# PDF Co-Viewer

PDF Co-Viewer is a real-time collaborative platform that allows multiple users to view and interact with a PDF document simultaneously. Users can raise their hands, switch between viewer and admin roles, and follow the admin’s screen as pages change. This project is built with **React** for the frontend and **Node.js** with **Socket.IO** for the backend, enabling seamless real-time updates.

### Video Link Of Working -> https://www.loom.com/share/7ba102804cc84096886d46dca95fd165?sid=43c7809a-4a96-4dc9-a226-c9e60e4058df 
### To Show Active Users Functionality and how raisedHands work in realTime -> https://www.loom.com/share/9ac0b38b610942a1afad584f3026795d
## Table of Contents
Working Screen Shot
![image](https://github.com/user-attachments/assets/fc69d53f-3af7-412f-aded-84c9f1568b8a)

- [Demo](#demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

---
## Deployment 
- FrontEnd Deployment - https://pdf-co-viewer.vercel.app/
- BackEnd Deployment - https://pdf-coviewer-1.onrender.com/

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



# USER GUIDE
PDF Co-viewer Tutorial: Admin & Viewer Interaction Guide
Overview
The PDF Co-viewer is a real-time collaborative PDF viewing application where an admin can control the presentation while viewers follow along. Multiple users can join simultaneously, and viewers can raise their hands to signal questions or comments.
Getting Started
Setting Up Multiple Sessions

Open your preferred web browser
Open the application URL in multiple tabs (e.g., https://pdf-co-viewer.vercel.app)
Each tab will represent a different user session

## Role Management
Admin Setup (First Tab)

Open the first tab
Click the "Viewer Mode" button in the top-left to switch to "Admin Mode"

You'll see a crown icon indicating admin privileges
The page navigation controls will become active
You'll see a count of raised hands



## Viewer Setup (Additional Tabs)

Open additional tabs
Leave these tabs in "Viewer Mode"

They'll show a users icon
Page controls will be disabled
Hand raise button will be available



Features & Interactions
As an Admin

## Page Navigation

Use the left/right arrows to navigate through the PDF
Current page number is displayed in the center
All viewer tabs will automatically follow your navigation


## As a Viewer

## Following the Presentation

The PDF will automatically sync with the admin's navigation
A "Following presenter's screen" message appears at the bottom
Current page number is displayed in the center


## Interaction

Click the hand icon to raise/lower your hand
Hand icon turns yellow when raised
Admin will see the updated count of raised hands



## Testing Scenarios
### Scenario 1: Basic Navigation

Open two tabs
Set first tab to Admin Mode
Navigate through pages in the admin tab
Verify that the viewer tab follows automatically

### Scenario 2: Hand Raising

Open three or more tabs
Set one tab to Admin Mode
In viewer tabs, click the hand icon
Verify that the admin sees the correct count of raised hands
Lower hands and verify the count decreases

### Scenario 3: User Connection

Start with 2-3 open tabs
Open new tabs or close existing ones
Verify that the viewer count updates correctly
Verify that raised hand counts remain accurate

## Troubleshooting
If synchronization issues occur:

Refresh all tabs to re-establish connections
Ensure the server is running (check console for errors)
Verify that you have only one admin tab open

Best Practices

## For Admins

Begin each session by verifying you're in Admin Mode
Monitor the raised hands count regularly
Navigate pages at a reasonable pace


## For Viewers

Use hand raising judiciously
Keep the tab active to maintain connection
Refresh the page if synchronization seems off



## Technical Notes

Each user gets a unique ID on connection
Hand raise states persist across page navigation
The application uses WebSocket for real-time communication
The PDF viewer component maintains its own scale and rendering
