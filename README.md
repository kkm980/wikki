# Wikki - A Wikipedia Search Application

Wikki is a powerful Full stack MERN (MongoDB, React.js, Next.js) application designed to facilitate Wikipedia searches and store user's search history. In this technical blog, we'll delve into the features, technology stack, and design choices behind Wikki, an application aimed at providing a seamless Wikipedia search experience.

### deployed link - [Wikki](https://wikki.vercel.app/)


## Installation
Before we dive into the exciting features of Wikki, let's first get it up and running on your local system. Follow these simple installation steps:

1. Use the package manager [NPM](https://pip.pypa.io/en/stable/) to install Wikki.

```bash
git clone https://github.com/kkm980/wikki.git
```
2. Navigate to the cloned project directory

```bash
cd wikki
```

3. Install the required dependencies using NPM:

```bash
npm install
```

## Running on Local system
Once you have successfully installed all the necessary dependencies, you can start running Wikki on your local machine:

```bash
npm run dev
```
This command will launch the application on your local host, accessible at port 3000.


### Features Key points for developers-
Now that Wikki is up and running, let's explore some of its key features that make it stand out as a Wikipedia search application:
1. Display Toggle between DARK and LIGHT Mode
Wikki offers a visually pleasing user experience with a display toggle feature, allowing users to switch between dark and light modes according to their preferences.

2. Highly Secured Authentication
Built using Next.js auth, Wikki ensures robust and secure user authentication, adding an extra layer of protection to user data.

3. Responsive Design
Wikki's responsive design ensures a seamless experience on various devices, supporting resolutions as low as 360p.

4. Single Page Application (SPA)
The application is designed as a Single Page Application (SPA) to provide users with a smooth and sturdy browsing experience without the need for page refreshes.

5. Well-Maintained and Scalable Code
Wikki boasts well-maintained, structured, and scalable code, making it easy to extend and enhance its functionality in the future.

6. Future State Management with Redux
In future updates, developers have the option to implement Redux for state management, further enhancing the application's capabilities.


## How it works

Now, let's dive into how Wikki functions:

- Dark Mode and Light Mode: Users can switch between dark and light modes for the display.

- User Authentication: To access the dashboard and search history, users must log in with Google Auth.

- Dashboard: Once logged in, users can view all past Wikipedia search topics categorized into 1-day, 1-hour, and 1-week tabs.

- Search History Graph: The application includes a graph that visualizes the number of searches. Users can view data for 1 day, 1 hour, 1 week, or 1 month.

- Custom Date Range: For the 1-week graph, users can customize the date range within the past week. Even if a user selects a date range beyond one week, they will still see results for the most recent week.

- Search Functionality: Users can search for Wikipedia articles by typing in the input box or simply clicking on search topics in the search history tabs.

- Wikipedia Article View: Clicking on any search topic opens the corresponding Wikipedia article. A "Read More" button takes users to the full Wikipedia page for the selected topic.

## Tech stack and tools
#### Frontend- React.js, Next.js v13.4, TailwindCSS, Typescript
#### Backend- Next.js API, MongoDB
#### External libraries- Axios, Mongoose, Shadcn UI, Chart.js, Google Auth 2.0, Cors, cookie-parser, date-fns, moment.js, next-auth, react-date-range, react-dom
#### Tools- VSC, MongoDB Cluster, NPM, Vercel, Google developer console

## Design Choices (Why this not that?)
In the development of Wikki, several design choices were made:

- UI Library: Instead of Material UI, Shadcn UI was chosen to avoid conflicts with React versions. Material UI uses React 16 or below, whereas Next.js uses React 18 and above.
Advantage with Shadcn UI is that it gives us liberty to customise the imported components as well.

- Backend Framework: Next.js v13.4 API was chosen for its convenience in creating both frontend and backend components, simplifying deployment and hosting over Express and Node.js.

- Authentication: Next.js's own Next-auth with Google Auth 2.0 was preferred over Passport.js due to its simplicity, up-to-date support, and alignment with the Next.js ecosystem.

- Deployment Platform: Vercel was chosen for deployment due to its one-click deployment process and minimal configuration requirements.

- Environment Variables: No .env file is used, making it easy to clone and run the application on any localhost without additional setup.


## Conclusion
Wikki is more than just a Wikipedia search application; it's a showcase of modern web development practices, security, and user experience design. With its rich feature set, scalability, and thoughtful design choices, Wikki aims to provide users with a seamless and efficient way to explore the world of Wikipedia. Give it a try and start searching with Wikki today!

[Explore Wikki](https://wikki.vercel.app/)

[Github Repository](https://github.com/kkm980/wikki)

[Developer's Profile](https://github.com/kkm980)

Thank you for reading this technical blog about Wikki - A Wikipedia Search Application History Manager!