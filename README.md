# Experimental

- Demo URL: https://prahladyeri.github.io/experimental-backbone/

## This is an experimental, full stack, single-page starter app I'm trying to develop using:

- Front-end
	- Backbone.js
	- Twitter Bootstrap
	- jquery-ui
	- fontawesome
	- Google Fonts
	
- Back-end
	- Python (Flask Framework)
	- SQL Alchemy

This is freely licensed under MIT and you are free to share and use.
Helpful contributions will be welcome, of course!

## Running the app

Just download and git clone this repository and directly start serving with an http file server such as python's `http.server` module or PHP's built-in server (`PHP -S <end-point>`):

```
$ git clone git@github.com:prahladyeri/experimental-backbone.git .
$ python -m http.server
$ Serving HTTP on 0.0.0.0 port 8000 ...
...
```

In order to simulate delays that usually happen in a live environment, you can also use the [http-live-simulator](https://github.com/prahladyeri/http-live-simulator) tool I've written. This tool adds a 300-500 milliseconds delay to each requested resource to simulate a live hosted environment. This is very important for javascript applications as these delays cause a significant funcitional impact on event loop based asyncronous programming model.

## Pending Tasks

```
* Organize index.html, link stylesheets, scripts, etc.
* Add navbar and footer.
* Create tables and data structures for user authentication
+ Create backbone models
	+ User
+ Create backbone collections
	+ Users
* Create backbone routers and event bus.
+ Create backbone views 
	- LoginView
	- RegisterView
	- HomeView
	- AboutView
	- TestView
+ Create home dashboard.
+ Core modules:
	* Login/Logout
	- Profile page
	- User management (only for admin roles)
	+ About Page
- Add Page change animation and other shiny things
- Configure "Experimental" in a variable instead of hard-coding it
- Online mode and backend database handling
- Check why indexeddb isn't working in private browsing mode
----

Legend:
- Pending
+ Work in Progress
* Done
```
