
import Logo from "../../assets/logo.png";




interface LogoComponentProps {
  width: string;
  height: string;
}

function LogoComponent({ width, height }: LogoComponentProps) {
  const style = {
    width: width,
    height: height,
  };

  return (
    <img
      src={Logo}
      alt="Logo"
      style={style}
    />
  );
}

export default LogoComponent;
