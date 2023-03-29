# Cinema Scope

## Summary

This React project allows users to search for and view information about movies using the Open Movie Database (OMDB) API. Users can search for movies by title, and the app displays the results in a grid of movie posters. Clicking on a movie poster displays more information about the movie, including its title, release year, runtime, and plot summary.

## Live app

[Cinema Scope](https://cinemascope.netlify.app/) 

https://user-images.githubusercontent.com/43226446/228417750-be99316b-9ba9-4b0d-a7a7-3394f8f40d69.mp4

https://user-images.githubusercontent.com/43226446/228417984-d71e97f9-9cc4-420c-8cf7-bfcf2e329776.mp4


## API

This project uses the Open Movie Database (OMDB) API to retrieve information about movies. The API provides two endpoints that this project consumes:

http://www.omdbapi.com/?apikey=[yourkey]&: This endpoint is used to search for movies by title, and returns a list of movies that match the search query.


http://img.omdbapi.com/?apikey=[yourkey]&: This endpoint is used to retrieve movie posters for each movie in the search results.

## Installing

- Clone the repository to your local machine
- Run npm install to install the dependencies
- Run npm start to start the development server

## Features

This project was built using React and features the following functionality:

### Movie search page

The project includes a search page that allows users to search for movies using the OMDB API's "By Search" functionality. The search results are displayed in a grid format.

### Movie details page

The project includes a movie details page that allows users to click on a movie item from the search results to view the details of that movie. The details are retrieved from the OMDB API's "By ID" functionality.

### Multiple React components

The project uses multiple React components to organize and display the UI.

### State and props

The project uses both state and props to manage and pass data between components. useState hook is used to manage the state of certain components.

## Timeframe

This project took approximately X hours to complete, including the time spent on thinking, designing, implementing the solution and testing. The breakdown of the timeframe is as follows:

### Thinking and planning

30 minutes

### Designing

1 hour

### Implementation

4 hours

### Testing

2 hours

### Figuring out how to turn the video into a GIF

More hourse than what I'd like to admit publicly.



## Authors

Nika Darab

## Acknowledgments

Text-Em-All React Coding Challenge

[Coding Challenge](https://github.com/callemall/tea-react-challenge#text-em-all-react-coding-challenge)
