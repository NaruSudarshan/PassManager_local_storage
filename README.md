# PassManager

A simple, modern password manager built with React and Tailwind CSS.  
Store your passwords securely in your browser and access them easily.

## Features

- Add, edit, and delete password entries
- Copy usernames and passwords to clipboard with one click
- All data stored locally in your browser (no server)
- Responsive, clean UI with dark mode
- Toast notifications for actions

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or newer recommended)
- [npm](https://www.npmjs.com/)

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/NaruSudarshan/PassManager_local_storage
   cd PassManager_local_storage
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Start the development server:**
   ```sh
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Usage

- Click **Add Password** to save a new entry.
- Click the **edit** icon to update an entry.
- Click the **delete** icon to remove an entry.
- Click the **copy** icon to copy username or password to clipboard.
- All changes are saved automatically in your browser's local storage.

## Tech Stack

- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Toastify](https://fkhadra.github.io/react-toastify/)
- [React Icons](https://react-icons.github.io/react-icons/)

## Folder Structure

```
src/
  assets/           # Images and static assets
  components/       # React components (Navbar, Body, Footer)
  App.jsx           # Main app component
  main.jsx          # Entry point
  index.css         # Tailwind CSS imports
  App.css           # Custom styles (if any)
```

## License

This project is licensed under the MIT License.

---

**Made with ❤️ by Sudarshan