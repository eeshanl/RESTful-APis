// Books and Genres web service

// call the packages we need
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// my models
var Genre = require('./models/genre');
var Book = require('./models/book');

var port = 8080; // set our port

// MongoDB
mongoose.connect('eeshan:eeshan@ds017070.mlab.com:17070/eeshan');
var db = mongoose.connection;

// middleware
app.use(bodyParser.json());

app.get('/', function(request, response) {
	response.send("swag");
});

/* Genre */

app.get('/api/genres', function(request, response) {
	Genre.getGenres(function(err, genres) {
		if (err) {
			throw err;
		}
		response.json(genres);
	});
});

app.post('/api/genres', function(request, response) {
	var genre = request.body;
	Genre.addGenre(genre, function(err, genre) {
		if (err) {
			throw err;
		}
		response.json(genre);
	});
});

/* Books */

app.get('/api/books/', function(request, response) {
	Book.getBooks(function(err, books) {
		if (err) {
			throw err;
		}
		response.json(books);
	});
});


app.get('/api/books/:_id', function(request, response) {
	Book.getBookById(request.params._id, function(err, book) {
		if (err) {
			throw err;
		}
		response.json(book);
	});
});

app.post('/api/books', function(request, response) {
	var book = request.body;
	Book.addBook(book, function(err, book) {
		if (err) {
			throw err;
		}
		response.json(book);
	});
});

app.listen(port);
console.log('Magic happens on port ' + port);
