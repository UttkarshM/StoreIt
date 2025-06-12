'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { getUserInfo, getUser } from '@/utils/actions';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';

const profileSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email(),
  bio: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

interface UserInfo {
  name: string;
  email: string;
  bio: string;
}

// Uncomment this line to fetch user info on component mount

export default function UserProfilePage() {
  // getUserInfo();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');

  // const user = getUserInfo();
  // console.log('User:', user);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfo = await getUserInfo();

        if (!userInfo) {
          console.log('No user found');
          return;
        }
        setName(userInfo.user_name);
        setEmail(userInfo.email);

        // console.log('2.)User info:', userInfo.user_name);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: 'John ',
      email: 'john@example.com',
      bio: 'Software engineer and coffee enthusiast.',
    },
  });

  const onSubmit = (data: ProfileFormData) => {
    console.log('Submitted profile:', data);
    // TODO: Update profile via API
  };

  return (
    <div className="flex flex-row w-[500px] mx-auto p-6">
      <Tabs className="" defaultValue="profile">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card className="w-[400px] flex flex-col gap-2">
            <CardHeader className="flex flex-col items-center gap-2">
              <Avatar className="w-20 h-20 mb-5">
                <AvatarImage src="/user.jpg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <CardTitle>{name}</CardTitle>
              <CardDescription>{email}</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
              <CardContent className="space-y-4">
                <div>
                  <Label className="mb-2" htmlFor="name">
                    Name
                  </Label>
                  <Input id="name" defaultValue={name} />
                  {errors.name && (
                    <p className="text-sm text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label className="mb-2" htmlFor="email">
                    Email
                  </Label>
                  <Input id="email" type="email" defaultValue={email} />
                  {errors.email && (
                    <p className="text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label className="mb-2" htmlFor="bio">
                    Bio
                  </Label>
                  <Textarea
                    id="bio"
                    rows={4}
                    defaultValue={bio ? bio : 'Software Engineer'}
                  />
                </div>
              </CardContent>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card className="flex flex-col gap-2 w-[400px]">
            <CardHeader>
              <div className="flex flex-row items-center justify-start">
                <CardTitle>Log out:</CardTitle>
                <button className=" rounded-[10px] mt-1 ml-10 p-2 bg-red-500 max-w-[100px]">
                  logout
                </button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Label className="mb-2" htmlFor="password">
                Current Password
              </Label>
              <Input id="password" type="password" placeholder="********" />

              <Label className="mb-2" htmlFor="new-password">
                New Password
              </Label>
              <Input id="new-password" type="password" placeholder="" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
