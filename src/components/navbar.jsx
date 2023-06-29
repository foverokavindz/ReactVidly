const Navbar = (props) => {
  return (
    <>
      <nav className="navbar bg-light">
        <div className="container">
          <span className="navbar-brand mb-0 h1">
            Navbar{' '}
            <span className="badge rounded-pill badge-secondary bg-dark">
              {props.totalCounters}
            </span>
          </span>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
