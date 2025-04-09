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

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const profileSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email(),
  bio: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function UserProfilePage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: 'John Doe',
      email: 'john@example.com',
      bio: 'Software engineer and coffee enthusiast.',
    },
  });

  const onSubmit = (data: ProfileFormData) => {
    console.log('Submitted profile:', data);
    // TODO: Update profile via API
  };

  return (
    <div className="flex flex-row max-w-3xl mx-auto p-6">
      <Tabs className="" defaultValue="profile">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card className="max-w-[400px] flex flex-col gap-2">
            <CardHeader className="flex flex-col items-center gap-2">
              <Avatar className="w-20 h-20 mb-5">
                <AvatarImage src="/user.jpg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <CardTitle>John Doe</CardTitle>
              <CardDescription>john@example.com</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
              <CardContent className="space-y-4">
                <div>
                  <Label className="mb-2" htmlFor="name">
                    Name
                  </Label>
                  <Input id="name" {...register('name')} />
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
                  <Input id="email" type="email" {...register('email')} />
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
                  <Textarea id="bio" rows={4} {...register('bio')} />
                </div>
              </CardContent>
              <CardFooter>
                <Label className="text-black mt-5 text-[14px]">
                  Total Space Occupied:
                </Label>
                <Label className="text-gray-600 ml-2 mt-5 text-[14px]">
                  50 GB of 100 GB
                </Label>
              </CardFooter>
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
              <Input id="new-password" type="password" placeholder="********" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
