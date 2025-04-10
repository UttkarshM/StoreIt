'use client';

import type React from 'react';

import { useState, useRef } from 'react';
import { Upload, X, FileIcon, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { formatBytes } from '@/lib/utils';

type FileStatus = 'idle' | 'uploading' | 'success' | 'error';

interface FileWithStatus {
  file: File;
  id: string;
  progress: number;
  status: FileStatus;
  url?: string;
}

export function FileUploader() {
  const [files, setFiles] = useState<FileWithStatus[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const uploadFile = async (fileWithStatus: FileWithStatus) => {
    try {
      setFiles((prev) =>
        prev.map((f) =>
          f.id === fileWithStatus.id ? { ...f, status: 'uploading' } : f
        )
      );

      const formData = new FormData();
      formData.append('file', fileWithStatus.file);

      const response = await fetch(
        `/api/upload?filename=${encodeURIComponent(fileWithStatus.file.name)}`,
        {
          method: 'POST',
          body: fileWithStatus.file,
        }
      );

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const blob = (await response.json()) as unknown as {
        url: string;
      };

      setFiles((prev) =>
        prev.map((f) =>
          f.id === fileWithStatus.id
            ? { ...f, status: 'success', progress: 100, url: blob.url }
            : f
        )
      );
    } catch (error) {
      console.error('Error uploading file:', error);
      setFiles((prev) =>
        prev.map((f) =>
          f.id === fileWithStatus.id
            ? { ...f, status: 'error', progress: 0 }
            : f
        )
      );
    }
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const uploadAllFiles = () => {
    files
      .filter((f) => f.status === 'idle')
      .forEach((file) => {
        uploadFile(file);
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
                            onClick={() => uploadFile(fileWithStatus)}
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
                              onClick={() => uploadFile(fileWithStatus)}
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
