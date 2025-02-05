import { ThemeToggle } from '@/components/ThemeToggle';
import Link from 'next/link';

interface HeaderProps {
  links: any[];
}

export function Header({ links }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="text-xl font-bold hover:text-primary transition-colors">
          Saransh Grover
        </Link>
        <nav className="flex items-center space-x-6 ml-auto">
          <ThemeToggle />
          {links.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              target={link.newTab ? '_blank' : undefined}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
