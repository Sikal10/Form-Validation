import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";

import "./SignUpForm.css";

const link = "https://i.pinimg.com/originals/f7/7f/02/f77f021d460462ac5953bfc17a659154.jpg";

const schema  = yup.object().shape({
    name: yup.string().trim().required("Required"),
    email: yup.string().email().required("Please enter a valid email address"),
    phoneNumber: yup.string().required("Phone number is required").matches(/[0-9]/g, "Invalid Phone Number").length(11, "Phone Number must be 11 digits long"),
    password: yup.string().min(8).max(32).required(),
    confirmPassword: yup.string().required("Required").oneOf([yup.ref("password"), null], "Passwords don't match")
});

const SignUpForm = () => {
    const {register, handleSubmit, formState: { errors }, reset} = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmitHandler = (data) => {
        console.log(data);
        reset();
    };

    return (
        <div className={"form-container"}>
            {/*left*/}
            <div className={"image-container"}>
                <img src={link} alt=""/>
            </div>

            {/*right*/}
            <div className={"right"}>
                <h2>Please Sign Up to Continue</h2>
                <form onSubmit={handleSubmit(onSubmitHandler)} className={"form"}>
                    <div className={"form-input"}>
                        <input name={"name"} {...register("name")} placeholder={"Name"} type={"text"} required />
                        <span>{errors.name?.message}</span>
                    </div>
                    <div className={"form-input"}>
                        <input name={"email"} {...register("email")} placeholder={"Email"} type={"email"} required />
                        <span>{errors.email?.message}</span>
                    </div>
                    <div className={"form-input"}>
                        <input name={"phoneNumber"} {...register("phoneNumber")} placeholder={"Phone Number"} type={"number"} required />
                        <span>{errors.phoneNumber?.message}</span>
                    </div>
                    <div className={"form-input"}>
                        <input name={"password"} {...register("password")} placeholder={"Password"} type={"password"} required />
                        <span style={{textTransform: "capitalize"}}>{errors.password?.message}</span>
                    </div>
                    <div className={"form-input"}>
                        <input name={"confirmPassword"} {...register("confirmPassword")} placeholder={"Confirm Password"} type={"password"} required />
                        <span>{errors.confirmPassword?.message}</span>
                    </div>
                    <button className={""}>Sign Up</button>
                </form>
            </div>
        </div>

    );
};

export default SignUpForm;