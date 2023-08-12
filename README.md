# Vittae-X (Vite React App)

This repository contains a Vite-powered React application. Vite is a fast, opinionated build tool that helps you develop modern web applications with a seamless experience.

## Getting Started

To get started with this application, follow the instructions below:

### Prerequisites

Before running this application, ensure that you have the following software installed on your machine:

- Node.js (v14 or higher)
- npm (v7 or higher)

### Installation

1. Clone this repository to your local machine using the following command:

   ```
   git clone [https://github.com/your-username/vite-react-app.git](https://github.com/Dipp3r/Growth-X)
   ```

2. Navigate to the project directory:

   ```
   cd vite-react-app
   ```

3. Install the project dependencies:

   ```
   npm install
   ```

### Development

To start the development server, run the following command:

```
npm run dev
```

This command will build the application and start a local development server. You can access the application in your browser at `http://localhost:3000`.

As you make changes to the source code, the application will automatically reload in the browser.

### Building for Production

To build the application for production, use the following command:

```
npm run build
```

This command will generate an optimized build of the application in the `dist` directory.

### Deployment

To deploy the application, you can use various hosting platforms, such as Netlify, Vercel, or GitHub Pages. Refer to the documentation of your chosen hosting platform for detailed instructions on how to deploy a static website.

### Folder Structure

The project structure is as follows:

```
vite-react-app/
  |- public/
  |   |- index.html
  |- src/
  |   |- components/
  |   |- App.js
  |   |- index.js
  |- .gitignore
  |- package.json
  |- vite.config.js
```

- The `public` directory contains the `index.html` file, which is the entry point for the application.
- The `src` directory contains the React components (`components` directory), the main `App.js` file, and the `index.js` file, which is responsible for rendering the React application.
- The `.gitignore` file specifies which files and directories should be ignored by Git.
- The `package.json` file lists the project dependencies and scripts.
- The `vite.config.js` file contains the configuration for the Vite build tool.

### Additional Features
5 S.O.L.I.D clean code principles to make it readable, maintainable and testable code.

```
S - Single responsibility
O - Open-closed
L - Liskov Substitution
I - Interface Segregation
D - Dependency Inversion
```
</br>
<img width="801" alt="Screenshot 2023-06-16 at 12 30 42 PM" src="https://github.com/Dipp3r/Growth-X/assets/91364256/f5c08f67-e5ee-4540-99b1-049767e7e813">
</br>

Prettier 
https://prettier.io/docs/en/configuration.html

Eslint
https://eslint.org/

Husky
https://www.npmjs.com/package/husky
</br>
<img width="850" alt="Screenshot 2023-06-09 at 11 40 11 AM" src="https://github.com/Dipp3r/Growth-X/assets/91364256/d7a3cd45-770c-47e4-92af-4255ead519e6">
</br>

Module css or module shares
// Component.js

import styles from './styles.module.css';
```
function Component() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Hello, CSS Modules!</h1>
    </div>
  );
}

export default Component;
```

Environment

Hooks

## Acknowledgments

This project was created using Vite, React, and other open-source libraries. We would like to thank the maintainers and contributors of these projects for their valuable work.

- Vite: https://github.com/vitejs/vite
- React: https://reactjs.org/

***database table structure:***<br/><br/>
| Table Name | Columns                                                   | Key        |
|------------|-----------------------------------------------------------|------------|
| tasks      | id (integer), customer_id (integer), broker_id (integer),  | id (PK)    |
|            | title (character(100)), body (character(2500)),           |            |
|            | date (timestamp without time zone), outcome (character(2500)), |          |
|            | completed (boolean)                                      |            |
| customer   | id (integer), name (character varying(255))               | id (PK)    |
| notes      | id (integer), customer_id (integer), broker_id (integer),  | id (PK)    |
|            | title (character(100)), body (character(2500)),           |            |
|            | date (timestamp without time zone)                        |            |
<br/>

<code>CREATE TABLE tasks (
    id integer NOT NULL,
    customer_id integer NOT NULL,
    broker_id integer NOT NULL,
    title character(100),
    body character(2500),
    date timestamp without time zone,
    outcome character(2500),
    completed boolean,
    PRIMARY KEY (id)
);</code><br/><br/>
<code>CREATE TABLE customer (
    id integer NOT NULL,
    name character varying(255),
    PRIMARY KEY (id)
);</code><br/><br/>
<code>CREATE TABLE notes (
    id integer NOT NULL,
    customer_id integer NOT NULL,
    broker_id integer NOT NULL,
    title character(100),
    body character(2500),
    date timestamp without time zone,
    PRIMARY KEY (id)
);</code><br/>

bankList from  https://m.rbi.org.in/scripts/bs_viewcontent.aspx?Id=3657



<h1>
    mobile number & password
</h1>
<p>
    9360748965
</p>
<p>
    QWERTqwert1234
</p>
