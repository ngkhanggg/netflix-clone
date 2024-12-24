import express from 'express';

import cookieParser from 'cookie-parser';

import authRoutes from './src/routes/auth.route.js';
import movieRoutes from './src/routes/movie.route.js';
import tvRoutes from './src/routes/tv.route.js';
import searchRoute from './src/routes/search.route.js';

import { ENV_VARS } from './src/config/envVars.js';
import { connectDB } from './src/config/db.js';
import { protectRoute } from './src/middleware/protectRoute.js';

const app = express();

const PORT = ENV_VARS.PORT;

app.use(express.json());  // allow parsing req.body
app.use(cookieParser());  // allow parsing cookies

app.get('/', (req, res) => {
    res.send('Home')
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/movie', protectRoute, movieRoutes);
app.use('/api/v1/tv', protectRoute, tvRoutes);
app.use('/api/v1/search', protectRoute, searchRoute);

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
    connectDB();
});
