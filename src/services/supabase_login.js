import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://aemxfbeocjknrixbsvia.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFlbXhmYmVvY2prbnJpeGJzdmlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM1NTg4MTksImV4cCI6MjA0OTEzNDgxOX0.md_HXpVm_19fDgM9Y-5OtmBFfoe3pJlGgkRmeNO7_Ww';

export const supabase_login = createClient(supabaseUrl, supabaseAnonKey);