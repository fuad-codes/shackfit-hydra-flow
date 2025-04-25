
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://streluffrgjduchwhlga.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0cmVsdWZmcmdqZHVjaHdobGdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU1OTQ5NzEsImV4cCI6MjA2MTE3MDk3MX0.mmrXzNKz2oBHp7BuoaAYIpWAtoxEuvm2dQ7O5E-pI_c";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
