import pdfIcon from '@/public/pdf.png';
import docxIcon from '@/public/docx.png';
import imageIcon from '@/public/imageIcon.png';
export interface Entries_Type {
  created_at: string;
  id: string;
  file_name: string;
  file_size: number;
  url: string;
  file_type: string;
}

export type FileStatus = 'idle' | 'uploading' | 'success' | 'error';

export interface FileWithStatus {
  file: File;
  id: string;
  progress: number;
  status: FileStatus;
  url?: string;
}
export type Authform = {
  email: string;
  user_name?: string;
  password: string;
};
export type getFileType = {
  file_name: string;
  path: string;
};

export interface getUserParams {
  user_name: string;
  email: string;

  phone: string;
  bio?: string;
}
export type FileWithPath = {
  file: FileWithStatus;
  path?: string;
};
export type FileType = keyof typeof file_types_to_logos;

export const file_types_to_logos = {
  pdf: pdfIcon,
  docx: docxIcon,
  png: imageIcon,
  jpg: imageIcon,
};
