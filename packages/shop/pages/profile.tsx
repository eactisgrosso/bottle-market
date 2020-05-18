import React, { useContext } from "react";
import { NextPage } from "next";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import { Modal } from "@redq/reuse-modal";
import { AuthContext } from "contexts/auth/auth.context";
import { ProfileProvider } from "contexts/profile/profile.provider";
import { GET_LOGGED_IN_CUSTOMER } from "graphql/query/customer.query";
import SettingsContent from "containers/Profile/Settings/Settings";
import {
  PageWrapper,
  SidebarSection,
  ContentBox,
} from "containers/Profile/Profile.style";
import Sidebar from "containers/Profile/Sidebar/Sidebar";
import { SEO } from "components/seo";
import SiteFooter from "components/SiteFooter/SiteFooter";
import { FormattedMessage } from "react-intl";
import { withApollo } from "helper/apollo";

type Props = {
  deviceType?: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
};
const ProfilePage: NextPage<Props> = ({ deviceType }) => {
  const {
    authState: { user },
  } = useContext<any>(AuthContext);
  const { data, error, loading } = useQuery(GET_LOGGED_IN_CUSTOMER, {
    variables: { id: user ? user.id : "" },
  });
  if (!data || loading) {
    return <div>loading...</div>;
  }

  if (error) return <div>{error.message}</div>;
  return (
    <>
      <SEO title="Profile - BottleMarket" description="Profile Details" />
      <ProfileProvider initData={data.me}>
        <Modal>
          <PageWrapper>
            <SidebarSection>
              <Sidebar />
            </SidebarSection>
            <ContentBox>
              <SettingsContent deviceType={deviceType} />
            </ContentBox>

            <SiteFooter style={{ marginTop: 50 }}>
              <FormattedMessage
                id="siteFooter"
                defaultMessage="BottleMarket is a product of"
              />
              &nbsp; <Link href="#">BottleHub, SA.</Link>
            </SiteFooter>
          </PageWrapper>
        </Modal>
      </ProfileProvider>
    </>
  );
};

export default withApollo(ProfilePage);
