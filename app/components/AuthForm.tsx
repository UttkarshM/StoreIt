'use client';

import { UseDispatch, useSelector } from 'react-redux';
import { AppState } from '@/redux/store';
import { setUser, clearUser } from '@/redux/userSlice';

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';

import { getUserInfo } from '@/utils/actions';
import { Input } from '@/components/ui/input';
import { login, signup } from '../../utils/actions';
import { useDispatch } from 'react-redux';

type FormType = 'sign-in' | 'sign-up';

const signUpSchema = z.object({
  user_name: z.string().min(2, 'Username too short').max(50),
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password too short'),
});

const signInSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password too short'),
});

type SignUpData = z.infer<typeof signUpSchema>;
type SignInData = z.infer<typeof signInSchema>;

export const AuthForm = ({ type }: { type: FormType }) => {
  const dispatch = useDispatch();
  const user_state = useSelector((state: AppState) => state.user);
  // const isAuthenticated = useSelector(
  //   (state: AppState) => state.user.isAuthenticated
  // );

  const isSignUp = type === 'sign-up';

  const form = useForm<SignUpData | SignInData>({
    resolver: zodResolver(isSignUp ? signUpSchema : signInSchema),
    defaultValues: {
      user_name: '',
      email: '',
      password: '',
    },
  });

  const handleSubmit = async (values: any) => {
    try {
      if (isSignUp) {
        await signup(values);
        console.log('Sign Up:', values);
      } else {
        await login(values);
        console.log('Sign In:', values);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1 className="mb-[10%] text-5xl underline underline-offset-8">
        {isSignUp ? 'Sign Up' : 'Sign In'}
      </h1>
      {isSignUp ? (
        <p className="mb-4 text-sm text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="text-blue-500 hover:underline">
            Sign In
          </a>
        </p>
      ) : (
        <p className="mb-4 text-sm text-gray-600">
          Want to log in an exisiting account?{' '}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </a>
        </p>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          {isSignUp && (
            <FormField
              control={form.control}
              name="user_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Username" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit">{isSignUp ? 'Sign Up' : 'Sign In'}</Button>
        </form>
      </Form>
    </div>
  );
};

export default AuthForm;
