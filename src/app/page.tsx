'use client';

import Preloader from '@/components/Preloader';
import HomeHero from '@/components/home/HomeHero';
import MenuShowcase from '@/components/home/MenuShowcase';
import {
  ClaimsMarquee,
  HowItWorks,
  ChoosePlate,
  Different,
  Statement,
  Signup,
} from '@/components/home/HomeSections';

export default function HomePage() {
  return (
    <>
      <Preloader />
      <HomeHero />
      <MenuShowcase />
      <ClaimsMarquee />
      <HowItWorks />
      <ChoosePlate />
      <Different />
      <Statement />
      <Signup />
    </>
  );
}
