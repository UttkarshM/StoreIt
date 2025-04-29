'use client';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Entries_Type,
  file_types_to_logos,
  FileType,
} from '@/utils/supabase/types';
import { getFile } from '@/utils/actions';
import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '@/redux/store';
import Image from 'next/image';
import pdfIcon from '@/public/pdf.png';

export const Entries_component = ({ items }: { items: Entries_Type[] }) => {
  const user_state = useSelector((state: AppState) => state.user);

  const handleDownload = async (fileName: string) => {
    const url = await getFile({
      file_name: fileName,
      path: user_state.user?.email as string,
    });

    if (!url) return alert('Failed to get file URL');

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    link.setAttribute('target', '_blank');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="mt-10 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 4xl:grid-cols-5">
      {items.map((file, idx) => (
        <Card
          key={idx}
          className=" flex flex-col justify-center items-center relative group hover:shadow-lg transition-shadow min-w-[300px] max-w-[400px] overflow-hidden"
        >
          {/* <img
            src="@/public/pdf.png"
            alt="File Preview"
            className="w-full h-40 object-cover"
          /> */}

          <Image
            src={file_types_to_logos[file.file_type as FileType] || pdfIcon}
            alt="File Preview"
            className="w-40 h-40 object-fill"
          />

          <div className="bg-white text-center py-2 px-4 font-semibold text-sm">
            {file.file_name}
          </div>

          <div className="absolute inset-0 bg-white/95 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-between">
            <div>
              <h4 className="font-bold truncate">{file.file_name}</h4>
              <p className="text-xs text-gray-500">{file.created_at}</p>
            </div>
            <CardContent className="text-sm text-muted-foreground mt-2">
              <p>
                Type: <Badge>{file.file_type}</Badge>
              </p>
              <p>
                Size:{' '}
                {parseFloat(
                  (
                    parseFloat(file.file_size.toFixed(10)) /
                    (1024 * 1024)
                  ).toFixed(2)
                )}{' '}
                MB
              </p>
            </CardContent>
            <CardFooter className="mt-4 flex justify-center">
              <Button size="sm" onClick={() => handleDownload(file.file_name)}>
                Download
              </Button>
            </CardFooter>
          </div>
        </Card>
      ))}
    </div>
  );
};
