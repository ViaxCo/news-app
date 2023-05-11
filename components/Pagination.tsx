import { Button, ButtonProps } from "@chakra-ui/button";
import { HStack, Text } from "@chakra-ui/layout";
import { Link } from "@chakra-ui/react";
import { chakra } from "@chakra-ui/system";
import NextLink from "next/link";
import { ReactNode } from "react";

type Props = {
  currentPage: number;
  totalPages: number;
};

// Custom span component with chakra props
const Span = chakra("span");

type PaginationButtonProps = { children: ReactNode; page: number } & ButtonProps;

const PaginationButton = ({ children, page, ...props }: PaginationButtonProps) => (
  <Link as={NextLink} href={`/page/${page}`} _hover={{ textDecoration: "none" }}>
    <Button size="sm" fontWeight="bold" fontSize="lg" colorScheme="blue" {...props}>
      {children}
    </Button>
  </Link>
);

const Pagination = ({ currentPage, totalPages }: Props) => {
  return (
    <HStack alignSelf="center" mt="6" spacing="4">
      {/* Beginning */}
      <PaginationButton page={1} isDisabled={currentPage === 1} px="2">
        &lt;&lt;
      </PaginationButton>
      {/* Previous */}
      <PaginationButton page={currentPage - 1} isDisabled={currentPage === 1}>
        &lt;
      </PaginationButton>
      <Text>
        Page <Span fontWeight="semibold">{currentPage}</Span> of{" "}
        <Span fontWeight="semibold">{totalPages ? totalPages : 1}</Span>
      </Text>
      {/* Next */}
      <PaginationButton page={currentPage + 1} isDisabled={currentPage === totalPages}>
        &gt;
      </PaginationButton>
      {/* End */}
      <PaginationButton page={totalPages} isDisabled={currentPage === totalPages} px="2">
        &gt;&gt;
      </PaginationButton>
    </HStack>
  );
};

export default Pagination;
