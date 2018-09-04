# General information about the team and the web application

- Heroku URL: ​ http://polimi-hyp-2018-team-10561373.dashboard.heroku.com
- Bitbucket repo URL: ​ http://....
- Team administrator: Lorenzo Farinelli, 10561373, polimi-hyp-2018-10561373

# Description of the REST API

- **/events?date=isostring&type=type&fields=field1,fieldn** _(date = isostring representation of date, type = type of events[theatre, music, dance, side], fields = comma-delimited names of columns to return)_ - return all the events matching the provided parameters (if null returns all the events)

- **/events/:id?fields=field1,fieldn** _(:id = identifier of event in the database, fields = fields to be returned [if empty return the default ones])_ - return the details of the requested event

- **/artists/?fields=field1,fieldn&sort=asc** _(fields = comma-delimited named of columns to return, sort = sorting strategy [asc=ascending, desc=descending])_ - return all the artists in alphabetical order

- **/artists/:id?fields=field1,fieldn** _(id = identifier of artist in database, fields = comma-delimited names of columns to return)_ - Return the details of the requested artist

- **/dates?sort=asc** _(sort = sorting strategy [asc=ascending, desc=descending])_ - get all the dates in which events are scheduled

- **/info?fields=field1,fieldn** _(fields = comma-delimited names of info fields to return)_ - get information about the festival, contacts of the organization and list of all the sponsors
- **/news?fields=field1,fieldn** _(fields = comma-delimited named of columns to return)_ - get all the news of the festival
- **/locations?fields=field1,fieldn** _(fields = comma-delimited named of columns to return)_ - get all the locations in which events are held

- **/bookings** - (POST) Create a new booking for the specified user and event
- **/requests** - (POST) Create a new information request for the specified user
