-- Create highlights table in Supabase
-- Go to your Supabase Dashboard > SQL Editor and run this query

CREATE TABLE IF NOT EXISTS highlights (
    id BIGSERIAL PRIMARY KEY,
    stream_title TEXT NOT NULL,
    stream_date TEXT NOT NULL,
    timestamps TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Enable Row Level Security
ALTER TABLE highlights ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (you can make this more restrictive later)
CREATE POLICY "Allow all operations on highlights" ON highlights
    FOR ALL
    USING (true)
    WITH CHECK (true);
