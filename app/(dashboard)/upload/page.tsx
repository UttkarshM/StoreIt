'use client';

import { FileUploader } from '@/app/components/file-uploader';
import { useSelector } from 'react-redux';
import { AppState } from '@/redux/store';
import { useAppSelector } from '@/redux/hooks';

export default function Home() {
  const user_state = useSelector((state: AppState) => state.user);
  // const user_state = useAppSelector((state) => state.user);

  console.log('state:', user_state);
  return (
    <main className="flex w-full min-h-screen flex-col items-center justify-center p-4 md:p-24">
      <div className="w-full max-w-3xl mx-auto space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">File Upload</h1>
          <p className="text-muted-foreground">
            Upload your files securely to our cloud storage
          </p>
        </div>
        <FileUploader path={user_state.user?.email as string} />
      </div>
    </main>
  );
}
