interface HeaderProps {
  title: string;
}

export const Header = (props: HeaderProps) => (
  <nav className="header navbar navbar-dark bg-dark">
    <div className="container">
      <div className="row m-auto">
        <div className="h3 ml-3 my-auto text-light">{props.title}</div>
      </div>
    </div>
  </nav>
);
