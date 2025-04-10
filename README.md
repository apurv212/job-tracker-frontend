# Student Job Tracker Application
A React-based web application for students to track their job applications through the entire process, from application to offer.

## Features
- **Track Job Applications**: Store and monitor all your job applications in one place
- **Status Updates**: Update application status as you progress through the hiring process
- **Status Dashboard**: Visual overview of application statuses (Applied, Interview, Offer, Rejected)
- **Filter Applications**: Easily filter applications by status
- **Responsive Design**: Works well on desktop and mobile devices

## Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/student-job-tracker.git

2. Install dependencies for both client and server:
   ```bash
   npm install
   

3. Create a `.env` file in the server directory with your MongoDB connection string:
   ```
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   ```

4. Start the development server:

## Usage

1. **Adding Applications**: Click the "Add Application" button in the header to open a modal where you can enter job application details.

2. **Viewing Applications**: All applications appear in the main dashboard arranged in cards.

3. **Filtering Applications**: Use the status filter to view applications by their current status.

4. **Updating Status**: Click the "Edit Status" button on any application card to update its status.

5. **Deleting Applications**: Remove applications you no longer wish to track with the delete button.

## API Endpoints

- `GET /api/applications` - Get all applications
- `POST /api/applications` - Create a new application
- `PUT /api/applications/:id` - Update an application
- `DELETE /api/applications/:id` - Delete an application
- `GET /api/applications/status-count` - Get count of applications by status
