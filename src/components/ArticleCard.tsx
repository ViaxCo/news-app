import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone"; // dependent on utc plugin
import utc from "dayjs/plugin/utc";
import { IoMdTime as TimeIcon } from "react-icons/io";
import ImageWithFallback from "./ImageWithFallback";

export type Article = {
  id: string;
  title: string;
  description: string;
  url: string;
  author: string;
  image: string;
  published: string;
  base64?: string;
};

type Props = {
  article: Article;
  index: number;
};

dayjs.extend(relativeTime);
dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Africa/Lagos");

const ArticleCard = ({ article, index }: Props) => {
  const dateFromNow = dayjs(article.published, "YYYY-MM-DD HH:mm:ss ZZ").tz().fromNow();

  return (
    <article className="group relative flex flex-col h-[350px] w-full max-w-[340px] overflow-hidden mb-8 rounded-md shadow-md">
      {/* Image */}
      <div className="w-full h-[200px] overflow-hidden relative">
        <ImageWithFallback
          src={`https://res.cloudinary.com/viaxco/image/fetch/${encodeURIComponent(
            article.image
          )}`}
          alt={article.title}
          width={340}
          height={200}
          style={{ objectFit: "contain", objectPosition: "center top" }}
          priority={index === 0 || index === 1}
          placeholder="blur"
          blurDataURL={article.base64}
        />
      </div>

      <div className="flex p-3 flex-col flex-1">
        {/* Title */}
        <div className="flex flex-1 items-center">
          <p className="font-semibold">
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group-hover:text-blue-600 title"
            >
              {article.title}
            </a>
          </p>
        </div>

        {/* Time */}
        <div className="flex items-center text-sm text-grey mt-1">
          <TimeIcon className="mr-1" />
          <p className="mt-0.5">{dateFromNow}</p>
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;
