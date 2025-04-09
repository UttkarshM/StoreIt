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
  redirect('/account');
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
