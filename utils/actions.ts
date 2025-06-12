'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';
import {
  Authform,
  getFileType,
  getUserParams,
  FileWithPath,
} from './supabase/types';

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

  return data;
}

export async function UploadFileToServer({ file, path = '' }: FileWithPath) {
  const supabase = await createClient();
  const uploadPath = path
    ? `uploads/${path}/${file.file.name}`
    : `uploads/${file.file.name}`;

  console.log('Pather:', path);
  console.log('Path:', uploadPath);

  const { data, error } = await supabase.storage
    .from('files')
    .upload(uploadPath, file.file, {
      cacheControl: '3600',
      upsert: true,
    });

  console.log('File data:', data);

  const file_type = file.file.name.split('.').pop() || 'unknown';
  await supabase.from('Files').insert([
    {
      file_name: file.file.name,
      file_size: file.file.size,
      file_type: file_type,
      url: data?.path || '',
    },
  ]);

  console.log('Files Uploaded');
  if (error) {
    console.error('Error uploading file:', error.message);
    throw new Error('Upload failed');
  }
}

export async function deleteFile(file: { file: File }) {
  const supabase = await createClient();
  const { data, error } = await supabase.storage
    .from('files')
    .remove([`uploads/${file.file.name}`]);

  if (error) {
    console.error('Error deleting file:', error.message);
    throw new Error('Delete failed');
  }
}
export async function getFiles(path: { path: string }, searchTerm?: string) {
  const supabase = await createClient();

  let query = supabase
    .from('Files')
    .select('*')
    .ilike('url', `uploads/${path.path}/%`)
    .order('created_at', { ascending: false });

  if (searchTerm && searchTerm.trim() !== '') {
    query = query.ilike('file_name', `%${searchTerm}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching files:', error.message);
    throw new Error('Fetch failed');
  }

  return data;
}

export async function getFile({ file_name, path }: getFileType) {
  const supabase = await createClient();
  const bucketName = 'files';

  // Ensure trailing slash isn't duplicated
  const cleanPath = path.replace(/\/$/, '');
  const uploadPath = `uploads/${cleanPath}/${file_name}`;

  const { data } = supabase.storage.from(bucketName).getPublicUrl(uploadPath);

  console.log('Path:', uploadPath);
  console.log('File data:', data);

  return data?.publicUrl;
}
