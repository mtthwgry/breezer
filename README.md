# breezer
This is an application built for [Breeze's engineering challenge](http://www.github.com/joinbreeze/map-challenge). It visualizes the dataset through an interactive map-based interface. You can filter markers by user and transaction type. Clicking on a name will add that user's markers to the map. Each user is given a randomly generated color that corresponds to markers on the map.

I used a combination of mobile and responsive design for this project. No HTML/CSS frameworks were used.

## Use
After cloning the repo to your computer, you will need to run the following from the applications root directory:
```bash
bundle install
```
Setup the database:
```bash
bundle exec rake db:setup
```
Run the following rake tasks to populate the database:
```bash
bundle exec rake import_from_csv:users FILENAME=users.csv
bundle exec rake import_from_csv:locations FILENAME=locations.csv
bundle exec rake import_from_csv:transactions FILENAME=transactions.csv
```
Fire up the server:
```bash
bundle exec rails server
```
Visit http://localhost:3000 in your browser of choice.

## Technologies Used
- Rails 4.2
- Ruby 2.2.0
- Rspec 3.2.3 with shoulda-matchers
- PostgreSQL
- Mapbox

## Contact
Matthew Gray  
Email: matthew (at) mtthwgry (dot) com  
Twitter: [@mtthwgry](http://twitter.com/mtthwgry)  
Blog: [www.mtthwgry.com](http://www.mtthwgry.com)  
