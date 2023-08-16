# Movie Review Submission and Retrieval API

This repository contains the implementation of a Movie Review Submission and Retrieval API. The API allows users to submit movie reviews, store them in a PostgreSQL database, fetch movie information from The Movie Database API, and retrieve reviews using various endpoints.

## Table of Contents
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [API Endpoints](#api-endpoints)
- [Examples](#examples)
- [Contributing](#contributing)
- [License](#license)

## Features

1. **Review Submission Endpoint**: Users can submit movie reviews with fields such as TMDB ID, Reviewer's name, and Rating.

2. **Database Setup**: Utilizes PostgreSQL to store movie reviews and information while maintaining a relational structure to connect movies with their reviews.

3. **Integration with TMDB API**: Fetches movie data (title, release date, poster, overview) from TMDB API and saves it in the local database to prevent redundant API calls.

4. **Review Retrieval Endpoints**: Offers endpoints to retrieve all reviews of a particular movie and all reviews submitted by a specific user.

## Prerequisites

To run this project, you need the following installed:

- Docker with docker-compose (https://www.docker.com/)

## Installation

1. Clone this repository:

```
git clone https://github.com/EduardodaVeiga/movie-reviews-api.git
cd movie-reviews-api
```

2. Set up your .env file on the root directory with the following variables: 
```
IMDB_API_KEY //Obtain an API key from The Movie Database (TMDB) API (https://www.themoviedb.org/documentation/api).
NODE_ENV 

#LOCALHOST VARIABLES
 
DATABASE_NAME = movie-reviews
DATABASE_USERNAME = postgres
DATABASE_PASSWORD = postgres
DATABASE_HOST = postgres
DATABASE_DIALECT = postgres
DATABASE_PORT = 5433

#TEST VARIABLES

TEST_DATABASE_NAME = movie-reviews-test
TEST_DATABASE_USERNAME = postgres
TEST_DATABASE_PASSWORD = postgres
TEST_DATABASE_HOST = postgres_test
TEST_DATABASE_DIALECT = postgres
TEST_DATABASE_PORT = 5434
```

3. Run the command for app run: 
```
docker-compose up
```

The API will be accessible at `http://localhost:3009/`.

4. If you want only to run tests, run the following:
```
docker-compose -f docker-compose.test.yml up
```

## API Endpoints

1. **Review Submission Endpoint**:

   - `POST /api/reviews`

     Example Request Body:

     ```json
     {
       "tmdbId": 100,
       "userName": "John Doe",
       "rating": 8
     }
     ```

2. **Review Retrieval Endpoints**:

   - `GET /api/movies/{tmdbId}/reviews`: Fetch all reviews of a specific movie along with its information.
   - `GET /api/users/{userName}/reviews`: Fetch all reviews submitted by a specific user.

## Examples

- To submit a review:

  ```bash
  curl -X POST -H "Content-Type: application/json" -d '{
    "tmdbId": 100,
    "userName": "John Doe",
    "rating": 8
  }' http://localhost:3009/api/reviews
  ```

- To retrieve reviews of a specific movie:

  ```bash
  curl http://localhost:3009/api/movies/100/reviews
  ```

- To retrieve reviews submitted by a specific user:

  ```bash
  curl http://localhost:3009/api/users/John%20Doe/reviews
  ```

## Contributing

Contributions are welcome! Feel free to open a pull request or issue for any improvements or features you'd like to add.

## License

This project is licensed under the [MIT License](LICENSE).