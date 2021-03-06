const path = require("path")
const express = require("express")
const hbs = require("hbs")

const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config

const publicDirectoryPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

// Setup handlebars engine and views location
app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// req - is an object containing information about the incoming request to the server
// res - contains a bunch of methods allowing us to customize what we're going to send back to the requester

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Kevin",
  })
})

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Kevin",
  })
})

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is some helpful text",
    title: "Help",
    name: "Kevin",
  })
})

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide a search term",
    })
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error })
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error })
        }
        res.send({
          forecast: forecastData,
          location: location,
          address: req.query.address,
        })
      })
    }
  )
})

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    })
  }
  console.log(req.query.search)
  res.send({ products: [] })
})

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Kevin",
    errorMessage: "Help article not found",
  })
})

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Kevin",
    errorMessage: "Page not found",
  })
})

app.listen(port, () => {
  console.log("Server is up on port" + port)
})
