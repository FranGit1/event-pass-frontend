import * as yup from "yup";
import { FormProvider, useForm } from "react-hook-form";
import tw from "twin.macro";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";

import { useTranslation } from "react-i18next";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import useAuth from "../../../hooks/auth/useAuth";
import { useNavigation } from "../../../hooks/use-navigation";
import { http } from "../../../http";
import { errorMessageStrings } from "../../../utils";
import { routes } from "../../../navigation/admin/routing";
import { queryKeys } from "../../../queries";
import { toast } from "../../../ui/indicators/Toast";
import { scrollToError } from "../../../fields/form/utils";
import { Form } from "../../../fields/form";
import { Typography } from "../../../ui/Typography";
import { Button } from "../../../ui/buttons/Button";
import { config } from "../../../config";

export const LoginPage = () => {
  const { navigateWithSlug, navigate } = useNavigation();
  const queryClient = useQueryClient();
  const { setAuth } = useAuth();
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const reCaptchaRef: any = useRef(null);

  const validateRecaptcha = useMutation({
    mutationFn: (token: string) => http.validateRecaptcha(token),
  });

  const schema = yup.object().shape({
    email: yup
      .string()
      .required(t(errorMessageStrings.emailRequired))
      .email(t(errorMessageStrings.emailBadFormat)),
    password: yup.string().required(t(errorMessageStrings.passwordRequired)),
  });

  type IForm = yup.InferType<typeof schema>;

  const methods = useForm<IForm>({
    defaultValues: {
      email: "",
      password: "",
    },
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
      const user = await http.login(values);

      if ((!token && user) || (user && isSuccessfull.success)) {
        setAuth(user);
        const intendedDestination = localStorage.getItem("intendedDestination");
        const defaultDestination = routes.base;

        localStorage.removeItem("intendedDestination");

        intendedDestination
          ? navigate(intendedDestination, { replace: true })
          : navigateWithSlug(defaultDestination, true);
        window.location.reload();
      }

      queryClient.invalidateQueries({ queryKey: [queryKeys.isAuthenticated] });
    } catch (e: any) {
      console.error(e);
      if (e.response.status === 409) {
        toast.error(t("errorMailLocked"));
      } else {
        toast.error(t("errorLogin"));
      }
    }
  }, scrollToError);
  return (
    <FormProvider {...methods}>
      <form
        css={[tw`flex flex-col justify-between h-[65vh] md:(w-112 h-full) `]}
      >
        <div tw="flex flex-col items-center">
          <Typography.H1>lOGO</Typography.H1>
          <Form.TextInput.Rounded
            name="email"
            label={t("email")}
            type="email"
            placeholder={t("emailPlaceholder")}
          />
          <Form.TextInput.Rounded
            name="password"
            label={t("password")}
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder={t("passwordPlaceholder")}
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
        </div>

        <div>
          <div
            css={[tw`flex flex-row justify-center mb-6 cursor-pointer w-full`]}
          >
            <Typography.Meta onClick={() => navigate(routes.base)}>
              {" "}
              {t("forgotPassword")}
            </Typography.Meta>
          </div>
          <div css={[tw`flex flex-row justify-center`]}>
            <Button.Contained
              allowLoader
              containerCss={[tw`rounded-full w-full md:(w-4) py-3`]}
              onClick={onSubmit}
            >
              {t("logIn")}
            </Button.Contained>
          </div>
        </div>
        <ReCAPTCHA sitekey={config.recaptchaSiteKey} ref={reCaptchaRef} />
      </form>
    </FormProvider>
  );
};
