import { Link } from "react-router-dom";
import "./index.scss";
import Page from "../../page/Page";
import Header from "../../component/header";
import Button from "../../component/button";

function WelcomePage({ stateAuth, logout }) {
  return (
    <Page>
      {stateAuth.token ? (
        <>
          <div className="home-page__top">
            <Header />
            <h1 className="home-page__title">Hello!</h1>
            <div className="home-page__subtext">You are logged in.</div>
          </div>

          <div className="home-page-image" />

          <div className="home-page__bottom">
            <Button red onClick={logout}>
              Logout
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="home-page__top">
            <Header />
            <h1 className="home-page__title">Hello!</h1>
            <div className="home-page__subtext">Welcome to bank app</div>
            <div className="home-page-image" />
          </div>

          <div className="home-page__bottom">
            <div className="home-page__bottom--box">
              <Link to="/signup">
                <Button>Sign Up</Button>
              </Link>
              <Link to="/signin">
                <Button pink>Sign In</Button>
              </Link>
            </div>
          </div>
        </>
      )}
    </Page>
  );
}

export default WelcomePage;
