# Book Review App

A full-stack application for reviewing books, featuring a Next.js frontend and an Express.js backend.

## Getting Started

### Prerequisites
Ensure you have the following installed:
- **Node.js** (v14 or higher)
- **npm** (v6 or higher)

### Installation
1. **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/book-review-app.git
    cd book-review-app
    ```
2. **Install dependencies for both frontend and backend:**
    ```bash
    npm run install:all
    ```
3. **Set up environment variables:**
   - Drop the `.env` file (sent by email) into the backend folder.

### Running the Application
To run both the frontend and backend concurrently:
```bash
npm run dev
```

## Features
- **User Authentication & Authorization**
- **Add, Edit, and Delete Book Reviews**
- **View All Book Reviews**
- **Filtering for Book Reviews**
- **Responsive Design** – Works on both mobile and desktop

### Submit Form Changes
- When the edit button is clicked, the submit form changes to allow the user to update an existing book review.
- The form will be pre-filled with the current review details.
- Users can make necessary changes and submit to update the review.

### Folder Structure
- **Backend** – Contains the backend code (Express.js)
- **book-review-frontend** – Contains the frontend code (Next.js)

