import { createClient } from "@refinedev/supabase";

const VITE_SUPABASE_URL = "https://vreogldrrtaobqvmttzp.supabase.co"
const VITE_SUPABASE_KEY ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZyZW9nbGRycnRhb2Jxdm10dHpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQyMDc1MjksImV4cCI6MjA0OTc4MzUyOX0.Fpf8eMxeP9a42GH731SZenRDTDkBWJzsZdrYP0ge2R0"

export const supabaseClient = createClient(VITE_SUPABASE_URL, VITE_SUPABASE_KEY, {
  db: {
    schema: "public",
  },
  auth: {
    persistSession: true,
  },
});

// const supabaseAdmin = createClient(
//   VITE_SUPABASE_URL,
//   process.env.SUPABASE_SECRET!
// );