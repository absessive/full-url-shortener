# README

## Pre-requisites
Ruby 2.6.5
Install Heroku CLI (https://devcenter.heroku.com/articles/heroku-cli)
Postgres DB setup

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
1. Login to the app at `http://bit-ly.herokuapp.com/`
2. Register a user.
3. Sign in as create user.
4. Use the Create option to add a new URL which needs to be shortened. 
5. All Short URLs option shows the list of URLs created by user.
6. To share a short URL use ``http://bit-ly.herokuapp.com/v1/to/{{shorturl}}`.



    