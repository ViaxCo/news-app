import { Avatar } from "@chakra-ui/avatar";
import { Button } from "@chakra-ui/button";
import { Flex } from "@chakra-ui/layout";
import { chakra } from "@chakra-ui/system";
import { Textarea } from "@chakra-ui/textarea";
import { observer } from "mobx-react-lite";
import { FormEvent, useState } from "react";
import { useStore } from "../mobx/StoreProvider";

type Props = {
  slug: string | undefined;
};

// Custom Form component with chakra props
const Form = chakra("form");

const AddComment = observer(({ slug }: Props) => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  const news = useStore();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    if (!slug) return;
    setLoading(true);
    e.preventDefault();
    try {
      await news.addComment(value, slug);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
    setValue("");
  };
  return (
    <Form display="flex" flexDirection="column" onSubmit={handleSubmit} mb="6">
      <Flex align="center">
        <Avatar alignSelf="flex-start" display={["none", "inline-flex"]} />
        <Textarea
          ml={["0", "2"]}
          mb="2"
          bg="#eee"
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="Join the discussion..."
          _placeholder={{ color: "#777" }}
          maxLength={140}
          resize="none"
          required
        />
      </Flex>
      <Button alignSelf="flex-end" type="submit" colorScheme="blue" isLoading={loading}>
        Submit
      </Button>
    </Form>
  );
});

export default AddComment;
