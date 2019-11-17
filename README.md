# README

## Pre-requisites
Ruby 2.6.5
Install [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
Postgres DB setup
Node 10.15.1
Yarn 1.15.2

## Local Development
### Install Backend Dependencies

    $ bundle install    

### Set Up Database

    $ rails db:setup
    $ rails db:migrate

### Install Frontend Dependencies

    $ cd client && yarn install    

### Run app as a heroku app

    $ heroku local -f Procfile.dev

### Usage
1. Navigate to http://localhost:4000.
2. Register a user.
3. Sign In as created user.
4. Use the various obtions on navigation tabs to create, redirect to or view list of created Short URLs.

## Deployment
App is currently deployed as a Heroku app available at `http://bit-ly.herokuapp.com/`

## Usage
### Web Interface
1. Login to the app at `http://bit-ly.herokuapp.com/`
2. Register a user.
3. Sign in as create user.
4. Use the Create option to add a new URL which needs to be shortened. 
5. All Short URLs option shows the list of URLs created by user.
6. To share a short URL use `http://bit-ly.herokuapp.com/v1/to/{{shorturl}}` or copy using the option in the List of short URLs page.

### API mode
1. Register a new user at 
2. Login as new user at `http://bit-ly.herokuapp.com/api/v1/users/authenticate` with POST body
```
      {
        email: 'user@example.com',
        password: 'mypassword',
        name: 'My Full Name'
      }
```

1. Get a list of URLs at `http://bit-ly.herokuapp.com/api/v1/url_shorts` with Authorization header using token returned from login (step 2).
2. Create a new short URL at `http://bit-ly.herokuapp.com/api/v1/url_shorts/new` with Authorization header using token returned from login (step 2), and request body
```
      {
        full_url: "http://www.example.com"
      }
```

1. To redirect to a site referenced by short URL `shortURL` use `http://bit-ly.herokuapp.com/v1/to/shorturl`

## Future Improvements
1. Full code and test coverage, both backend and frontend.
2. Swagger documentation for APIs.
3. Better UI transitions, and improved user registration and authorization UX.

## Assumptions
1. This app uses the [Blake2](https://blake2.net/) hashing function.
2. The app uses the user's email as the key for the hashing, and creates a 8 character hash. This should create a possible combination of upto 2,821,109,907,456 unique short URLs, from a set of `[0-9a-z]` characters. This could be further enhanced by also allowing additional (caps) characters.
3. Log out is achieved by clearing auth token from local storage, by navigating to the Sign In screen, or Register screen.