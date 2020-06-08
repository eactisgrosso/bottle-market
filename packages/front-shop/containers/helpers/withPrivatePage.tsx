import React, { Component, useEffect } from "react";
import { useAuth } from "@bottle-market/common/auth";
import { useRouter } from "next/router";
import { Modal, openModal } from "@redq/reuse-modal";
import SignInForm from "../SignInOutForm/SignIn";
import { setCookie } from "helper/session";

const LoginPopup = ({ backUrl = "/" }) => {
  useEffect(() => {
    openModal({
      show: true,
      overlayClassName: "quick-view-overlay",
      closeOnClickOutside: false,
      component: SignInForm,
      closeComponent: closeComponent,
      config: {
        enableResizing: false,
        disableDragging: true,
        className: "quick-view-modal",
        width: 458,
        height: "auto",
      },
    });
  }, []);

  const closeIcon = () => {
    return React.createElement(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        width: "32",
        height: "32",
        viewBox: "0 0 32 32",
      },
      React.createElement("path", {
        id: "_ionicons_svg_ios-close_5_",
        "data-name": "_ionicons_svg_ios-close (5)",
        d:
          "M179.418,175.84l10.925-10.925a2.56,2.56,0,0,0-3.62-3.62L175.8,172.22l-10.925-10.925a2.56,2.56,0,1,0-3.62,3.62l10.925,10.925-10.925,10.925a2.56,2.56,0,0,0,3.62,3.62L175.8,179.46l10.925,10.925a2.56,2.56,0,0,0,3.62-3.62Z",
        transform: "translate(-160.5 -160.55)",
        fill: "currentColor",
      })
    );
  };

  const closeComponent = () => {
    const router = useRouter();

    return React.createElement(
      "button",
      {
        className: "reuseModalCloseBtn",
        onClick: function onClick() {
          router.push(backUrl);
        },
      },
      React.createElement(closeIcon, null)
    );
  };

  return <Modal></Modal>;
};

export const withPrivatePage = (Component: any) => {
  return (props: any) => {
    const { signIn, isAuthenticated } = useAuth();
    const router = useRouter();
    const { pathname } = router;

    if (!isAuthenticated) {
      setCookie("returnUrl", pathname);
      signIn();
      return <LoginPopup isAuthenticated={isAuthenticated} {...props} />;
    }
    return <Component {...props} />;
  };
};
