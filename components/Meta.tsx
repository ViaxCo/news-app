import Head from "next/head";

type Props = {
  title?: string;
  description?: string;
  image?: string;
  key: string;
  twitterCard?: string;
};

const Meta = ({
  title = "News App",
  description = "News Application that displays the news feed of various articles and each article has a section for comments.",
  image = "https://bit.ly/3sdPgzk",
  twitterCard = "summary",
  key,
}: Props) => {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content={description} />

      {/* Open Graph & Twitter */}
      <meta property="og:title" content={title} key={`${key}-ogtitle`} />
      <meta property="og:description" content={description} key={`${key}-ogdesc`} />
      <meta property="og:image" content={image} key={`${key}-ogimage`} />
      <meta property="twitter:card" content={twitterCard} key={`${key}-twitter`} />

      <title>{title}</title>
    </Head>
  );
};

export default Meta;
