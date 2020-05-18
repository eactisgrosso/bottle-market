import React from "react";
import { NextPage } from "next";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import { Modal } from "@redq/reuse-modal";
import { useAuth } from "contexts/auth/useAuth";
import { GET_LOGGED_IN_CUSTOMER } from "graphql/query/customer.query";
import { ProfileProvider } from "contexts/profile/profile.provider";
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
  const { user } = useAuth();
  const { data, error, loading } = useQuery(GET_LOGGED_IN_CUSTOMER, {
    variables: { id: "eebac3e4-5de0-43b7-a45a-cf3b3837d43e" },
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
