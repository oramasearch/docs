import { Link } from 'fumadocs-core/framework'

type ImageCTAProps = {
  image: string
  title: string
  description: string
  href: string
}

export function ImageCTA(props: ImageCTAProps) {
  return (
    <Link
      href={props.href}
      className="w-full border border-gray-300 dark:border-gray-800 rounded-lg not-prose hover:opacity-80"
    >
      <div
        className="relative w-full h-40 bg-grey-300 rounded-t-lg bg-cover bg-no-repeat bg-center"
        style={{ backgroundImage: `url(${props.image})` }}
      />
      <div className="p-4">
        <p className="text-md font-semibold not-prose">{props.title}</p>
        <p className="text-sm font-normal text-neutral-500 dark:text-neutral-400 not-prose">{props.description}</p>
      </div>
    </Link>
  )
}
