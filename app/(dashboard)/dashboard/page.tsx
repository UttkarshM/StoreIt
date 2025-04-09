import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

const mockFiles = [
  {
    name: 'Resume.pdf',
    type: 'PDF',
    size: '200KB',
    uploadedAt: '2 days ago',
  },
  {
    name: 'Design Mockup.png',
    type: 'Image',
    size: '1.2MB',
    uploadedAt: '5 days ago',
  },
  {
    name: 'ProjectPlan.docx',
    type: 'Document',
    size: '600KB',
    uploadedAt: '1 week ago',
  },
  {
    name: 'Resume.pdf',
    type: 'PDF',
    size: '200KB',
    uploadedAt: '2 days ago',
  },
  {
    name: 'Design Mockup.png',
    type: 'Image',
    size: '1.2MB',
    uploadedAt: '5 days ago',
  },
  {
    name: 'ProjectPlan.docx',
    type: 'Document',
    size: '600KB',
    uploadedAt: '1 week ago',
  },
  {
    name: 'Resume.pdf',
    type: 'PDF',
    size: '200KB',
    uploadedAt: '2 days ago',
  },
  {
    name: 'Design Mockup.png',
    type: 'Image',
    size: '1.2MB',
    uploadedAt: '5 days ago',
  },
  {
    name: 'ProjectPlan.docx',
    type: 'Document',
    size: '600KB',
    uploadedAt: '1 week ago',
  },
];

export default function DashboardPage() {
  return (
    <main className="p-6 w-[100%]  mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-semibold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here are your recent files.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/upload">
            <Button>Upload File</Button>
          </Link>
          <Avatar>
            <AvatarImage src="/user.jpg" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {mockFiles.map((file, idx) => (
          <Card key={idx} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="truncate">{file.name}</CardTitle>
              <CardDescription>{file.uploadedAt}</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <p>
                Type: <Badge>{file.type}</Badge>
              </p>
              <p>Size: {file.size}</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                View
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
}
