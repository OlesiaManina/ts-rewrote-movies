import { Container, Header, Link } from "./Layout.styled";
import { Outlet } from "react-router-dom";
import { Suspense } from "react";

const Layout = () => {
return (
    <Container>
    <Header>
      <nav>
        <Link to="/" end>
        Home
        </Link>
        <Link to="/movies">Movies</Link>
      </nav>
    </Header>
    <Suspense fallback={<div>Loading...</div>}>
    <Outlet/>
    </Suspense>
    </Container>
)
}

export default Layout;