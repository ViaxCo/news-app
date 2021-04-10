import { Flex } from "@chakra-ui/layout";
import { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";

type Props = {
  children: ReactNode;
  overflow: string;
};

const Container = ({ children, overflow }: Props) => {
  return (
    <Flex direction="column" minH="100vh" justify="space-between" overflow={overflow}>
      <Header />
      <Flex direction="column" p={["2", "4"]} mt="20">
        {children}
      </Flex>
      <Footer />
    </Flex>
  );
};

export default Container;