# smüth 
## Inspiration

Poor road conditions, including those caused by potholes, account for more than 42,000 deaths a year in the United States (ref. National Highway Traffic Safety Administration). These accidents are even more prevalent in developing countries, where governments don't have the resources and money to maintain roads.

While Google Maps gives users the fastest route to our destination, it doesn't currently take into consideration dents and potholes in the road, which can ultimately cause vehicle damage and accidents. Right now, reporting potholes is also a manual process, which makes it difficult for people to avoid them and for governments to repair them.

## Introducing: smüth

smüth is a mobile application whose functionality is two-fold: automating the mapping of potholes and finding the path with the least number of potholes to the user's destination.

Integrating many features of Google Maps, this application can be seamlessly integrated into anyone's drive. We can also see this app being useful for ambulances and individuals discharged from surgery (as any disturbance to this fragile state can become greatly magnified), detecting dangerous routes after natural disasters, and reporting pothole data to governments so they can repair them.

## How We Built It

UUsing accelerometer data, smüth's algorithm automatically classifies disturbances in the road that cause an acceleration greater than a certain threshold. When a disturbance is detected, its location is relayed to a database. With this information, future routes will be calculated and other disturbances in the area will be identified. This is an automatic process that runs in the background to continuously update the database and provide better routes for all future users.

The mobile app itself is built using React Native, Node, and Google Firebase. We've also utilized Material UI, Figma (wireframe designs), as well as several Google Map API to determine routes and directions from one point to another.

## Challenges Faced

The challenges we faced were mainly from our app's backend. Firstly, we had trouble connecting a phone's accelerometer data to detect potholes. We also faced difficulties with working with Google Map's API, routing, map directions, and plotting pothole locations.

## Accomplishments that we're proud of

We're proud of (1) staying awake for most of the 36 hours 😜, (2) finishing a functional MVP 🙌 and (3) working smüthly with our team! For some of us, this was our first time attending a hackathon, so we definitely learned a lot of new tools and frameworks. Despite running into a lot of challenges, we're also happy that we were able to work together and debug our code problems collaboratively as a team.

## What we learned

Jennifer: This was my first time digging into React Native, so I learned a lot about its different components and how to connect the user's inputs with our database. Also worked on designing the UI, which was a fun challenge!

Chinemerem: I learned how to work on the back-end; I connected the accelerometer data to feed into the pothole detection algorithm, worked with the Google Map APIs, and overlayed potholes on the map.

Cheran: This was my first time developing a mobile application and I struggled to become quickly familiar with react native for the client side and learning many features available in the cloud console to run our backend/authentication.

Vivek: First time working with React Native, Firebase and pretty much everything in our stack - so I learned a great deal about integrating maps, routing and designing the UI on mobile interfaces. I also had a great time learning about the authentication process for user sign-in and data collection!

## Technologies Used

- React-Native
- Material UI
- Google Firebase
- Cloud Functions
- Google Maps Directions API
- Node.js

## What's Next

We would love to continue refining our pothole detection algorithm based on more research and testing. Currently, our app only is able to locate potholes in a given area, not whether it's on the route from one destination to another, so this is something we would continue looking into.

As well, in the case that there are no routes without potholes, we would like our app to have a warning feature to indicate to users if they are nearly a pothole; this could prompt users to slow down or change lanes!
