import './globals.css';
import type {Metadata} from 'next';

export const metadata: Metadata = {
  title: 'دليل أدوات الذكاء الاصطناعي',
  description: 'منصة عربية لاكتشاف أدوات الذكاء الاصطناعي حسب المجال والهدف.',
  openGraph: {
    title: 'دليل أدوات الذكاء الاصطناعي',
    description: 'اكتشف أدوات وبرومبتات وWorkflows جاهزة.',
    type: 'website'
  }
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return <html><body>{children}</body></html>;
}
