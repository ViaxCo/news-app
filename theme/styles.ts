const styles = {
  global: {
    //   My resets
    "*": {
      margin: "0",
      padding: "0",
      WebkitTapHighlightColor: "transparent",
    },
    // styles for the `html` and `body`
    "html,body": {
      minWidth: "fit-content",
    },
    // Hide image while lazyloading to show skeleton
    ".lazyloading": {
      display: "none",
    },
    // Show image once lazyloaded
    ".lazyloaded": {
      display: "block",
    },
    // Hide skeleton
    ".lazyloaded ~ div": {
      display: "none",
    },
  },
};

export default styles;
