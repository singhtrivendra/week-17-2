# Chat Application

This is a real-time chat application where users can join chat rooms using a shared room ID and start chatting. Users can also create a room, invite friends, and chat in real time.

## Project Structure

The project consists of two main folders:

- **Frontend**: Handles the user interface and WebSocket communication (**week-17-2-frontend**).
- **Backend**: Manages WebSocket connections and message broadcasting (**week-17-chatapp**).

The project folder is named **week-17-2**.

## Installation

### 1. Clone the Repository

```sh
git clone <repository-url>
cd week-17-2
```

### 2. Install Dependencies

#### Backend

```sh
cd week-17-chatapp
npm install
```

#### Frontend

```sh
cd week-17-2-frontend
npm install
```

## Running the Application

### Start the Backend Server

```sh
cd week-17-chatapp
npm run dev
```

### Start the Frontend

```sh
cd week-17-2-frontend
npm run dev
```

## WebSocket Configuration

Make sure to update the WebSocket URL in the frontend. Change the following line in your frontend WebSocket connection:

```js
const ws = new WebSocket("https://week-17-2.onrender.com");
```

To:

```js
const ws = new WebSocket("ws://localhost:8080");
```

## Features

- Join a chat room using a shared room ID
- Create a new room and invite friends
- Real-time messaging using WebSockets
- Simple and intuitive UI

## Technologies Used

- **Frontend**: React(TypeScript), Tailwind CSS
- **Backend**: Node.js, Express, WebSockets

## Future Enhancements

- User authentication
- Persistent chat history
- Private messaging

## Live Demo

https://week-17-2-7mkj.vercel.app

## Contributing

Feel free to contribute by creating a pull request or submitting issues.

## License

This project is licensed under the MIT License.

