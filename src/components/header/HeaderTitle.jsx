import logo from "../../assets/logo.jpg";

export default function HeaderTitle() {
  return (
    <div id="title">
      <img src={logo} alt="" />
      <h1 className="header__title">reactfood</h1>
    </div>
  );
}
