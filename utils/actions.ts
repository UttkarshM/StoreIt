'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';

type Authform = {
  email: string;
  user_name?: string;
  password: string;
};

export async function login(formData: Authform) {
  const supabase = await createClient();

  let Data: Authform = {
    email: formData.email,
    password: formData.password,
  };

  console.log('Data', Data);

  const { error } = await supabase.auth.signInWithPassword({
    email: Data.email,
    password: Data.password,
  });

  if (error) {
    console.error('Error signing in:', error.message);
    redirect('/error');
  }

  console.log('User data inserted successfully:', Data);

  revalidatePath('/', 'layout');
  redirect('/dashboard');
}

export async function signup(formData: Authform) {
  const supabase = await createClient();
  let Data: Authform = {
    email: formData.email,
    password: formData.password,
  };

  console.log('Data', Data);

  const { error } = await supabase.auth.signUp({
    email: Data.email,
    password: Data.password,
  });

  if (error) {
    console.error('Error signing up:', error.message);
    redirect('/error');
  }

  insertUserData(formData);

  revalidatePath('/', 'layout');
  // redirect('/');
}

export async function insertUserData(formData: Authform) {
  const supabase = await createClient();

  let Data: Authform = {
    email: formData.email,
    password: formData.password,
  };
  const email = Data.email;
  const user_name = formData.user_name || null;
  const { error } = await supabase.from('Users').insert([{ email, user_name }]);
  console.log('error', error);
  console.log('email', email);
  console.log('user_name', user_name);
  if (error) {
    console.error('Error inserting user data:', error.message);
    redirect('/error');
    // }
  }
  console.log('User data inserted successfully:', { email, user_name });
}

interface getUserParams {
  user_name: string;
  email: string;

  phone: string;
  bio?: string;
}

export async function getUser() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (!data) {
    console.log('No user found');
    return null;
  }
  // console.log('User found:', data);
  const user_data: getUserParams = {
    user_name: data.user?.user_metadata.user_name as string,
    email: data.user?.email as string,
    phone: data.user?.phone as string,
  };

  return user_data;
}

export async function getUserInfo() {
  const user = await getUser();

  const email = user?.email;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from('Users')
    .select('*')
    .eq('email', email)
    .single();

  if (error) {
    console.log('No user found', error.message);
    return null;
  }

  console.log('1.) User info:', data);

  return data;
}
