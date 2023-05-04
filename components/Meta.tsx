import Head from "next/head";

type Props = {
  title?: string;
  description?: string;
  image?: string;
  id: string;
  twitterCard?: string;
};

const Meta = ({
  title = "News App",
  description = "News Application that displays the news feed of various articles and each article has a section for comments.",
  image = "https://bit.ly/3sdPgzk",
  twitterCard = "summary",
  id,
}: Props) => {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.ico" />

      {/* Open Graph & Twitter */}
      <meta property="og:title" content={title} key={`${id}-ogtitle`} />
      <meta property="og:description" content={description} key={`${id}-ogdesc`} />
      <meta property="og:image" content={image} key={`${id}-ogimage`} />
      <meta property="twitter:card" content={twitterCard} key={`${id}-twitter`} />

      <title>{title}</title>
    </Head>
  );
};

export default Meta;
