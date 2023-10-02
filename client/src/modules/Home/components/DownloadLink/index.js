const DownloadLink = ({ link, className, children, name }) => {
  return (
    <a
      className={className}
      href={link}
      download={name}
      rel="noreferrer noopener"
    >
      {children}
    </a>
  );
};

export default DownloadLink;
