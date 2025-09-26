interface BannerProps {
  title: string
}

const Banner = ({title} : BannerProps) => (
  <h1 className = "text-4xl">
    { title }
  </h1>
);

export default Banner;