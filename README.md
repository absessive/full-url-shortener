# README

## Pre-requisites
Ruby 2.6.5
Install Heroku CLI (https://devcenter.heroku.com/articles/heroku-cli)
Postgres DB setup

## Local Development
### Install Dependencies

    $ bundle install

### Set Up Database

    $ rails db:setup
    $ rails db:migrate

### Run app as a heroku app

    $ heroku local -f Procfile.dev

### Usage
1. Navigate to http://localhost:4000.
2. Register a user.
3. Sign In as created user.
4. Use the various obtions on navigation tabs to create, redirect to or view list of created Short URLs.



    