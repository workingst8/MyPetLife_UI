import styles from "./pages.module.scss"
import NaverLogin from "../components/NaverLogin/NaverLogin"; 

const Login: React.FC = () => {

  return (
    <div className={styles.pageContainer}>
        <NaverLogin />
    </div>
  );
};

export default Login;
