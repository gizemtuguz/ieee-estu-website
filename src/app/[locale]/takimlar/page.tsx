'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { SiteLayout } from '@/components/layout/SiteLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, ExternalLink, Users } from 'lucide-react';

export default function SubTeamsPage() {
  const t = useTranslations('subteams');

  const teams = [
    {
      key: 'rovstech',
      gradient: 'from-blue-600 to-blue-700',
      image:
        'https://images.unsplash.com/photo-1562758778-e5638b5b6607?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2JvdGljcyUyMGNvbXBldGl0aW9uJTIwc3R1ZGVudHN8ZW58MXx8fHwxNzU3MjQ2MzkzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      key: 'earendil',
      gradient: 'from-orange-600 to-orange-700',
      image:
        'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb3ZlciUyMG1hcnMlMjByb2JvdGljc3xlbnwxfHx8fDE3NjExNzA1MTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  return (
    <SiteLayout>
      <section className="py-20 bg-gray-100 dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              {t('title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {t('subtitle')}
            </p>
          </div>

          {/* Teams */}
          <div className="space-y-16">
            {teams.map((team, index) => {
              const teamData = t.raw(team.key) as { name: string; description: string; tagline?: string; features: string[]; achievements: string[] };
              const features = teamData.features as string[];
              const achievements = teamData.achievements as string[];

              return (
                <Card
                  key={team.key}
                  className="overflow-hidden rounded-2xl border-0 bg-white dark:bg-slate-950"
                >
                  <div
                    className={`grid grid-cols-1 lg:grid-cols-2 gap-0 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
                  >
                    {/* Image */}
                    <div
                      className={`relative h-80 lg:h-auto ${index % 2 === 1 ? 'lg:order-2' : ''}`}
                    >
                      <Image
                        src={team.image}
                        alt={teamData.name}
                        fill
                        className="object-cover"
                      />
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${team.gradient} opacity-20`}
                      />
                    </div>

                    {/* Content */}
                    <div
                      className={`p-8 lg:p-12 ${index % 2 === 1 ? 'lg:order-1' : ''}`}
                    >
                      <Badge
                        className="mb-4 px-3 py-1 rounded-full text-white"
                        style={{
                          background: `linear-gradient(to right, ${team.gradient})`,
                        }}
                      >
                        {teamData.tagline}
                      </Badge>

                      <h3 className="text-3xl font-bold text-primary mb-4">
                        {teamData.name}
                      </h3>

                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {teamData.description}
                      </p>

                      {/* Features */}
                      <div className="space-y-3 mb-6">
                        {features.map((feature: string, idx: number) => (
                          <div key={idx} className="flex items-start space-x-3">
                            <CheckCircle
                              className="h-5 w-5 flex-shrink-0 mt-0.5"
                              style={{ color: '#00629B' }}
                            />
                            <p className="text-muted-foreground">{feature}</p>
                          </div>
                        ))}
                      </div>

                      {/* Achievements */}
                      <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-6 mb-6">
                        <h4 className="font-semibold text-primary mb-3">
                          {t('achievementsTitle')}
                        </h4>
                        <ul className="space-y-2">
                          {achievements.map((achievement: string, idx: number) => (
                            <li
                              key={idx}
                              className="text-sm text-muted-foreground flex items-start space-x-2"
                            >
                              <span
                                className="inline-block w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                                style={{ backgroundColor: '#00629B' }}
                              />
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Buttons */}
                      <div className="flex flex-wrap gap-3">
                        <Button
                          className="text-white rounded-xl"
                          style={{ backgroundColor: '#00629B' }}
                        >
                          {t('learnMore')}
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          className="rounded-xl border-2"
                          style={{ borderColor: '#00629B', color: '#00629B' }}
                        >
                          <Users className="mr-2 h-4 w-4" />
                          {t('joinTeam')}
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* CTA Card */}
          <Card
            className="mt-16 rounded-2xl border-0 overflow-hidden"
            style={{
              background:
                'linear-gradient(135deg, #00629B 0%, #004f7c 100%)',
            }}
          >
            <CardContent className="p-12 text-center relative">
              {/* Decorative circles */}
              <div
                className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10"
                style={{ background: 'white' }}
              />
              <div
                className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-10"
                style={{ background: 'white' }}
              />

              <h3 className="text-3xl font-bold text-white mb-4 relative z-10">
                {t('cta.title')}
              </h3>
              <p className="text-blue-100 mb-8 max-w-2xl mx-auto relative z-10">
                {t('cta.description')}
              </p>
              <Button
                size="lg"
                className="bg-white hover:bg-gray-100 text-[#00629B] px-8 py-3 rounded-xl font-medium shadow-lg relative z-10"
              >
                {t('cta.button')}
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </SiteLayout>
  );
}
