import BackButton from "../../component/back-button";
import Divider from "../../component/divider";

import "./index.scss";
import { EmailForm, PasswordForm } from "../../component/change";
import Page from "../../page/Page";
import PageBalance from "../../page/PageBalance";

import AuthBox from "../../component/authBox";
import HeaderDark from "../../component/header-dark";
import Button from "../../component/button";

const Settings = ({ logout }) => {
  return (
    <PageBalance>
      <AuthBox>
        <HeaderDark />
        <header className="balanceBox-title">
          <BackButton />

          <div className="auth__title--medium">Settings</div>
        </header>

        <div className="auth__box">
          <EmailForm />

          <Divider />

          <PasswordForm />

          <Divider />

          <Button red onClick={logout}>
            Logout
          </Button>
        </div>
      </AuthBox>
    </PageBalance>
  );
};

export default Settings;
