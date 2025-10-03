interface BannerProps {
  title: string
}

const Banner = ({title} : BannerProps) => (
  <h1 className = "text-4xl px-4 py-2">
    { title }
  </h1>
);

export default Banner;