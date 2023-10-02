# Wikki - A Wikipedia Search Application

Wikki is a Full stack MERN app to search and store Wikipedia searches done by a user.
### deployed link - [Wikki](https://wikki.vercel.app/)


## Installation

Use the package manager [NPM](https://pip.pypa.io/en/stable/) to install Wikki.

```bash
git clone https://github.com/kkm980/wikki.git
cd wikki
npm install
```

## Running on Local system
After installing all necessary dependency packages using above command, if you are in `wikki` directory, write below command to run-
```bash
npm run dev
```
It will make the application run on your local host at port 3000

#### Features Key points for developers-
- Display toggle feature between DARK and LIGHT mode,
- Highly secured Auth application using Next.js auth,
- Complete responsive screen supporting up to 360p resolution devices,
- This is single page Application(SPA) for sleek and sturdy experience.
- It is well maintained, structured and scalable code
- In future, we can add redux for state management,


## Working

- Selection between dark mode, light mode display
- User has to login first with Google Auth to view the dashboard
- Once loggedin, the user is subjected to the dashboard to see all the past wikki search topics in 1-day, 1-hour and 1 week tabs.
- There is a Graph distribution for showing the number of searches. The graph can be shown by selecting the 1 day, 1 hour, 1 week and 1 month frame.
- For 1 week graph, user can customise the duration with start and end time within 1 week.
- If user selects the time beyond one week with date range selector, then also he will be shown 1 week search results only.
- User can search for the Wikipedia by typing in the input box or simply clicking on the search topics presented in the search history tabs.
- User is shown the Wikipedia article after clicking on any topic. Further there is a read more button to go on Wikipedia page for selected topic.

## Tech stack and tools
#### Frontend- React.js, Next.js v13.4, TailwindCSS, Typescript
#### Backend- Next.js API, MongoDB
#### External libraries- Axios, Mongoose, Shadcn UI, Chart.js, Google Auth 2.0, Cors, cookie-parser, date-fns, moment.js, next-auth, react-date-range, react-dom
#### Tools- VSC, MongoDB Cluster, NPM, Vercel, Google developer console

## Why this not that?

- Instead of Material UI, I chose shadCn UI, because material UI uses 16 or below version of react and Next.js uses above 18. So it creates conflict issue on dependency.
- Instead of using Node.js, Express.js I used Next.js v13.4 API as it comes handy to create complete frontend and backend under one deployemnt and hosting with Next.js
- Instead of using Passport.js with Google Auth 2.0, I went with Next.js own Next-auth with Google Auth 2.0 as it is least code3 needed, most upgraded and actively supported by in-house Next.js rather than passport.js which works good with react.
- Instead of deploying on AWS Elastic, I chose Vercel as it is just one click deployment without any issue.
- I didnot use any .env file so as to keep the application ready to be created and working on any localhost after cloning.
