type HeroProps = {
  title: string
  description?: string
}

export function Hero(props: HeroProps) {
  return (
    <section>
      <div className='mx-auto max-w-fd-container flex flex-col justify-center'>
        <div className='mx-auto max-w-[960px] w-90/100 md:w-80/100 lg:w-90/100 pb-10 pt-12 md:pt-20 lg:pt-30 lg:px-24 text-center'>
          <h1 className='text-3xl md:text-6xl lg:text-8xl font-extrabold text-foreground'>
            {props.title}
          </h1>
          {props.description && (
            <p className='text-sm md:text-lg leading-normale font-normal text-muted-foreground mt-3 lg:mt-6'>
              {props.description}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
