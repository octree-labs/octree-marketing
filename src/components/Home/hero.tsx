'use client'

import React, { useState } from 'react'
import { TextEffect } from '@/components/ui/text-effect'
import { AnimatedGroup } from '@/components/ui/animated-group'
import { PrimaryButton } from '@/components/Home/primary-button'
import { CreditCard, Play } from 'lucide-react'
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from '@/components/ui/dialog'
import {
  VideoPlayer,
  VideoPlayerContent,
  VideoPlayerControlBar,
  VideoPlayerMuteButton,
  VideoPlayerPlayButton,
  VideoPlayerTimeDisplay,
  VideoPlayerTimeRange,
} from '@/components/ui/shadcn-io/video-player'

const transitionVariants = {
  item: {
    hidden: {
      opacity: 0,
      filter: 'blur(12px)',
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: {
        type: 'spring' as const,
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
}

export function HeroSection() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative overflow-hidden">
      <section>
        <div className="relative pt-16 pb-8 md:pt-20 z-10">
          <div className="relative z-10 text-center px-4">
            <div className="mb-6">
              <div className="max-w-5xl mx-auto">
                <h1 className="text-[32px] md:text-[48px] lg:text-[56px] text-black leading-[1.05] tracking-tight font-heading">
                  <TextEffect preset="fade-in-blur" speedSegment={0.3} as="span">
                    Write research documents with AI
                  </TextEffect>
                  <br />
                  <TextEffect
                    preset="fade-in-blur"
                    speedSegment={0.3}
                    delay={0.5}
                    as="span"
                    className="text-primary"
                  >
                    The modern Overleaf alternative
                  </TextEffect>
                </h1>
              </div>
            </div>

            <div className="mb-8">
              <TextEffect
                per="line"
                preset="fade-in-blur"
                speedSegment={0.3}
                delay={0.5}
                as="p"
                className="max-w-3xl mx-auto text-lg md:text-xl font-medium text-[#636363] tracking-[-0.03]"
              >
                Go from idea to publication-ready LaTeX documents in minutes. Generate TikZ
                diagrams, structure your sections, and refine with AI — no syntax, no setup.
              </TextEffect>
            </div>

            <AnimatedGroup
              variants={{
                container: {
                  visible: {
                    transition: {
                      staggerChildren: 0.05,
                      delayChildren: 0.75,
                    },
                  },
                },
                ...transitionVariants,
              }}
              className="mb-16 flex flex-col items-center gap-3"
            >
              <PrimaryButton
                location="hero"
                className="text-base md:text-lg px-4 py-2 md:px-5 md:py-2.5 h-auto"
              >
                Try now - it&apos;s free!
              </PrimaryButton>
            </AnimatedGroup>
          </div>

          <AnimatedGroup
            variants={{
              container: {
                visible: {
                  transition: {
                    staggerChildren: 0.05,
                    delayChildren: 0.75,
                  },
                },
              },
              ...transitionVariants,
            }}
          >
            <div className="max-w-6xl mx-auto px-4">
              <div className="relative">
                {/* Soft glow sitting behind the CTA button, fading down behind the video top */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 -top-16 z-0 h-48 blur-[55px]"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(199, 219, 255, 0.7) 0%, rgba(228, 241, 254, 0.12) 55%, rgba(255, 255, 255, 0) 100%)',
                  }}
                />
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  <button className="relative w-full group cursor-pointer focus:outline-none border-0 p-0 bg-transparent">
                    {/* Video Thumbnail */}
                    <div className="relative overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-800">
                      <video
                        src="/video/Demo.mp4"
                        poster="/images/overlay.png"
                        className="w-full h-auto block border-0 -mt-[2px] -mb-[2px]"
                        muted
                        playsInline
                        preload="auto"
                        style={{
                          objectFit: 'cover',
                          objectPosition: '50% 50%',
                        }}
                      />
                      {/* Overlay - only on hover */}
                      <div className="absolute inset-0 bg-transparent group-hover:bg-black/10 transition-colors duration-300" />

                      {/* Play Button */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative">
                          {/* Outer ring animation */}
                          <div
                            className="absolute inset-0 rounded-full bg-primary/30 animate-ping"
                            style={{ animationDuration: '2s' }}
                          />
                          {/* Play button */}
                          <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 group-hover:shadow-primary/40 group-hover:shadow-2xl">
                            <Play className="w-8 h-8 md:w-10 md:h-10 text-white fill-white ml-1" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                </DialogTrigger>

                {/* Video Modal */}
                <DialogContent className="max-w-5xl w-[95vw]">
                  <DialogTitle className="sr-only">Product Demo Video</DialogTitle>
                  <VideoPlayer className="w-full overflow-hidden rounded-xl shadow-2xl">
                    <VideoPlayerContent
                      src="/video/Demo.mp4"
                      playsInline
                      preload="auto"
                      autoPlay
                      slot="media"
                      className="w-full h-auto"
                      style={{
                        objectFit: 'cover',
                        objectPosition: '50% 50%',
                      }}
                    />
                    <VideoPlayerControlBar>
                      <VideoPlayerPlayButton />
                      <VideoPlayerTimeRange />
                      <VideoPlayerTimeDisplay showDuration />
                      <VideoPlayerMuteButton />
                    </VideoPlayerControlBar>
                  </VideoPlayer>
                </DialogContent>
                </Dialog>
              </div>
            </div>
          </AnimatedGroup>
        </div>
      </section>
    </div>
  )
}
