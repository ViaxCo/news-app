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
    // Hide broken image icon
    "img.lazyload:not([src])": {
      visibility: "hidden",
    },
    // Hide image while lazyloading to show skeleton
    ".lazyloading": {
      opacity: 0,
    },
    // Show image once lazyloaded
    ".lazyloaded": {
      opacity: 1,
      transition: "opacity .5s",
    },
    // Hide skeleton
    ".lazyloaded ~ div": {
      display: "none",
    },
  },
};

export default styles;
