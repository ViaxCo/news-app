import { Button, ButtonProps } from "@chakra-ui/button";
import { HStack, Text } from "@chakra-ui/layout";
import { chakra } from "@chakra-ui/system";
import { Dispatch, ReactNode, SetStateAction } from "react";

type Props = {
  currentPage: number;
  totalPages: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
};

// Custom span component with chakra props
const Span = chakra("span");

const PaginationButton = ({
  children,
  ...props
}: { children: ReactNode } & ButtonProps) => (
  <Button size="sm" fontWeight="bold" fontSize="lg" colorScheme="blue" {...props}>
    {children}
  </Button>
);

const Pagination = ({ currentPage, totalPages, setCurrentPage }: Props) => {
  return (
    <HStack alignSelf="center" mt="6" spacing="4">
      <PaginationButton
        onClick={() => setCurrentPage(1)}
        disabled={currentPage === 1}
        px="2"
      >
        &lt;&lt;
      </PaginationButton>
      <PaginationButton
        onClick={() => setCurrentPage(prev => prev - 1)}
        disabled={currentPage === 1}
      >
        &lt;
      </PaginationButton>
      <Text>
        Page <Span fontWeight="semibold">{currentPage}</Span> of{" "}
        <Span fontWeight="semibold">{totalPages ? totalPages : 1}</Span>
      </Text>
      <PaginationButton
        onClick={() => setCurrentPage(prev => prev + 1)}
        disabled={currentPage === totalPages}
      >
        &gt;
      </PaginationButton>
      <PaginationButton
        onClick={() => setCurrentPage(totalPages)}
        disabled={currentPage === totalPages}
        px="2"
      >
        &gt;&gt;
      </PaginationButton>
    </HStack>
  );
};

export default Pagination;
