import * as React from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";

interface ForgotPasswordEmailProps {
  username: string;
  resetUrl: string;
  userEmail: string;
  locale: string;
  t: (key: string, values?: Record<string, any>) => string;
}

const ForgotPasswordEmail = (props: ForgotPasswordEmailProps) => {
  const { username, resetUrl, userEmail, locale, t } = props;

  return (
    <Html lang={locale} dir="ltr">
      <Tailwind>
        <Head />
        <Preview>{t("header_title")}</Preview>
        <Body className="bg-gray-100 font-sans py-[40px]">
          <Container className="bg-white rounded-[8px] shadow-sm max-w-[600px] mx-auto p-[40px]">
            <Section className="text-center mb-[32px]">
              <Heading className="text-[28px] font-bold text-gray-900 m-0 mb-[8px]">
                {t("header_title")}
              </Heading>
              <Text className="text-[16px] text-gray-600 m-0">{t("header_subtitle")}</Text>
            </Section>

            <Section className="mb-[32px]">
              <Text className="text-[16px] text-gray-700 leading-[24px] m-0 mb-[16px]">
                {t("greeting", { username })}
              </Text>
              <Text className="text-[16px] text-gray-700 leading-[24px] m-0 mb-[16px]">
                {t("instruction_paragraph1")} <strong>{userEmail}</strong>.
              </Text>
              <Text className="text-[16px] text-gray-700 leading-[24px] m-0 mb-[24px]">
                {t("instruction_paragraph2")}
              </Text>
            </Section>

            <Section className="text-center mb-[32px]">
              <Button
                href={resetUrl}
                className="bg-blue-600 text-white px-[32px] py-[16px] rounded-[8px] text-[16px] font-semibold no-underline box-border inline-block"
              >
                {t("reset_password_button")}
              </Button>
            </Section>

            <Section className="mb-[32px]">
              <Text className="text-[14px] text-gray-600 leading-[20px] m-0 mb-[8px]">
                {t("alternative_link_text")}
              </Text>
              <Link
                href={resetUrl}
                className="text-blue-600 text-[14px] break-all"
              >
                {resetUrl}
              </Link>
            </Section>

            <Section className="bg-gray-50 p-[20px] rounded-[8px] mb-[32px]">
              <Text className="text-[14px] text-gray-700 leading-[20px] m-0 mb-[8px] font-semibold">
                {t("security_notice_title")}
              </Text>
              <Text className="text-[14px] text-gray-600 leading-[20px] m-0 mb-[8px]">{t("security_notice_item1")}</Text>
              <Text className="text-[14px] text-gray-600 leading-[20px] m-0 mb-[8px]">{t("security_notice_item2")}</Text>
              <Text className="text-[14px] text-gray-600 leading-[20px] m-0 mb-[8px]">{t("security_notice_item3")}</Text>
            </Section>

            <Section className="mb-[32px]">
              <Text className="text-[14px] text-gray-600 leading-[20px] m-0">
                {t("help_text")}{" "}
                <Link
                  href="mailto:support@company.com"
                  className="text-blue-600"
                >
                  {t("support_email")}
                </Link>
              </Text>
            </Section>

            <Section className="border-t border-gray-200 pt-[24px]">
              <Text className="text-[12px] text-gray-500 leading-[16px] m-0 mb-[8px]">
                {t("sent_to_email_footer", { userEmail })}
              </Text>
              <Text className="text-[12px] text-gray-500 leading-[16px] m-0 mb-[8px]">
                {t("company_address_footer")}
              </Text>
              <Text className="text-[12px] text-gray-500 leading-[16px] m-0">
                {t("copyright_footer")}{" "}
                <Link href="#" className="text-gray-500">
                  {t("unsubscribe_link")}
                </Link>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ForgotPasswordEmail;