const Footer = () => {
  return (
    <footer className="text-sm text-center text-grey mt-6 p-4">
      <span>
        Copyright &copy; {new Date().getFullYear()}
        <a
          href="https://www.viaxco.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 mx-1.5 hover:underline"
        >
          ViaxCo.
        </a>
        All Rights Reserved
      </span>
    </footer>
  );
};

export default Footer;
