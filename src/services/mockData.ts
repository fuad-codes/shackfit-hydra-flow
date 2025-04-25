
import { supabase } from "@/integrations/supabase/client";

// Types
export interface Member {
  id: number;
  member_id: number;
  firstname: string;
  middlename: string;
  lastname: string;
  gender: string;
  contact: string;
  address: string;
  email: string;
  date_created: string;
}

export interface Trainer {
  id: number;
  name: string;
  contact: string;
  email: string;
  rate: number;
}

export interface Package {
  id: number;
  package: string;
  description: string;
  amount: number;
}

export interface Plan {
  id: number;
  plan: number;
  amount: number;
}

// Fetch functions
export const getMembers = async (): Promise<Member[]> => {
  const { data, error } = await supabase
    .from('members')
    .select('*');
  
  if (error) {
    console.error('Error fetching members:', error);
    return [];
  }
  
  return data;
};

export const getTrainers = async (): Promise<Trainer[]> => {
  const { data, error } = await supabase
    .from('trainers')
    .select('*');
  
  if (error) {
    console.error('Error fetching trainers:', error);
    return [];
  }
  
  return data;
};

export const getPackages = async (): Promise<Package[]> => {
  const { data, error } = await supabase
    .from('packages')
    .select('*');
  
  if (error) {
    console.error('Error fetching packages:', error);
    return [];
  }
  
  return data;
};

export const getPlans = async (): Promise<Plan[]> => {
  const { data, error } = await supabase
    .from('plans')
    .select('*');
  
  if (error) {
    console.error('Error fetching plans:', error);
    return [];
  }
  
  return data;
};

// Helper functions
export const getMemberNameById = async (id: number): Promise<string> => {
  const { data, error } = await supabase
    .from('members')
    .select('firstname, lastname')
    .eq('id', id)
    .single();
  
  if (error || !data) {
    console.error('Error fetching member:', error);
    return 'Unknown Member';
  }
  
  return `${data.firstname} ${data.lastname}`;
};

export const getTrainerNameById = async (id: number): Promise<string> => {
  const { data, error } = await supabase
    .from('trainers')
    .select('name')
    .eq('id', id)
    .single();
  
  if (error || !data) {
    console.error('Error fetching trainer:', error);
    return 'Unknown Trainer';
  }
  
  return data.name;
};

// Default exports for initial data loading
export const members: Member[] = [];
export const trainers: Trainer[] = [];
export const packages: Package[] = [];
export const plans: Plan[] = [];
