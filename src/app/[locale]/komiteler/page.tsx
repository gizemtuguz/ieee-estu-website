'use client';

import { useTranslations } from 'next-intl';
import { SiteLayout } from '@/components/layout/SiteLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Plane,
  Radio,
  Cpu,
  Zap,
  Users,
  Calendar,
  Megaphone,
} from 'lucide-react';
import { ImageWithFallback } from '@/components/ImageWithFallback';

export default function CommitteesPage() {
  const t = useTranslations('committees');

  const committees = [
    {
      key: 'aess',
      icon: Plane,
      color: '#6B7280',
      gradient: 'from-gray-500 to-gray-600',
      image: '/images/06f93da914f3175ed19bd187ffd4e57ebf4b0fcf.png',
    },
    {
      key: 'comsoc',
      icon: Radio,
      color: '#3B82F6',
      gradient: 'from-blue-500 to-blue-600',
      image:
        '/images/comsoc.png',
    },
    {
      key: 'cs',
      icon: Cpu,
      color: '#F97316',
      gradient: 'from-orange-500 to-orange-600',
      image:
        '/images/gff.png',
    },
    {
      key: 'pes',
      icon: Zap,
      color: '#22C55E',
      gradient: 'from-green-500 to-green-600',
      image:
        '/images/pes.png',
    },
    {
      key: 'wie',
      icon: Users,
      color: '#A855F7',
      gradient: 'from-purple-500 to-purple-600',
      image:
        '/images/wie.jpg',
    },
    {
      key: 'kok',
      icon: Calendar,
      color: '#EAB308',
      gradient: 'from-yellow-500 to-yellow-600',
      image:
        '/images/kok.jpeg',
    },
    {
      key: 'pr',
      icon: Megaphone,
      color: '#6B8B47',
      gradient: 'from-green-500 to-green-600',
      image:
        '/images/pr.jpg',
    },
  ];

  return (
    <SiteLayout>
      <section className="py-20 bg-gray-100 dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              {t('title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {t('subtitle')}
            </p>
          </div>

          {/* Committees Grid - 3 per row, event card style */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {committees.map((committee) => {
              const Icon = committee.icon;
              const committeeData = t.raw(committee.key) as { name: string; description: string; focus: string[] };

              return (
                <Card
                  key={committee.key}
                  className="group overflow-hidden hover:shadow-xl dark:hover:shadow-[#00629B]/20 dark:hover:ring-1 dark:hover:ring-[#00629B]/50 transition-all duration-300 rounded-2xl border-0 bg-white dark:bg-slate-950 hover:-translate-y-1 p-0 gap-0"
                >
                  {/* Image Section */}
                  <div className="relative h-48 overflow-hidden">
                    <ImageWithFallback
                      src={committee.image}
                      alt={committeeData.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div
                      className={`absolute inset-0 bg-linear-to-br ${committee.gradient} opacity-20`}
                    />

                    {/* Badge with committee name */}
                    <div className="absolute top-4 left-4">
                      <Badge
                        className="text-white px-3 py-1.5 rounded-full shadow-lg"
                        style={{
                          backgroundColor: committee.color,
                        }}
                      >
                        <Icon className="h-3.5 w-3.5 mr-1.5 inline" />
                        {committeeData.name}
                      </Badge>
                    </div>
                  </div>

                  {/* Content Section */}
                  <CardContent className="p-6">
                    {/* Committee Name */}
                    <h3 className="font-semibold text-primary mb-2">
                      {committeeData.name}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      {committeeData.description}
                    </p>

                    {/* Focus Areas */}
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-primary">
                        {t('focusAreas')}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {committeeData.focus.map(
                          (area: string, index: number) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors rounded-md"
                            >
                              {area}
                            </Badge>
                          )
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
