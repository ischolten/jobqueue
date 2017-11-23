# jobqueue

### Requirements
This project assumes you have MongoDB setup as well as Node.js installed.
The required packages in this project are:
* mongoose
* Nodemon
* Express
* Request

### Implementation
I setup a mongdb database that would have the following schema.

`
url: {
    type: String,
    required: 'Enter a url'
},
created: {
    type: Date,
    default: Date.now
},
status: {
    type: [{
        type: String,
        enum: ['pending', 'completed']
    }],
    default: ['pending']
},
html: {
    type: String,
    default: null
}
`

Every time a url is added, it is pending by default. When the user tells it to fetch the next one, it will find the oldest job and get the html from that site and let the user know that the status for that id is now complete. From there, the user can take the id and get the status or get that html. A user can specify which item to delete and it will be removed from the queue.

### Instructions
1. Clone repository and make sure you have all of the required packages.

2. To run code and start database:
`npm start`
`mongod`

3. Follow Commands:

* To see jobs:

`GET http://localhost:3000/jobs`

* To get a specific job:
`GET http://localhost:3000/jobs/:id`

* To create a new job:
`POST http://localhost:3000/jobs/:url`

* To delete a job:
`DELETE http://localhost:3000/jobs/:url`

* To fetch html of the next url in the queue:
`POST http://localhost:3000/jobs/:fetchNext`
Note, this will update the status of that item to be complete.

* To get the status of a job:
`POST http://localhost:3000/jobs/getStatus/:id`

* To get the HTML of a job:
`POST http://localhost:3000/jobs/getHTML/:id`
