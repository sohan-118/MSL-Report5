const express = require("express");
const db = require("./db");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Movie REST API Server is Running!",
        endpoints: {
            directors: "/directors",
            actors: "/actors",
            movies: "/movies",
            characters: "/characters",
            relationships: "/relationships",
            moviesWithDirectors: "/movies-with-directors",
            movieById: "/movies/:id"
        }
    });
});


app.get("/directors", (req, res) => {

    const sql = "SELECT * FROM Director";

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        res.json(result);
    });
});


app.get("/actors", (req, res) => {

    const sql = "SELECT * FROM Actor";

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        res.json(result);
    });
});


app.get("/movies", (req, res) => {

    const sql = "SELECT * FROM Movie";

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        res.json(result);
    });
});


app.get("/characters", (req, res) => {

    const sql = "SELECT * FROM Movie_Characters";

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        res.json(result);
    });
});


app.get("/relationships", (req, res) => {

    const sql = "SELECT * FROM Movie_Character_Relationship";

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        res.json(result);
    });
});


app.get("/movies-with-directors", (req, res) => {

    const sql = `
        SELECT
            Movie.Movie_ID,
            Movie.Movie_Name,
            Movie.Genre,
            Movie.Year,
            Movie.IMDb_Rating,
            Director.Director_Name
        FROM Movie
        JOIN Director
        ON Movie.Director_ID = Director.Person_ID
    `;

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        res.json(result);
    });
});


app.get("/movies/:id", (req, res) => {

    const movieId = req.params.id;

    const sql = `
        SELECT * FROM Movie
        WHERE Movie_ID = ?
    `;

    db.query(sql, [movieId], (err, result) => {

        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        if (result.length === 0) {
            return res.status(404).json({
                message: "Movie not found"
            });
        }

        res.json(result[0]);
    });
});


app.post("/movies", (req, res) => {

    const {
        Movie_ID,
        Movie_Name,
        Genre,
        Year,
        IMDb_Rating,
        Director_ID
    } = req.body;


    // Check required fields
    if (
        !Movie_ID ||
        !Movie_Name ||
        !Genre ||
        !Year ||
        !IMDb_Rating ||
        !Director_ID
    ) {
        return res.status(400).json({
            error: "All movie fields are required"
        });
    }


    const sql = `
        INSERT INTO Movie
        (
            Movie_ID,
            Movie_Name,
            Genre,
            Year,
            IMDb_Rating,
            Director_ID
        )
        VALUES (?, ?, ?, ?, ?, ?)
    `;


    const values = [
        Movie_ID,
        Movie_Name,
        Genre,
        Year,
        IMDb_Rating,
        Director_ID
    ];


    db.query(sql, values, (err, result) => {

        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        res.status(201).json({
            message: "Movie inserted successfully",
            Movie_ID: Movie_ID
        });
    });
});


app.use((req, res) => {

    res.status(404).json({
        error: "Route not found"
    });

});


const PORT = 3000;

app.listen(PORT, () => {

    console.log("Movie REST API Server");
    console.log(`Server running at http://localhost:${PORT}`);
    

});