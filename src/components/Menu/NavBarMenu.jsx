import PropTypes from "prop-types";

const NavBarMenu = ({ title }) => {
  if (!title) {
    return <></>;
  }

  return (
    <header className="flex w-full flex-wrap py-3 text-sm sm:flex-nowrap sm:justify-start">
      <nav className="mx-auto w-full max-w-[85rem] sm:flex sm:items-center sm:justify-between">
        <a
          className="flex-none text-xl font-semibold text-black focus:opacity-80 focus:outline-none"
          aria-label="Brand"
        >
          {title}
        </a>
      </nav>
    </header>
  );
};

NavBarMenu.propTypes = {
  title: PropTypes.string,
};

export default NavBarMenu;
