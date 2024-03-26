import BackButton from "../../component/back-button";
import "./index.scss";
import Page from "../../page/Page";
import PageBalance from "../../page/PageBalance";
import AuthBox from "../../component/authBox";
import HeaderDark from "../../component/header-dark";
import BoxInfo from "../../component/boxInfo";

const Notifications = ({ notifications }) => {
  return (
    <PageBalance>
      <AuthBox>
        <HeaderDark />
        <header className="balanceBox-title">
          <BackButton />
          <div className="auth__title--medium">Notifications</div>
        </header>

        <main className="page__section">
          {notifications && notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <BoxInfo
                notf
                key={index}
                text={notification.text}
                time={notification.date}
                type={notification.type}
              />
            ))
          ) : (
            <p>No notifications available</p>
          )}
        </main>
      </AuthBox>
    </PageBalance>
  );
};

export default Notifications;
