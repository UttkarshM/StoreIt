import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 py-12 text-center bg-gradient-to-br from-slate-50 to-white">
      <Card className="max-w-2xl w-full shadow-xl p-8 border-0">
        <CardContent className="space-y-6">
          <h1 className="text-4xl font-bold tracking-tight">
            Welcome to <span className="text-primary">StoreIt</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            A modern, secure, and fast cloud storage platform — your personal
            Google Drive alternative.
          </p>

          <Separator />

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/dashboard">
              <Button size="lg">Get Started</Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
