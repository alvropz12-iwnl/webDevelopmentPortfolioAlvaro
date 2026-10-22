import express from "express";
import { loadEnvFile } from "node:process";
import weatherRoutes from "./routes/weatherRoutes.js";
import { WeatherError, errorMiddleware } from "./errors/error-handler.js";
import { connectDB } from "./config/db.js";
import { createUser } from "./services/user-service.js";

const app = express();
app.use(express.json());
const PORT = 3000;

loadEnvFile();

const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;
const dbName = process.env.DB_NAME;

// In-memory data for the exercise
const scientists = [
    { id: 1, name: "Dr. Elena Rostova", department: "Climate", projects: 4 },
    { id: 2, name: "Prof. Marcus Vance", department: "Oceanography", projects: 2 },
    { id: 3, name: "Dr. Aisha Khan", department: "Climate", projects: 7 }
];
const initiatives = [];

const mongoUrl = `mongodb+srv://${encodeURIComponent(dbUser)}:${encodeURIComponent(dbPass)}@${dbHost}/${encodeURIComponent(dbName)}`;
await connectDB(mongoUrl);

const protect = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return next(new WeatherError("Unauthorized: Missing or invalid token header.", 401));
    }

    const token = authHeader.slice(7);
    if (token === "sustain-user-token") {
        req.user = { id: 101, name: "Elena", role: "user" };
    } else if (token === "sustain-admin-token") {
        req.user = { id: 999, name: "Prof. Gabriel", role: "admin" };
    } else {
        return next(new WeatherError("Unauthorized: Invalid token.", 401));
    }

    next();
};

app.get("/", (req, res) => {
    res.send("<h1>SustainHub API is running</h1>");
});

//add a new user to the database using the js
app.post("/user", async (req, res, next) => {
    const { username, name, email, password } = req.body || {};

    if ([username, email, password].some(value => typeof value !== "string" || !value.trim())) {
        return res.status(400).json({ error: "Username, email, and password are required." });
    }

    try {
        const user = await createUser({
            username: username.trim(),
            name: typeof name === "string" ? name.trim() : undefined,
            email: email.trim().toLowerCase(),
            password
        });

        res.status(201).json({
            id: user.id,
            username: user.username,
            name: user.name,
            email: user.email,
            role: user.role
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ error: "Username already exists." });
        }
        if (error.name === "ValidationError") {
            return res.status(400).json({ error: "Invalid user data." });
        }
        next(error);
    }
});

// /api/scientists?dept=Climate
app.get("/api/scientists", (req, res) => {
    const { dept } = req.query;

    if (dept) {
        const result = scientists.filter(
            (scientist) => scientist.department.toLowerCase() === dept.toLowerCase()
        );
        return res.json(result);
    }

    res.json(scientists);
});

// /api/scientists/2
app.get("/api/scientists/:id", (req, res) => {
    const scientistId = parseInt(req.params.id, 10);
    const scientist = scientists.find((item) => item.id === scientistId);

    if (!scientist) {
        return res.status(404).json({ errorMsg: "No scientist found." });
    }

    res.json(scientist);
});

app.get("/api/initiatives", (req, res) => {
    res.json({ initiatives, count: initiatives.length });
});

app.post("/api/initiatives", (req, res) => {
    const { title, budget, department } = req.body || {};

    if (!title || budget === undefined || budget === null || budget === "" || !department) {
        return res.status(400).json({ errorMsg: "Title, budget, and department are required." });
    }

    const initiative = { id: initiatives.length + 1, title, budget, department };
    initiatives.push(initiative);
    res.status(201).json(initiative);
});

app.get("/greet", (req, res) => {
    const { name, city } = req.query;
    res.send(`Hello ${name}, how is the weather in ${city}?`);
});

app.get("/about", (req, res) => {
    res.send("This is my WebApp Class project.");
});

app.post("/about", (req, res) => {
    res.send("This is still my WebApp Class project, but secure.");
});

// Weather is available through one protected route: /api/weather/GDL or /api/weather/LSN
app.use("/api/weather", protect, weatherRoutes);

app.use((req, res, next) => {
    next(new WeatherError("Endpoint not found", 404));
});

app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
