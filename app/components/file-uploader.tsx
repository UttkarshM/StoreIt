'use client';

import type React from 'react';

import { useState, useRef } from 'react';
import { Upload, X, FileIcon, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { formatBytes } from '@/lib/utils';
import { UploadFileToServer } from '@/utils/actions'; // Adjust the import based on your file structure
import { FileWithStatus, FileStatus } from '@/utils/supabase/types';

export function FileUploader({ path }: { path: string }) {
  const [files, setFiles] = useState<FileWithStatus[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  console.log('Pat', path);

  const handleFileChange = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    const newFiles = Array.from(selectedFiles).map((file) => ({
      file,
      id: crypto.randomUUID(),
      progress: 0,
      status: 'idle' as FileStatus,
    }));

    setFiles((prev) => [...prev, ...newFiles]);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileChange(e.dataTransfer.files);
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const uploadAllFiles = () => {
    files
      .filter((f) => f.status === 'idle')
      .forEach((file) => {
        UploadFileToServer({ file, path });
      });
  };

  return (
    <div className="space-y-6">
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center ${
          isDragging
            ? 'border-primary bg-primary/5'
            : 'border-muted-foreground/25'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => handleFileChange(e.target.files)}
          className="hidden"
          multiple
        />
        <div className="flex flex-col items-center justify-center gap-2">
          <Upload className="h-10 w-10 text-muted-foreground" />
          <h3 className="text-lg font-medium">
            Drag & drop files here or click to browse
          </h3>
          <p className="text-sm text-muted-foreground">
            Support for images, documents, and other file types
          </p>
        </div>
      </div>

      {files.length > 0 && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Files ({files.length})</h3>
            <Button
              onClick={uploadAllFiles}
              disabled={!files.some((f) => f.status === 'idle')}
            >
              Upload All
            </Button>
          </div>

          <div className="space-y-3">
            {files.map((fileWithStatus) => (
              <Card key={fileWithStatus.id}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-muted rounded-md p-2">
                      <FileIcon className="h-6 w-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <div className="truncate">
                          <p className="font-medium truncate">
                            {fileWithStatus.file.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {formatBytes(fileWithStatus.file.size)}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFile(fileWithStatus.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="mt-2">
                        {fileWithStatus.status === 'idle' && (
                          <Button
                            size="sm"
                            onClick={() => {
                              console.log('Path:', path);
                              UploadFileToServer({
                                file: fileWithStatus,
                                path,
                              });
                            }}
                          >
                            Upload
                          </Button>
                        )}
                        {fileWithStatus.status === 'uploading' && (
                          <div className="space-y-1">
                            <Progress value={fileWithStatus.progress} />
                            <p className="text-xs text-muted-foreground">
                              Uploading...
                            </p>
                          </div>
                        )}
                        {fileWithStatus.status === 'success' && (
                          <div className="flex items-center gap-2 text-green-500">
                            <CheckCircle className="h-4 w-4" />
                            <span className="text-sm">
                              Uploaded successfully
                            </span>
                            {fileWithStatus.url && (
                              <a
                                href={fileWithStatus.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-primary hover:underline ml-auto"
                              >
                                View
                              </a>
                            )}
                          </div>
                        )}
                        {fileWithStatus.status === 'error' && (
                          <div className="flex items-center gap-2 text-red-500">
                            <AlertCircle className="h-4 w-4" />
                            <span className="text-sm">Upload failed</span>
                            <Button
                              size="sm"
                              variant="outline"
                              className="ml-auto"
                              onClick={() => {
                                console.log('Path:', path);
                                UploadFileToServer({
                                  file: fileWithStatus,
                                  path,
                                });
                              }}
                            >
                              Retry
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
