import Link from "next/link";
import style from "../../../styles/Login.module.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import FormLayout from "../../../components/Formlayout";
import Nav from "@/components/admins/Nav";
import Head from "next/head";
export type userType = {
  _id: string;
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  date: string;
};
export default function Register() {
  const [selectedFile, setSelectedFile] = useState<File>();
  const [isFilePicked, setIsFilePicked] = useState<boolean>(false);
  const [showPassword, setshowPassword] = useState(false);
  const passwordType = showPassword ? "text" : "password";
  function changePasswordVisibility() {
    setshowPassword(!showPassword);
  }
  async function RegisterNow(event: any) {
    event.preventDefault();
    const token = await localStorage.getItem("AdminToken");
    var user = await fetch("/api/psychiatrists/create", {
      method: "POST",
      body: JSON.stringify({
        fullName: userName,
        email: userEmail,
        password: userPassword,
        age: age,
        confirmPassword: userConfirmPassword,
      }),
      headers: {
        "Content-Type": "application/json",
        authorization: token || "",
      },
    });
    if (user.status != 200) {
      const userData: { message: string } = await user.json();
      toast.error(userData?.message!);
    } else {
      const userData: userType = await user.json();
      toast.success("Registered Successfully");
      const formData = new FormData();
      formData.append("image", selectedFile!);
      console.log("userId:" + userData._id);
      const response = await fetch(
        "/api/psychiatrists/" + userData._id + "/add-image",
        {
          method: "POST",
          headers: {
            authorization: token || "",
          },
          body: formData,
        }
      );
      if (response.status != 200) {
        toast.error("Error uploading Image");
        return;
      } else {
        setUserInfo([userData, ...userInfo]);
        setUserName("");
        setUserEmail("");
        setUserPassword("");
        setAge("");
        setUserConfirmPassword("");
        toast.success("psychiatrist Created");
      }
    }
  }
  const [userInfo, setUserInfo] = useState<userType[]>([]);
  const [userName, setUserName] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const [userConfirmPassword, setUserConfirmPassword] = useState<string>("");

  useEffect(() => {}, []);
  const imageReg =
    "https://images.pexels.com/photos/1274260/pexels-photo-1274260.jpeg?auto=compress&cs=tinysrgb&w=600";
  return (
    <>
      <Head>
        <title>Add psychiatrists</title>
      </Head>
      <Nav route="psychiatrists" />
      <form action="" onSubmit={async (event) => RegisterNow(event)}>
        <FormLayout image={imageReg}>
          <>
            <div className={style.h1}>
              <h1>Add psychiatrists</h1>
            </div>
            <div className={style.LoginContent}>Full Name</div>
            <div>
              <input
                minLength={8}
                type="text"
                placeholder="Full Name"
                className={style.inputField}
                onChange={(event) => setUserName(event.target.value)}
                value={userName}
              />
            </div>
            <div className={style.LoginContent}>Age</div>
            <div>
              <input
                type="number"
                placeholder="Age"
                className={style.inputField}
                onChange={(event) => setAge(event.target.value)}
                value={age}
              />
            </div>
            <div className={style.LoginContent}>Email</div>
            <div>
              <input
                type="email"
                placeholder="Enter your Email"
                className={style.inputField}
                onChange={(event) => setUserEmail(event.target.value)}
                value={userEmail}
              />
            </div>
            <div className={style.LoginContent}>Password</div>
            <div className={style.passwordBox}>
              <input
                type={passwordType}
                placeholder="Enter your Password"
                className={style.inputField}
                onChange={(event) => setUserPassword(event.target.value)}
                value={userPassword}
              />
              {showPassword ? (
                <AiFillEyeInvisible
                  onClick={changePasswordVisibility}
                  className={style.hidePassowrd}
                />
              ) : (
                <AiFillEye
                  className={style.hidePassowrd}
                  onClick={changePasswordVisibility}
                />
              )}
            </div>
            <div className={style.LoginContent}>Confirm Password</div>
            <div className={style.passwordBox}>
              <input
                type={passwordType}
                placeholder="Confirm Password"
                className={style.inputField}
                onChange={(event) => setUserConfirmPassword(event.target.value)}
                value={userConfirmPassword}
              />
              {showPassword ? (
                <AiFillEyeInvisible
                  onClick={changePasswordVisibility}
                  className={style.hidePassowrd}
                />
              ) : (
                <AiFillEye
                  className={style.hidePassowrd}
                  onClick={changePasswordVisibility}
                />
              )}
            </div>
            <div className={style.LoginContent}>Image</div>
            <div>
              <input
                type="file"
                placeholder="image"
                className={style.inputField}
                required
                onChange={(event) => {
                  setSelectedFile(event.target.files?.[0]);
                  setIsFilePicked(true);
                }}
              />
            </div>
            <button className={style.loginButton}>Add psychiatrist</button>
          </>
        </FormLayout>
      </form>
    </>
  );
}