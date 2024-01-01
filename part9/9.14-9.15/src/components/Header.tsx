interface HeaderProps {
  name: string;
}

const Header = (props: HeaderProps) => {
  return <h2>{props.name}</h2>;
};

export default Header;
