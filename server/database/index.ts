import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Database file path
const dbFile = path.join(__dirname, '../../data/database.sqlite');

// Ensure the data directory exists
const dataDir = path.join(__dirname, '../../data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Database connection
let db: any = null;

// Initialize the database
export const initializeDatabase = async () => {
  try {
    // Open the database
    db = await open({
      filename: dbFile,
      driver: sqlite3.Database,
    });

    console.log('Connected to SQLite database');

    // Enable foreign keys
    await db.exec('PRAGMA foreign_keys = ON');

    // Create tables if they don't exist
    await createTables();

    // Seed the database with initial data if it's empty
    await seedDatabase();

    return db;
  } catch (error) {
    console.error('Database initialization error:', error);
    throw error;
  }
};

// Get the database connection
export const getDb = () => {
  if (!db) {
    throw new Error('Database not initialized. Call initializeDatabase first.');
  }
  return db;
};

// Create database tables
const createTables = async () => {
  // Users table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      role TEXT NOT NULL CHECK (role IN ('guest', 'host', 'admin')),
      avatar TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Properties table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS properties (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      address TEXT NOT NULL,
      city TEXT NOT NULL,
      state TEXT NOT NULL,
      country TEXT NOT NULL,
      zip_code TEXT NOT NULL,
      latitude REAL,
      longitude REAL,
      price_per_night REAL NOT NULL,
      type TEXT NOT NULL CHECK (type IN ('house', 'apartment', 'room', 'unique')),
      bedroom_count INTEGER NOT NULL,
      bathroom_count REAL NOT NULL,
      max_guest_count INTEGER NOT NULL,
      host_id TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (host_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);

  // Property Images table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS property_images (
      id TEXT PRIMARY KEY,
      property_id TEXT NOT NULL,
      image_url TEXT NOT NULL,
      position INTEGER NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
    )
  `);

  // Property Amenities table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS property_amenities (
      property_id TEXT NOT NULL,
      amenity TEXT NOT NULL,
      PRIMARY KEY (property_id, amenity),
      FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
    )
  `);

  // Bookings table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS bookings (
      id TEXT PRIMARY KEY,
      property_id TEXT NOT NULL,
      guest_id TEXT NOT NULL,
      check_in_date DATE NOT NULL,
      check_out_date DATE NOT NULL,
      total_price REAL NOT NULL,
      status TEXT NOT NULL CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
      guest_count INTEGER NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE,
      FOREIGN KEY (guest_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);

  // Reviews table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS reviews (
      id TEXT PRIMARY KEY,
      property_id TEXT NOT NULL,
      booking_id TEXT NOT NULL,
      guest_id TEXT NOT NULL,
      rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
      comment TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE,
      FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE,
      FOREIGN KEY (guest_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);

  // Messages table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS messages (
      id TEXT PRIMARY KEY,
      booking_id TEXT NOT NULL,
      sender_id TEXT NOT NULL,
      recipient_id TEXT NOT NULL,
      content TEXT NOT NULL,
      is_read BOOLEAN DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE,
      FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (recipient_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);

  // Favorites table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS favorites (
      user_id TEXT NOT NULL,
      property_id TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (user_id, property_id),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
    )
  `);

  console.log('Database tables created');
};

// Seed the database with initial data if empty
const seedDatabase = async () => {
  // Check if users table is empty
  const userCount = await db.get('SELECT COUNT(*) as count FROM users');
  
  if (userCount.count === 0) {
    console.log('Seeding database with initial data...');
    // Implementation for seeding would go here
  }
};