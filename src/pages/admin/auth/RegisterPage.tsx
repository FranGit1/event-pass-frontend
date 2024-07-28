import * as yup from "yup";
import tw from "twin.macro";
import { FormProvider, useForm } from "react-hook-form";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { yupResolver } from "@hookform/resolvers/yup";

import { useTranslation } from "react-i18next";
import { useRef, useState } from "react";
import { ReactComponent as ArrowModal } from "../../../assets/icons/arrowModal.svg";
import { useMedia } from "react-use";
import { useParams } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { useMutation } from "@tanstack/react-query";
import { useNavigation } from "../../../hooks/use-navigation";
import { errorMessageStrings } from "../../../utils";
import { toast } from "react-toastify";
import { scrollToError } from "../../../fields/form/utils";
import { http } from "../../../http";
import { routes } from "../../../navigation/admin/routing";
import { Typography } from "../../../ui/Typography";
import { Button } from "../../../ui/buttons/Button";
import { Form } from "../../../fields/form";
import { config } from "../../../config";

export const RegisterPage = () => {
  const { t, i18n } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const isMobile = useMedia("(max-width: 1200px)");
  const { slug } = useParams();
  const reCaptchaRef: any = useRef(null);
  const { navigate } = useNavigation();
  const validateRecaptcha = useMutation({
    mutationFn: (token: string) => http.validateRecaptcha(token),
  });

  const schema = yup.object().shape({
    email: yup
      .string()
      .required(t(errorMessageStrings.emailRequired))
      .email(t(errorMessageStrings.emailBadFormat)),
    firstName: yup.string().required(t(errorMessageStrings.firstNameRequired)),
    lastName: yup.string().required(t(errorMessageStrings.lastNameRequired)),
    password: yup.string().required(t(errorMessageStrings.passwordRequired)),
    // .min(8, t(errorMessageStrings.passwordBadFormat))
    // .matches(/[A-Z]/, t(errorMessageStrings.passwordBadFormat))
    // .matches(/[0-9]/, t(errorMessageStrings.passwordBadFormat)),
    repeatPassword: yup
      .string()
      .required(t(errorMessageStrings.repeatPasswordRequired))
      .oneOf(
        [yup.ref("password"), ""],
        t(errorMessageStrings.repeatPasswordMustMatch)
      ),
    username: yup.string().required(t(errorMessageStrings.lastNameRequired)),
    companyName: yup.string().required(t(errorMessageStrings.lastNameRequired)),
    contactInfo: yup.string().required(t(errorMessageStrings.lastNameRequired)),
  });

  type IFormRegister = yup.InferType<typeof schema>;

  const methods = useForm<IFormRegister>({
    defaultValues: {
      email: "",
      password: "",
      repeatPassword: "",
      username: "",
      companyName: "",
      contactInfo: "",
    },
    //@ts-ignore
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });

  const onSubmit = methods.handleSubmit(async (values) => {
    try {
      const token = reCaptchaRef.current.getValue();
      let isSuccessfull;
      if (token) {
        isSuccessfull = await validateRecaptcha.mutateAsync(token);
      }
      reCaptchaRef.current.reset();
      console.log(values);

      if ((token && isSuccessfull) || !token) {
        const response = await http.register(
          { ...values, slug },
          i18n.language
        );
        methods.reset();

        if (response) {
          navigate(routes.auth.accountCreated);
        } else {
          navigate(routes.auth.accountCreationFail);
        }
      }
    } catch (e) {
      console.error(e);
      toast.error(t("singupError"));
    }
  }, scrollToError);
  return (
    <FormProvider {...methods}>
      <form css={[tw`flex flex-col items-start mt-8 md:(w-112 mt-0) `]}>
        <Typography.H1>Logo</Typography.H1>
        <div tw="w-full flex flex-col lg:flex-row md:flex-col gap-x-4">
          <Form.TextInput.Rounded
            name="firstName"
            label={t("name")}
            placeholder={t("namePlaceholder")}
            required={true}
            tw="w-full md:w-full lg:w-1/2"
          />
          <Form.TextInput.Rounded
            name="lastName"
            label={t("surname")}
            placeholder={t("surnamePlaceholder")}
            required={true}
            tw="w-full md:w-full lg:w-1/2"
          />
        </div>

        <Form.TextInput.Rounded
          name="email"
          label={t("email")}
          placeholder={t("emailPlaceholder")}
          type="email"
          required={true}
        />

        <Form.TextInput.Rounded
          name="username"
          label={t("username")}
          placeholder={t("usernamePlaceholder")}
          required={true}
          tw="w-full md:w-full lg:w-1/2"
        />

        <Form.TextInput.Rounded
          name="companyName"
          label={t("companyName")}
          placeholder={t("companyNamePlaceholder")}
          required={true}
          tw="w-full md:w-full lg:w-1/2"
        />

        <Form.TextInput.Rounded
          name="contactInfo"
          label={t("contactInfo")}
          placeholder={t("contactInfoPlaceholder")}
          required={true}
          tw="w-full md:w-full lg:w-1/2"
        />
        <div
          tw="w-full relative"
          onMouseEnter={() => {
            setShowTooltip(true);
          }}
          onMouseLeave={() => {
            setShowTooltip(false);
          }}
        >
          <Form.TextInput.Rounded
            name="password"
            label={t("password")}
            placeholder={t("passwordPlaceholder")}
            type="password"
            required={true}
            autoComplete="current-password"
            containerCss={[tw`mb-1`]}
          />
          {showTooltip && !isMobile && (
            <div tw="bg-gray-600 p-4 w-[18rem] h-25 rounded-2xl absolute top-2 left-[32rem] ml-4 px-8 shadow-md text-left">
              {t(errorMessageStrings.passwordBadFormat)}
              <ArrowModal tw="absolute top-10 right-[18.1rem]" />
            </div>
          )}
        </div>

        <Typography.Notice
          containerCss={[tw`mb-12 mt-[-2rem] text-start flex md:hidden`]}
        >
          <span css={[tw` cursor-pointer`]}> {t("passwordInstruction")} </span>
        </Typography.Notice>
        <Form.TextInput.Rounded
          name="repeatPassword"
          label={t("repeatPassword")}
          placeholder={t("repeatPasswordPlaceholder")}
          type={showPassword ? "text" : "password"}
          required={true}
          autoComplete="new-password"
          containerCss={[tw`mb-1`]}
          trail={AiOutlineEyeInvisible}
          trailCss={[tw`cursor-pointer text-primary`]}
          onTrailIconClick={() => setShowPassword(!showPassword)}
        />

        <Typography.Notice containerCss={[tw`mb-12 text-start`]}>
          {t("protectedByRecaptcha")}
          <span css={[tw`text-primary cursor-pointer`]}>
            {" "}
            {t("privacyPolicy")}{" "}
          </span>{" "}
          {t("and")}{" "}
          <span css={[tw`text-primary cursor-pointer`]}>
            {t("termsOfService")}
          </span>{" "}
          {t("apply")}.
        </Typography.Notice>
        <Typography.Notice containerCss={[tw`mb-12 text-start`]}>
          {t("createAccountAgreement")}{" "}
          <span css={[tw`text-primary cursor-pointer`]}>{t("termsOfUse")}</span>{" "}
          {t("and")} {t("confirmReadAndAcknowledged")}{" "}
          <span css={[tw`text-primary cursor-pointer`]}>
            {t("privacyAndCookieStatement")}
          </span>
          .
        </Typography.Notice>
        <ReCAPTCHA
          sitekey={config.recaptchaSiteKey}
          ref={reCaptchaRef}
          tw="self-center my-8"
        />

        <Button.Contained
          allowLoader
          containerCss={[
            tw`rounded-full  self-center py-3 w-full md:(min-w-36 w-4) `,
          ]}
          onClick={onSubmit}
        >
          {t("signUp")}
        </Button.Contained>
      </form>
    </FormProvider>
  );
};
