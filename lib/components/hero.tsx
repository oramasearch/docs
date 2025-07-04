type HeroProps = {
  title: string
  description?: string
}

export function Hero(props: HeroProps) {
  return (
    <div className='mx-auto max-w-fd-container flex flex-col justify-center my-10 xl:my-20'>
      <div className='mx-auto max-w-5xl w-90/100 md:w-80/100 lg:w-90/100 pt-10 xl:pt-20 text-center'>
        <h1 className='text-3xl md:text-6xl lg:text-7xl font-extrabold text-foreground'>
          {props.title}
        </h1>
        {props.description && (
          <p className='text-sm md:text-lg leading-normale font-normal text-muted-foreground mt-3 xl:mt-6'>
            {props.description}
          </p>
        )}
      </div>
    </div>
  )
}
