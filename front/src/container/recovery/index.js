import Page from "../../page/Page";

import BackButtonComponent from "../../component/back-button";

import AuthBox from "../../component/authBox";
import HeaderDark from "../../component/header-dark";
import Button from "../../component/button";
import BoxField from "../../component/boxFiled";

import "./index.scss";

const RecoveryForm = ({ handleSubmit, VE, onChange, disabled }) => {
  return (
    <Page>
      <AuthBox>
        <HeaderDark />
        <BackButtonComponent />

        <form onSubmit={handleSubmit} className="auth__box">
          <h1 className="auth__title">Recover password</h1>

          <p className="auth__subtext">Choose a recovery method</p>

          <div className="auth__field">
            <BoxField
              emailform
              name="email"
              type="email"
              placeholder="test@test"
              label="Email"
              errorMessage="Enter the correct value of the e-mail address"
              value={VE}
              onChange={onChange}
              required={true}
            />
          </div>

          <Button pink type="submit" disabled={disabled}>
            Send code
          </Button>

          <span className={`alert alert--disabled`} />
        </form>
      </AuthBox>
    </Page>
  );
};

export default RecoveryForm;
