const { VITE_SUPABASE_URL, VITE_SUPABASE_KEY } = import.meta.env

export default {
  credentials: {
    supabaseUrl: VITE_SUPABASE_URL,
    supabaseKey: VITE_SUPABASE_KEY
  }
}
