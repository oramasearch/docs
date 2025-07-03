type HeroProps = {
  title: string
  description?: string
}

export function Hero(props: HeroProps) {
  return (
    <div className='mx-auto max-w-fd-container flex flex-col justify-center py-10 xl:py-20'>
      <div className='mx-auto max-w-md xl:max-w-3xl xl:py-20 px-4 text-center'>
        <h1 className='text-3xl xl:text-8xl font-extrabold text-base-foreground'>
          {props.title}
        </h1>
        {props.description && (
          <p className='text-sm xl:text-lg leading-none font-normal text-muted-foreground my-3 xl:my-6'>
            {props.description}
          </p>
        )}
      </div>
    </div>
  )
}
