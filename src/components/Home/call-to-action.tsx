import { OctreeLogo } from '@/components/icons/octree'
import { PrimaryButton } from './primary-button'

export function CallToAction() {
  return (
    <div className="py-[34px] md:py-[68px] max-w-[var(--grid-max-width)] mx-auto flex flex-col gap-[37px] md:gap-[74px] relative px-6 md:px-12">
      <div
        className="absolute left-1/2 transform -translate-x-1/2 -translate-y-2 md:-translate-y-6 pointer-events-none block opacity-20 z-[1] blur-[5px]"
        style={{
          width: '100vw',
          maxWidth: 'var(--grid-max-width)',
          height: '500px',
          background:
            'linear-gradient(179deg, #c7dbff 0%, rgba(199, 219, 255, 0.35) 60%, rgba(255, 255, 255, 0) 75%)',
          WebkitMask: 'linear-gradient(180deg, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0) 62%)',
          mask: 'linear-gradient(180deg, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0) 62%)',
          borderRadius: '50% 50% 0 0',
        }}
      />
      <div className="flex flex-col items-center gap-4 md:gap-6 relative z-10">
        <div
          className="bg-primary rounded-lg md:rounded-xl p-1 w-fit"
          style={{
            boxShadow: 'inset 0px 1px 10px 0px rgba(255, 255, 255, 0.38)',
          }}
        >
          <OctreeLogo className="size-10 md:size-12" />
        </div>
        <p className="text-3xl md:text-4xl lg:text-5xl font-medium max-w-[400px] md:max-w-[500px] text-center tracking-tighter leading-[1.125]">
          Start your writing journey from today
        </p>
        <PrimaryButton location="footer_cta">Get Started</PrimaryButton>
      </div>
    </div>
  )
}
