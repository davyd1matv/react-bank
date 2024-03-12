import "./index.css";

import Button from "../../component/button";
import Header from "../../component/header";
import Page from "../../component/page";

import { Link } from "react-router-dom";

import bank from "./bank.png";

/////////////////////////////// link_one, link_two
export default function Welcome({}) {
  return (
    <Page>
      <div className="home-top">
        <Header />

        <h1 className="home-title">Hello</h1>

        <p className="home-text">Welcome to bank app</p>

        {/* <img alt="bank" src={bank} className="home-bank" /> */}
        {/* <div className="home-bank" /> */}
      </div>

      <div className="home-bottom">
        <div className="home-button">
          <Link to="/signup">
            <Button>Sign Up</Button>
          </Link>
          <Link to="/signin">
            <Button pink>Sign In</Button>
          </Link>
        </div>
      </div>
    </Page>
  );
}
