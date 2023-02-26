const PageTitle = ({ children, title }) => {
  return (
    <div className='pageTitle'>
      <h1>{title}</h1>
      {children}
    </div>
  );
};

export default PageTitle;
