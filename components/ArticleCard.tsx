import { Box, Flex, LinkBox, LinkOverlay, Text } from "@chakra-ui/layout";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { IoMdTime as TimeIcon } from "react-icons/io";
import ImageWithFallback from "./ImageWithFallback";

type ImageProps = {
  base64: string;
  src: string;
};

export type ArticleFromApi = {
  id: string;
  title: string;
  description: string;
  url: string;
  author: string;
  image: string;
  published: string;
};

export type Article = Omit<ArticleFromApi, "image"> & {
  image: ImageProps;
};

type Props = {
  article: Article;
  index: number;
};

// Custom Box component with motion props
const MotionBox = motion(Box);

dayjs.extend(relativeTime);
dayjs.extend(customParseFormat);

const ArticleCard = ({ article, index }: Props) => {
  // Render static date on the server
  const [dateFromNow, setDateFromNow] = useState(
    dayjs(article.published, "YYYY-MM-DD HH:mm:ss ZZ").format("DD/MM/YYYY - HH:mm")
  );

  // When on client, update the relative time to the correct time based on the client's time
  useEffect(() => {
    setDateFromNow(dayjs(article.published, "YYYY-MM-DD HH:mm:ss ZZ").fromNow());
  }, []);

  return (
    <LinkBox
      as="article"
      display="flex"
      flexDirection="column"
      h="350px"
      w="100%"
      maxW="340px"
      overflow="hidden"
      mb="8"
      rounded="md"
      shadow="md"
      _hover={{
        ".title": {
          color: "blue.600",
        },
      }}
    >
      {/* Image */}
      <MotionBox
        w="100%"
        h="200px"
        overflow={"hidden"}
        position="relative"
        // animation
        // use initial={false} for server side rendering
        initial={false}
        animate={{ opacity: 1, transition: { duration: 0.5 } }}
      >
        <ImageWithFallback
          src={`https://res.cloudinary.com/viaxco/image/fetch/${encodeURIComponent(
            article.image.src
          )}`}
          alt={article.title}
          width={340}
          height={200}
          style={{ objectFit: "contain", objectPosition: "center top" }}
          priority={index === 0}
          placeholder="blur"
          blurDataURL={article.image.base64}
        />
      </MotionBox>

      <Flex p="3" direction="column" flex="1">
        {/* Title */}
        <Flex flex="1" align="center">
          <Text fontWeight="semibold">
            <LinkOverlay
              className="title"
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {article.title}
            </LinkOverlay>
          </Text>
        </Flex>

        {/* Time */}
        <Flex align="center" fontSize="sm" color="#666" mt="1">
          <Box as={TimeIcon} mr="1" />
          <Text mt="0.5">{dateFromNow}</Text>
        </Flex>
      </Flex>
    </LinkBox>
  );
};

export default ArticleCard;
