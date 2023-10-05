import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";

interface LogoComponentProps {
  width?: string;
  height?: string;
}

function LogoComponent({ width, height }: LogoComponentProps) {
  const navigate = useNavigate();

  function home() {
    navigate("/");
  }

  const style = {
    width: width,
    height: height,
  };

  return (
    <>
      <div style={{ cursor: "pointer" }}>
        <img src={Logo} alt="Logo" style={style} onClick={home} />
      </div>
    </>
  );
}

export default LogoComponent;
