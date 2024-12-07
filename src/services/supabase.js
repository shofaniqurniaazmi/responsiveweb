import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hcyexdbwkfeurrmdrysu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhjeWV4ZGJ3a2ZldXJybWRyeXN1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyOTc3OTk3NiwiZXhwIjoyMDQ1MzU1OTc2fQ.DPhl7k0UhtV5M43pIkgS_KaINllHl4TiuGy8odY3NYc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);