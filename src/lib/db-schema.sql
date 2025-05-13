-- Database schema for TI-BOT School Management System

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'teacher', 'staff')),
  status TEXT NOT NULL CHECK (status IN ('active', 'inactive')),
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Alerts table
CREATE TABLE IF NOT EXISTS alerts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  severity TEXT NOT NULL CHECK (severity IN ('low', 'medium', 'high')),
  source TEXT NOT NULL CHECK (source IN ('system', 'user', 'device')),
  status TEXT NOT NULL CHECK (status IN ('active', 'acknowledged', 'resolved')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  resolved_at TIMESTAMP WITH TIME ZONE,
  created_by UUID REFERENCES users(id)
);

-- Schedules table
CREATE TABLE IF NOT EXISTS schedules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  location TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('announcement', 'bell', 'activity')),
  audio_preset INTEGER,
  status TEXT NOT NULL CHECK (status IN ('upcoming', 'current', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES users(id)
);

-- Announcements table
CREATE TABLE IF NOT EXISTS announcements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('text', 'voice')),
  audience TEXT NOT NULL,
  scheduled BOOLEAN NOT NULL DEFAULT FALSE,
  scheduled_time TIMESTAMP WITH TIME ZONE,
  status TEXT NOT NULL CHECK (status IN ('draft', 'sent', 'scheduled')),
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES users(id)
);

-- Device status table
CREATE TABLE IF NOT EXISTS device_status (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  battery INTEGER NOT NULL,
  connectivity TEXT NOT NULL,
  temperature NUMERIC NOT NULL,
  system_status TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Diagnostic items table
CREATE TABLE IF NOT EXISTS diagnostic_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('normal', 'warning', 'critical')),
  value TEXT NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  device_id UUID REFERENCES device_status(id)
);

-- System logs table
CREATE TABLE IF NOT EXISTS system_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type TEXT NOT NULL CHECK (type IN ('info', 'warning', 'error')),
  message TEXT NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  device_id UUID REFERENCES device_status(id)
);

-- Audio presets table
CREATE TABLE IF NOT EXISTS audio_presets (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Settings table
CREATE TABLE IF NOT EXISTS settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE device_status ENABLE ROW LEVEL SECURITY;
ALTER TABLE diagnostic_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE audio_presets ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Remove all existing policies on users table (if any)
DROP POLICY IF EXISTS "Allow full access to all tables" ON users;
-- You may need to drop other policies if they exist, e.g.:
-- DROP POLICY IF EXISTS some_other_policy ON users;

-- Re-create open access policy
CREATE POLICY "Allow full access to all tables" ON users FOR ALL USING (true);

-- Create policies for development (open access)
CREATE POLICY "Allow full access to all tables" ON alerts FOR ALL USING (true);
CREATE POLICY "Allow full access to all tables" ON schedules FOR ALL USING (true);
CREATE POLICY "Allow full access to all tables" ON announcements FOR ALL USING (true);
CREATE POLICY "Allow full access to all tables" ON device_status FOR ALL USING (true);
CREATE POLICY "Allow full access to all tables" ON diagnostic_items FOR ALL USING (true);
CREATE POLICY "Allow full access to all tables" ON system_logs FOR ALL USING (true);
CREATE POLICY "Allow full access to all tables" ON audio_presets FOR ALL USING (true);
CREATE POLICY "Allow full access to all tables" ON settings FOR ALL USING (true);

-- Enable realtime for all tables
ALTER TABLE users REPLICA IDENTITY FULL;
ALTER TABLE alerts REPLICA IDENTITY FULL;
ALTER TABLE schedules REPLICA IDENTITY FULL;
ALTER TABLE announcements REPLICA IDENTITY FULL;
ALTER TABLE device_status REPLICA IDENTITY FULL;
ALTER TABLE diagnostic_items REPLICA IDENTITY FULL;
ALTER TABLE system_logs REPLICA IDENTITY FULL;
ALTER TABLE audio_presets REPLICA IDENTITY FULL;
ALTER TABLE settings REPLICA IDENTITY FULL;

-- Insert initial data for audio presets
INSERT INTO audio_presets (id, name, file_path, description)
VALUES 
  (1, 'Morning Bell', 'morning-bell.mp3', 'Standard morning bell sound'),
  (2, 'Class Change', 'class-change.mp3', 'Bell for class period changes'),
  (3, 'Lunch Bell', 'lunch-bell.mp3', 'Bell indicating lunch period'),
  (4, 'Dismissal Bell', 'dismissal.mp3', 'End of day dismissal bell'),
  (5, 'Emergency Tone', 'emergency.mp3', 'Emergency notification sound'),
  (6, 'Fire Drill', 'fire-drill.mp3', 'Fire drill announcement tone'),
  (7, 'Lockdown', 'lockdown.mp3', 'Lockdown procedure announcement'),
  (8, 'All Clear', 'all-clear.mp3', 'All clear notification sound')
ON CONFLICT (id) DO NOTHING;

-- Insert initial device status
INSERT INTO device_status (id, battery, connectivity, temperature, system_status)
VALUES 
  (uuid_generate_v4(), 85, 'Strong', 38, 'Active')
ON CONFLICT DO NOTHING;

-- Insert initial diagnostic items
INSERT INTO diagnostic_items (name, status, value, timestamp)
VALUES 
  ('CPU Temperature', 'normal', '45°C', NOW()),
  ('Memory Usage', 'warning', '85%', NOW()),
  ('Storage', 'normal', '45% used', NOW()),
  ('Network Latency', 'normal', '15ms', NOW()),
  ('Battery Health', 'normal', 'Good', NOW()),
  ('Speaker System', 'critical', 'Fault Detected', NOW()),
  ('Microphone', 'normal', 'Operational', NOW()),
  ('Software Version', 'warning', 'Update Available', NOW())
ON CONFLICT DO NOTHING;

-- Insert initial system logs
INSERT INTO system_logs (type, message, timestamp)
VALUES
  ('info', 'System startup completed successfully', NOW() - INTERVAL '2 HOURS'),
  ('info', 'Morning announcements broadcast initiated', NOW() - INTERVAL '1 HOUR 45 MINUTES'),
  ('info', 'Morning announcements broadcast completed', NOW() - INTERVAL '1 HOUR 40 MINUTES'),
  ('warning', 'Memory usage exceeding 80% threshold', NOW() - INTERVAL '15 MINUTES'),
  ('error', 'Speaker system fault detected in Building B', NOW() - INTERVAL '5 MINUTES'),
  ('info', 'Scheduled system diagnostic initiated', NOW()),
  ('info', 'Diagnostic completed: 2 issues found', NOW() + INTERVAL '3 MINUTES'),
  ('warning', 'Software update available: v2.5.3', NOW() + INTERVAL '5 MINUTES')
ON CONFLICT DO NOTHING;
