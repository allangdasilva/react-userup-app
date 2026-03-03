import GitHub from "./svgs/GitHub";

const Header = () => {
  return (
    <header className="flex justify-between items-center flex-wrap gap-1 py-8">
      <h1 className="font-bold text-4xl text-white">User Up</h1>
      <a href="#" target="_blank" rel="noopener noreferrer">
        <GitHub />
      </a>
    </header>
  );
};

export default Header;
