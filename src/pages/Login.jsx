//import hook react
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";

import Api from "../api/Index";

function Login() {
  //define state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  //define state validation
  const [validation, setValidation] = useState([]);

  //define state loading
  const [loading, setLoading] = useState(false);

  //define history
  const history = useNavigate();

  //hook useEffect
  useEffect(() => {
    //check token
    if (localStorage.getItem("token")) {
      //redirect page dashboard
      history("/dashboard");
    }
  }, [history]);

  //function "loginHanlder"
  const loginHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      //initialize formData
      const formData = new FormData();

      //append data to formData
      formData.append("email", email);
      formData.append("password", password);

      //send data to server
      const response = await Api.post("/api/auth/login", formData);
      localStorage.setItem("token", response.data.token);
      history("/dashboard");
    } catch (error) {
      setValidation(error.response.data);
    }

    setLoading(false);
  };

  return (
    <>
      <section className="vh-100">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-6 text-black">
              <div className="px-5 ms-xl-4 mt-5 text-start">
                <div className="mb-5">
                  <i
                    className="fas fa-crow fa-2x me-3 pt-5 mt-xl-4"
                    style={{ color: "#709085" }}
                  ></i>
                  <img
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://semantic-ui.com/images/wireframe/white-image.png";
                    }}
                    style={{ width: "141px" }}
                    src="/logo.png"
                    alt="Logo"
                  />
                </div>

                <h1 className="h3 mb-3 font-weight-normal">
                  Welcome to <span className="fw-bold">GX APP</span>
                </h1>
                <p className="text-muted">Sign in to your account below</p>
              </div>
              {validation?.message && (
                <div
                  className="alert alert-danger alert-dismissible fade show"
                  role="alert"
                >
                  {validation.message}
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                  ></button>
                </div>
              )}

              <div className="align-items-center px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
                <form onSubmit={loginHandler}>
                  <h3
                    className="fw-normal mb-3 pb-3"
                    style={{ letterSpacing: "1px" }}
                  >
                    Log in
                  </h3>
                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form2Example18">
                      Email address
                    </label>

                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      id="form2Example18"
                      placeholder="e.g arbi@globalxtreme.net"
                      className={`form-control form-control-lg ${
                        error ? "is-invalid" : ""
                      }`}
                    />

                    {validation.email && (
                      <div className="invalid-feedback">
                        {validation.email[0]}
                      </div>
                    )}
                  </div>
                  <div className="form-outline mb-4">
                    <div className="d-flex justify-content-between">
                      <label className="form-label" htmlFor="form2Example28">
                        Password
                      </label>
                    </div>
                    <div className="form-outline mb-4">
                      <div
                        className={`input-group ${error ? "is-invalid" : ""}`}
                      >
                        <input
                          style={{ borderRight: "0px" }}
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          id="form2Example28"
                          className="form-control form-control-lg"
                          placeholder={showPassword ? "" : "password"}
                        />
                        <span
                          className="input-group-text bg-white"
                          onClick={() => setShowPassword(!showPassword)}
                          style={{ cursor: "pointer" }}
                        >
                          {showPassword ? <FiEyeOff /> : <FiEye />}
                        </span>
                      </div>

                      {error && (
                        <div className="invalid-feedback">
                          {/* Tampilkan pesan error sesuai kebutuhan */}
                          Password tidak valid.
                        </div>
                      )}
                    </div>

                    {validation.password && (
                      <div className="invalid-feedback">
                        {validation.password[0]}
                      </div>
                    )}
                  </div>

                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="keepSignedIn"
                    />
                    <label className="form-check-label" htmlFor="keepSignedIn">
                      Keep me signed in
                    </label>
                  </div>
                  <div className="d-flex justify-content-between pt-1 mb-4">
                    <button
                      className="btn btn-globalxtream btn-lg btn-block"
                      disabled={loading}
                      type="submit"
                    >
                      {" "}
                      {loading ? "LOADING..." : "LOGIN"}
                    </button>
                  </div>
                </form>
              </div>

              <div className="container align-items-center" />
              <div className="d-flex align-items-end justify-content-center ">
                <p
                  className="mt-5 mb-3 text-muted text-center border-top-login"
                  style={{ fontSize: "12px" }}
                >
                  © 2023 GX ONE - Committed to better quality Design &
                  Development By GlobalXtreme
                </p>
              </div>
              <div />
            </div>
            <div className="col-sm-12 col-md-12 col-lg-6 px-0 d-none d-sm-none d-lg-block d-xl-block d-md-none">
              <div
                className="card m-3 text-bg-dark border-0 rounded-13px"
                style={{
                  backgroundColor:
                    "linear-gradient(360deg, #221C00 14.45%, rgba(0, 0, 0, 0) 51.27%)",
                  width: "37rem",
                }}
              >
                <img
                  src="/background-login.png"
                  alt="Login image"
                  className="login-image rounded-13px"
                />
                <div className="card-img-overlay d-flex align-items-end overlay rounded-13px">
                  <div
                    style={{
                      paddingRight: "20px",
                      paddingLeft: "20px",
                      paddingBottom: "132px",
                      width: "100%",
                    }}
                  >
                    <p className="text-white" style={{ fontSize: "16px" }}>
                      - Gordon B. Hinckley
                    </p>
                    <p
                      className="text-white fw-bold"
                      style={{ fontSize: "34px" }}
                    >
                      "Without hard work, noting grows but weeds."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
