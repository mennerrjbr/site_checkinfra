import { getDictionary, type Locale } from "@/getDictionary";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutCompliance from "@/components/AboutCompliance";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <>
      <Header lang={lang} dict={dict} />
      <Hero lang={lang} dict={dict} />
      <AboutCompliance lang={lang} dict={dict} />
      <Services lang={lang} dict={dict} />
      <Contact lang={lang} dict={dict} />
      <Footer dict={dict} />
      <WhatsAppButton />
    </>
  );
}
