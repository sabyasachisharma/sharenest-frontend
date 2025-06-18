import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import * as dotenv from 'dotenv';

// Routes
import authRoutes from './routes/auth.js';
import propertiesRoutes from './routes/properties.js';
import bookingsRoutes from './routes/bookings.js';
import usersRoutes from './routes/users.js';
import reviewsRoutes from './routes/reviews.js';
import messagesRoutes from './routes/messages.js';

// Middleware
import { authenticateJWT } from './middleware/auth.js';

// Database
import { initializeDatabase } from './database/index.js';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static files (for production)
app.use(express.static(path.join(__dirname, '../dist')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/properties', propertiesRoutes);
app.use('/api/bookings', authenticateJWT, bookingsRoutes);
app.use('/api/users', authenticateJWT, usersRoutes);
app.use('/api/reviews', reviewsRoutes);
app.use('/api/messages', authenticateJWT, messagesRoutes);

// Serve the React app for any other routes (for production)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Initialize database and start server
initializeDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to initialize database:', error);
    process.exit(1);
  });

export default app;