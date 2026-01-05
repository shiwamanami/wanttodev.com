"use client";

import { FadeInStagger } from "./FadeInStagger";

export function HeroSection() {
  return (
    <section className="relative h-full flex items-center justify-center">
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-0">
        <div className="text-center md:text-start">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl !leading-loose xs:tracking-widest font-bold">
            <FadeInStagger delay={0} staggerDelay={200}>
              <div>Welcome to <span className="text-primary-500">my portfolio.</span></div>
              <div>I like making fun,</div>
              <div>interactive things with code.</div>
            </FadeInStagger>
          </h1>

          <div className="text-base sm:text-lg lg:text-xl font-semibold !leading-loose !tracking-widest mt-10 md:mt-12">
            <FadeInStagger delay={1000} staggerDelay={200}>
              <div>
                Where my imagination comes to life.
              </div>
            </FadeInStagger>
          </div>
        </div>
      </div>
    </section>
  );
}
