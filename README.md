# kanban-board-quicksell-assignment

This React JS application interacts with the API available at [Quicksell API](https://api.quicksell.co/v1/internal/frontend-assignment). It allows users to adjust the Kanban board dynamically based on their grouping and sorting preferences. Tickets can be grouped by status, user, or priority, and sorted by priority or title. The application also ensures that the user's view state is preserved even after a page refresh.

## Features

- **Organize tickets** by status, user, or priority.
- **Arrange tickets** based on priority or title.
- **Responsive design** that adapts to different screen sizes.
- **Persistent view settings**: The user's view state is saved in local storage, so it remains consistent after page reload.
- **Priority Levels**: Tickets are categorized by urgency, where:
  - Urgent: 4
  - High: 3
  - Medium: 2
  - Low: 1
  - No Priority: 0

## Tech Stacks

- **HTML**: Used to structure the application.
- **CSS**: Adds styles and enhances the look of the interface.
- **JavaScript**: Provides dynamic functionality and interactive features.
- **React.js**: A JavaScript library for building fast and reusable UI components.

## Demo

You can see a live demo of the application [here](https://kanban-board-quicksell-assignment.vercel.app/).

## Installation

### Local Development

To run the project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/pranavmagdum4/kanban-board-quicksell-assignment.git

2. Navigate to the project directory:
   ```bash
   cd kanban-board-quicksell-assignment

3. Install the dependencies:
   ```bash
   npm install

4. Start the development server:
   ```bash
   npm start

   The app will be running on http://localhost:3000.

### Dockerized Application

If you'd prefer to run the project using Docker, follow these steps:

1. Build the Docker image: Make sure you're in the project directory, then run:
   ```bash
   docker build -t kanban-board-quicksell-assignment .

2. Run the Docker container: Once the image is built, you can run the app by mapping port 8080 on your machine to port 80 inside the container:
   ```bash
   docker run -p 8080:80 kanban-board-quicksell-assignment

3. Access the application: After the container is running, you can access the application by visiting http://localhost:8080.

## Why Dockerized?
**Consistency** : Docker ensures the app runs in a consistent environment across different machines and operating systems.
**Portability** : The Docker image can be deployed on cloud services like AWS, GCP, and Azure.
**Simplified setup**: With Docker, all dependencies and configurations are packaged, making it easy to deploy and run anywhere.


## Usage 

**Retrieve Tickets**: Press the "Display" button to load tickets from the API.
**Group Options**: Choose how you want to group the tickets—either by "Status," "User," or "Priority."
**Sorting**: Sort the tickets by "Priority" or "Title."
**Dynamic Updates**: The Kanban board will update automatically based on your grouping and sorting selections.
**Persistent Settings**: Your group and sort preferences are saved locally, allowing you to return to the same view even after refreshing the page.




