import BackButton from "../../component/back-button";
import BoxNumber from "../../component/boxNumber";
import "./index.scss";

import Page from "../../page/Page";
import PageBalance from "../../page/PageBalance";
import AuthBox from "../../component/authBox";
import HeaderDark from "../../component/header-dark";
import Button from "../../component/button";
import BoxField from "../../component/boxFiled";

const Send = ({
  valueEmail,
  valueAmount,
  errorMessages,
  onClick,
  onChange,
  disabled,
}) => {
  return (
    <PageBalance>
      <AuthBox>
        <HeaderDark />
        <header className="balanceBox-title">
          <BackButton />

          <div className="auth__title--medium">Send</div>
        </header>

        <div className="auth__field">
          <BoxField
            emailform
            name="email"
            type="email"
            placeholder="Test@test.com"
            label="Email"
            errorMessage="Enter the correct value of the e-mail address"
            value={valueEmail}
            onChange={onChange}
          />

          <BoxNumber
            name="amount"
            type="number"
            label="Sum"
            value={valueAmount}
            onChange={onChange}
            labelClassName="field__label"
            errorMessages={errorMessages}
          />

          <Button type="button" pink onClick={onClick} disabled={disabled}>
            Send
          </Button>

          <span className={"alert alert--disabled"} />
        </div>
      </AuthBox>
    </PageBalance>
  );
};

export default Send;
