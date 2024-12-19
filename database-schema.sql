
-- Create users table (unchanged)
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('client', 'salesperson', 'manager') NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  full_name VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_role (role)
) ENGINE=InnoDB;

-- Create consultations table (updated)
CREATE TABLE consultations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  client_id INT NOT NULL,
  salesperson_id INT,
  service_type ENUM(
      'gas_detection',
      'fire_detection',
      'fall_protection',
      'automation',
      'emergency_notification',
      'intercom_paging',
      'air_gas_treatment',
      'air_compression',
      'switches',
      'equipment_protection',
      'video_surveillance',
      'instrument_air'
  ) NOT NULL,
  location VARCHAR(255) NOT NULL,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  priority ENUM('high', 'medium', 'low') NOT NULL,
  status ENUM('pending', 'in_progress', 'completed') DEFAULT 'pending',
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (client_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (salesperson_id) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_status (status),
  INDEX idx_priority (priority),
  INDEX idx_service_type (service_type),
  INDEX idx_location (location),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB;

-- Create consultation_notes table (unchanged)
CREATE TABLE consultation_notes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  consultation_id INT NOT NULL,
  user_id INT NOT NULL,
  note TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (consultation_id) REFERENCES consultations(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_consultation_id (consultation_id)
) ENGINE=InnoDB;

-- Create regions table (unchanged)
CREATE TABLE regions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  UNIQUE KEY unique_region_name (name)
) ENGINE=InnoDB;

-- Create salesperson_regions table (unchanged)
CREATE TABLE salesperson_regions (
  salesperson_id INT NOT NULL,
  region_id INT NOT NULL,
  PRIMARY KEY (salesperson_id, region_id),
  FOREIGN KEY (salesperson_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (region_id) REFERENCES regions(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Create products table (new)
CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category ENUM(
      'gas_detection',
      'fire_detection',
      'fall_protection',
      'automation',
      'emergency_notification',
      'intercom_paging',
      'air_gas_treatment',
      'air_compression',
      'switches',
      'equipment_protection',
      'video_surveillance',
      'instrument_air'
  ) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2),
  stock INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_category (category)
) ENGINE=InnoDB;

-- Create consultation_products table (new)
CREATE TABLE consultation_products (
  consultation_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  PRIMARY KEY (consultation_id, product_id),
  FOREIGN KEY (consultation_id) REFERENCES consultations(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
) ENGINE=InnoDB;

