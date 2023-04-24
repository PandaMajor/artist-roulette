This is a personal project I built to host a game for my friends that challenges our musical horizons.

## The Rules  
---

An artist is randomly selected from the list. For 24 hours you can only listen to music by the selected artist for a minimum of 2 hours total a day. Additonally, any tracks that feature the artist is fair game and can be listened to for the challenge. The goal is to discover new discography for a week.

# Technologies used

- Figma
- React
- Next.js
- Tailwind CSS
- Google Firebase
- Spotify API

# The Process

First, I created an initial prototype of the project in Figma to layout what I wanted the end result to look like along with some of it's functionality that can be viewed in the prototype. You can view the initial design here: https://www.figma.com/file/2YSzkxXSPWs3mi4ArrLF0B/Artist-Roulette?node-id=0%3A1&t=YEsmpr6XLTB5rxJ9-1

After creating a reference for the project, I decided to build it using React and Tailwind CSS so that the end product could be responsive.

For the backend database, I wanted to use Google Firebase so that it could be remotely accessed. In the backend, I store the Spotify IDs of the artists so that when they are selected their image and top tracks (in the US) can be displayed. Some of the contents can be viewed in the scrollable database below to see the pool of artists that are available. (Filtering and sorting will be added in the future)

Finally, I decided to host the website using Vercel as it is streamlined with Next.js projects.

You can see the end product here: https://artist-roulette.vercel.app/

![view of the website on web](./public/pictures/artist%20roulette%20web.jpeg)

![photo of the website on mobile](./public/pictures/artist%20roulette%20mobile.jpeg)

