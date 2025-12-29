"use client";

import Image from "next/image";
import { useState } from "react";

/** =========================
 *  类型定义
 *  ========================= */
type ServiceItem = {
  title: string;
  desc: string;
};

type Testimonial = {
  quote: string;
  name: string;
};

type TeamMember = {
  id: string; // 必须唯一（用于点击弹窗）
  name: string;
  role: string;
  bio: string;

  email?: string;
  phone?: string;
  website?: string; // 建议包含 https://
  address?: string;
  license?: string;

  avatar?: string; // 放 public 里，写成 "/xxx.png"
};

/** =========================
 *  常量数据：移到组件外
 *  ========================= */
const BRAND_NAME = "Law Offices of Paul Christophe McCoy";

const SERVICES: ServiceItem[] = [
  {
    title: "Cryptocurrency Scam Recovery",
    desc: "Our cyber fraud investigators track cryptocurrency trails to help victims obtain actionable evidence for recovery efforts.",
  },
  {
    title: "Investment Fraud Recovery Service",
    desc: "We integrate cyber intelligence, investigations, and on-the-ground monitoring to provide end-to-end solutions.",
  },
  {
    title: "Banking Scam Recovery Service",
    desc: "Fraud can strike at any moment—our team is standing by to assist with clear steps and coordination.",
  },
  {
    title: "Hacked Account Restoration Service",
    desc: "We help recover lost accounts, remove harmful content, and support restoration of compromised access.",
  },
  {
    title: "General Online Scam Recovery",
    desc: "Rapid trace multi-jurisdictional support to help address fraudulent investment situations.",
  },
  {
    title: "Phishing Account Mitigation",
    desc: "Proactive defense against phishing attacks and credential theft to reduce unauthorized access risk.",
  },
];

const TEAM: TeamMember[] = [
  {
    id: "pcm",
    name: "Paul Christophe McCoy",
    role: "CEO of the law firm",
    bio:
      "Paul Christophe McCoy is currently the Chief Executive Officer (CEO) of this firm, responsible for the firm's overall management, strategic planning, and organizational leadership.His legal career began at a large San Francisco law firm, where he gained solid experience in corporate and civil law practice. In 2010, he founded the law firm Paul Christophe McCoy, primarily serving small and medium-sized businesses, real estate investors, and individual clients in the San Francisco Bay Area, with practice encompassing commercial contracts, real estate disputes, estate planning, and general civil litigation.Since 2020, Mr. McCoy has not been practicing law directly and has not accepted new clients. The firm's focus has subsequently shifted to assisting victims of online fraud and related scams through compliant channels in risk assessment, information gathering, resource matching, and cross-institutional communication, striving to help victims minimize losses and secure their legal rights. The firm maintains cooperative and communication mechanisms with cybersecurity organizations in multiple countries and regions, providing pro bono initial support services to eligible victims in the early stages, free of charge.Currently, as CEO, Mr. McCoy focuses on the firm's day-to-day management, long-term development strategy, corporate governance, and overall operational oversight, and no longer participates in representing specific cases or issuing legal opinions.",
    email: "paul@paulmccoylaw.com",
    website: "https://paulchristophemccoy.com",
    address: "3310 Ambassador Dr, Palm Springs, CA",
    license: "#208520",
    avatar: "/paul-ceo1.png",
  },
  {
    id: "david", // ✅ 建议 id 用小写，保持一致
    name: "David Andrew Thorpe",
    role: "Asia Pacific Fraud Recovery Lawyer | Asia-Pacific Regional Head",
    bio:
      "David Andrew Thorpe is currently the Asia Pacific Head of this law firm, responsible for the overall coordination and management of related matters in the Asia Pacific region, with a focus on handling various cases related to online fraud and financial fraud. His areas of expertise include cryptocurrency fraud, investment fraud, bank fraud, account recovery assistance, general online fraud cases, and phishing prevention.David joined the firm in 2010, where he has long been involved in cross-border disputes and related support work. Following a shift in the firm's main service focus in 2020, he was relocated to Hong Kong to provide support and coordination services to victims of online fraud and cyber scams in the Asia Pacific region.Through his practice and management, David has accumulated extensive experience in handling cases across jurisdictions. In 2022, he assisted a Malaysian victim in recovering losses from an online fraud case, ultimately successfully recovering over US$3 million in related losses.Currently, David Andrew Thorpe focuses on the overall coordination, resource allocation, and management of online fraud cases in the Asia Pacific region, and continues to promote the development of cross-institutional and cross-regional cooperation mechanisms within the region.",
    email: "David@paulmccoylaw.com",
    phone: "+852 (448) 748-23",
    website: "https://paulchristophemccoy.com",
    address: "Room 2305, 23/F, 1 Connaught Place, Central, Hong Kong",
    license: "#216498",
    avatar: "/paul-David.png",
  },
  {
    id: "tami",
    name: "Tami Anne Chen",
    role: "North American Fraud Recovery Lawyer",
    bio:
      "Tami Anne Chen is currently the lead attorney for cyber fraud cases in North America at this law firm, primarily responsible for the overall coordination and handling of cyber fraud and related fraud cases in North America. Her practice areas include cryptocurrency fraud, investment fraud, bank fraud, account recovery assistance, general cyber fraud cases, and phishing prevention.Tami joined the firm in 2014, focusing on domestic dispute resolution and related support work in the United States. She is familiar with the North American legal environment and inter-agency collaboration processes. As the firm adjusted and expanded its main service areas in 2020, her scope of services further broadened, including coordinating cyber fraud cases across North America and providing loss recovery and coordination support services for victims in cross-regional cyber fraud incidents.Through years of case handling and management, Tami has accumulated extensive experience across jurisdictions. In 2021, she assisted a victim in the New York area in recovering losses from a cyber fraud case, ultimately successfully recovering over $5 million in related losses.Currently, Tami Anne Chen continues to work on the front lines of case handling, focusing on the actual progress of online fraud cases in North America, resource coordination, and victim support, and is committed to helping more victims fight for and recover losses caused by online fraud within a legal and compliant framework.",
    email: "Tami@paulmccoylaw.com",
    phone: "",
    website: "https://paulchristophemccoy.com",
    address: "3310 Ambassador Dr, Palm Springs, CA",
    license: "#275694",
    avatar: "/paul-Tami.png",
  },
  {
    id: "daisy",
    name: "Daisy Anderson",
    role: "Asia-Pacific Online Legal Inquiry Intake Assistant",
    bio:
      "Daisy Anderson currently serves as the firm’s Asia-Pacific Asia-Pacific Online Legal Inquiry Intake Assistan, primarily responsible for handling online legal inquiries and initial client communications across various digital platforms, including but not limited to Facebook and TikTok.Daisy joined the firm in 2020 and has since been engaged in online legal support and preliminary case information coordination. Her primary responsibilities include providing pro bono initial legal information, procedural guidance, and solution references to victims of online fraud and related cybercrime, as well as assisting relevant teams in advancing subsequent case-handling processes.Through her involvement in case support and coordination, she has assisted more than 1000 victims of online fraud and helped over 800 individuals, within a lawful and compliant framework, recover losses resulting from online fraud.Currently, Daisy Anderson continues to work on the front lines of online consultations in the Asia-Pacific region, focusing on delivering timely and clear preliminary support through structured and efficient communication, while assisting the firm’s teams in advancing follow-up case processing.",
    email: "Daisy@paulmccoylaw.com",
    phone: "+852 (445) 987-22",
    website: "https://paulchristophemccoy.com",
    address: "Room 2305, 23/F, 1 Connaught Place, Central, Hong Kong",
    avatar: "/paul-Daisy.png",
  },
  {
    id: "emily",
    name: "Emily Thompson",
    role: "North America Online Legal Inquiry Intake Assistant",
    bio:
      "Emily Thompson currently serves as the firm’s North America Online Legal Inquiry Intake Assistant, primarily responsible for handling online legal inquiries and initial client communications across various digital platforms, including but not limited to Facebook and TikTok.Emily joined the firm in 2022 and has since been engaged in online legal support and preliminary case information coordination. Her primary responsibilities include providing pro bono initial legal information, procedural guidance, and solution references to victims of online fraud and related cybercrime, as well as assisting relevant teams in advancing subsequent case-handling processes.Through her involvement in case support and coordination, she has assisted more than 600 victims of online fraud and helped over 500 individuals, within a lawful and compliant framework, recover losses resulting from online fraud.Currently, Emily Thompson continues to work on the front lines of online consultations in the North America region, focusing on delivering timely and clear preliminary support through structured and efficient communication, while assisting the firm’s teams in advancing follow-up case processing.",
    email: "Emily@paulmccoylaw.com",
    phone: "+1 (431) 340-4081",
    website: "https://paulchristophemccoy.com",
    address: "3310 Ambassador Dr, Palm Springs, CA",
    license: "",
    avatar: "/paul-Emily.png",
  },
];

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Clear guidance and fast communication. We always understood our options and next steps.",
    name: "Ethan Wildhorse",
  },
  {
    quote:
      "Practical strategy, no unnecessary complexity. Professional from start to finish.",
    name: "Jacob Shadowfox",
  },
  {
    quote:
      "Thorough and responsive. The team handled our matter with care and attention to detail.",
    name: "Emma Riverstone",
  },
];

/// ✅ 页面内显示地图（iframe 专用）
const GOOGLE_MAP_EMBED_SRC =
"https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d26504.940059875215!2d-116.536821!3d33.8608624!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80db195fdec11e89%3A0x1d0963269735bbf!2s3310%20Ambassador%20Dr%2C%20Palm%20Springs%2C%20CA%2092262%2C%20USA!5e0!3m2!1sen!2skh!4v1766979627914!5m2!1sen!2skh";

// ✅ 点击“在 Google Maps 中打开”
const GOOGLE_MAP_OPEN_LINK =
  "https://maps.app.goo.gl/vL6AX3f6PJLoDSKR8";


export default function Home() {
  /** =========================
   *  弹窗状态
   *  ========================= */
  const [activeMemberId, setActiveMemberId] = useState<string | null>(null);
  const activeMember = activeMemberId
    ? TEAM.find((m) => m.id === activeMemberId) ?? null
    : null;

  return (
    <main className="min-h-screen bg-black text-white">
      {/* ================= Header ================= */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <a href="#home" className="flex items-center">
            <Image
              src="/logo-horizontal.png"
              alt="PCM Law Offices"
              width={170}
              height={46}
              className="h-10 w-auto object-contain"
              priority
            />
          </a>

          <nav className="hidden items-center gap-6 text-sm text-white/80 md:flex">
            <a href="#home" className="hover:text-white">
              Home
            </a>
            <a href="#about" className="hover:text-white">
              About Us
            </a>
            <a href="#services" className="hover:text-white">
              Services
            </a>
            <a href="#team" className="hover:text-white">
              Team
            </a>
            <a href="#testimonials" className="hover:text-white">
              Testimonials
            </a>
            <a href="#contact" className="hover:text-white">
              Contact
            </a>
          </nav>

          <a
            href="#contact"
            className="rounded-lg bg-[#C9A24B] px-4 py-2 text-sm font-semibold text-black hover:bg-[#D8B45A]"
          >
            Request a Consultation
          </a>
        </div>
      </header>

      {/* ================= Hero ================= */}
      <section id="home" className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-sm font-medium text-[#C9A24B]">
              Trusted Counsel · Clear Strategy · Practical Results
            </p>

            <h1 className="mt-3 text-3xl font-semibold leading-tight md:text-5xl">
              {BRAND_NAME}
            </h1>

            <p className="mt-4 leading-relaxed text-white/80">
              {BRAND_NAME} is a U.S.-based legal team focused on digital-asset
              and fraud-related matters. We provide evidence coordination,
              recovery strategy planning, and clear communication for clients
              navigating complex cross-platform disputes.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#contact"
                className="rounded-lg bg-[#C9A24B] px-5 py-3 text-sm font-semibold text-black hover:bg-[#D8B45A]"
              >
                Get Started
              </a>
              <a
                href="#services"
                className="rounded-lg border border-white/20 px-5 py-3 text-sm font-semibold text-white hover:border-white/40"
              >
                View Services
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-2 text-xs text-white/70">
              <span className="rounded-full border border-[#C9A24B]/40 px-3 py-1">
                Crypto Asset Recovery
              </span>
              <span className="rounded-full border border-[#C9A24B]/40 px-3 py-1">
                Investment Fraud
              </span>
              <span className="rounded-full border border-[#C9A24B]/40 px-3 py-1">
                Wire Fraud
              </span>
              <span className="rounded-full border border-[#C9A24B]/40 px-3 py-1">
                Hacked Accounts
              </span>
              <span className="rounded-full border border-[#C9A24B]/40 px-3 py-1">
                General Online Scam Recovery
              </span>
               <span className="rounded-full border border-[#C9A24B]/40 px-3 py-1">
                Phishing Account Mitigation
              </span>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-[#C9A24B]/30">
            <Image
              src="/photo_2025-12-26_18-36-08.jpg"
              alt="Law office environment"
              width={900}
              height={700}
              className="h-full w-full object-cover opacity-95"
              priority
            />
          </div>
        </div>
      </section>

      {/* ================= Services ================= */}
      <section id="services" className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-2xl font-semibold">Our Services</h2>
        <p className="mt-2 text-white/75">
          Explore our practice areas. We’ll recommend a clear plan based on your
          goals.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {SERVICES.map((s) => (
            <div
              key={s.title}
              className="rounded-2xl border border-white/15 bg-black/40 p-6 hover:border-[#C9A24B]/40"
            >
              <div className="text-lg font-semibold text-white">{s.title}</div>
              <p className="mt-2 text-sm leading-relaxed text-white/80">
                {s.desc}
              </p>
              <a
                href="#contact"
                className="mt-4 inline-block text-sm font-medium text-[#C9A24B] hover:underline"
              >
                Learn More
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ================= About ================= */}
      <section id="about" className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-2xl font-semibold text-white">About Us</h2>
          <p className="mt-3 leading-relaxed text-white/80">
            We prioritize transparent communication, evidence-based strategy,
            and practical outcomes. Our goal is to reduce uncertainty and help
            clients make confident decisions.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Clarity",
                desc: "Plain-English explanations of options, risks, and next steps.",
              },
              {
                title: "Strategy",
                desc: "A plan aligned with your goals—negotiation, drafting, or litigation.",
              },
              {
                title: "Integrity",
                desc: "We do not charge any upfront fees. Fees are only charged after the victim has recovered the funds lost to online fraud.—no inflated promises.",
              },
            ].map((x) => (
              <div
                key={x.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10"
              >
                <div className="text-lg font-semibold text-[#C9A24B]">
                  {x.title}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-white/80">
                  {x.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= Team（✅方案1：卡片等高） ================= */}
      <section id="team" className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-2xl font-semibold">Team</h2>
        <p className="mt-2 text-white/75">
          Click a profile card to view details such as email and address.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {TEAM.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setActiveMemberId(p.id)}
              className="
                text-left
                rounded-2xl
                border border-white/15
                bg-black/40
                p-6
                hover:border-[#C9A24B]/40
                flex flex-col
                min-h-105
              "
            >
              {/* 头像：方形 */}
              {p.avatar ? (
                <Image
                  src={p.avatar}
                  alt={p.name}
                  width={96}
                  height={96}
                  className="h-24 w-24 rounded-md object-cover"
                />
              ) : (
                <div className="h-24 w-24 rounded-md bg-white/20" />
              )}

              <div className="mt-4 text-lg font-semibold text-white">
                {p.name}
              </div>
              <div className="mt-1 text-sm text-[#C9A24B]">{p.role}</div>

              {/* ✅ 关键：占满中间空间，保证按钮贴底 */}
              <p className="mt-3 text-sm leading-relaxed text-white/75 line-clamp-4 flex-1">
                {p.bio}
              </p>

              {/* ✅ 关键：永远在底部对齐 */}
              <div className="mt-auto pt-4 text-sm font-medium text-[#C9A24B] underline">
                View Details
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* ================= Testimonials ================= */}
      <section id="testimonials" className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-2xl font-semibold text-white">Testimonials</h2>
          <p className="mt-2 text-white/75">
            Many of our clients send positive feedback.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="rounded-2xl border border-white/15 bg-black/40 p-6 hover:border-[#C9A24B]/40"
              >
                <p className="text-sm leading-relaxed text-white/80">
                  “{t.quote}”
                </p>
                <div className="mt-4 text-sm font-semibold text-[#C9A24B]">
                  {t.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    {/* ================= Contact（地区法律咨询入口） ================= */}
<section id="contact" className="border-t border-white/10">
  <div className="mx-auto max-w-6xl px-4 py-14">
    <h2 className="text-2xl font-semibold text-white">Contact</h2>
    <p className="mt-2 text-white/75">
      Select your region to connect directly with a legal consultation advisor
      via WhatsApp or Telegram.
    </p>

    {/* 地区咨询窗口 */}
    <div className="mt-8 grid gap-6 md:grid-cols-2">
      {/* ================= 北美 ================= */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <div className="text-lg font-semibold text-white">
          North America (US / Canada)
        </div>
        <div className="mt-1 text-sm text-white/70">
          Primary channel: WhatsApp · Telegram
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          {/* WhatsApp */}
          <a
            href="https://wa.me/+14313404081"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-[#C9A24B] px-5 py-2 text-sm font-semibold text-black hover:bg-[#D8B45A]"
          >
            WhatsApp
          </a>

          {/* Telegram */}
          <a
            href="https://t.me/+17159535034"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-white/15 bg-black/40 px-5 py-2 text-sm font-semibold text-white hover:border-[#C9A24B]/40"
          >
            Telegram
          </a>
        </div>

        <p className="mt-3 text-xs text-white/45">
          Click to start a secure consultation chat.
        </p>
      </div>

      {/* ================= 亚太 ================= */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <div className="text-lg font-semibold text-white">
          Asia-Pacific (APAC)
        </div>
        <div className="mt-1 text-sm text-white/70">
          Hong Kong · Singapore · Australia · Malaysia
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          {/* WhatsApp */}
          <a
            href="https://wa.me/+85244598722"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-[#C9A24B] px-5 py-2 text-sm font-semibold text-black hover:bg-[#D8B45A]"
          >
            WhatsApp
          </a>

          {/* Telegram */}
          <a
            href="https://t.me/+85295066278"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-white/15 bg-black/40 px-5 py-2 text-sm font-semibold text-white hover:border-[#C9A24B]/40"
          >
            Telegram
          </a>
        </div>

        <p className="mt-3 text-xs text-white/45">
          Dedicated advisors for Asia-Pacific region.
        </p>
      </div>
    </div>

    {/* 总部信息 + 地图 */}
    <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6">
      <div className="space-y-2 text-sm text-white/80">
        <div className="font-medium text-white">Head Office</div>
        <div>
          <span className="font-medium">Email:</span>{" "}
          <a
            href="mailto:PaulMcCoyLaw@paulmccoylaw.onmicrosoft.com"
            className="text-[#C9A24B] underline"
          >
            PaulMcCoyLaw@paulmccoylaw.onmicrosoft.com
          </a>
        </div>
        <div>
          <span className="font-medium">Address:</span> 3310 Ambassador Dr, Palm Springs, CA
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-[#C9A24B]/25">
        <iframe
          src={GOOGLE_MAP_EMBED_SRC}
          className="h-56 w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      <a
        href={GOOGLE_MAP_OPEN_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-block text-[#C9A24B] underline"
      >
        Open in Google Maps
      </a>
    </div>

    {/* 免责声明 */}
    <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-white/80">
      <div className="font-semibold text-white">Disclaimer</div>
      <p className="mt-2 leading-relaxed">
        This website is for informational purposes only and does not constitute
        legal advice. Contacting us does not create an attorney-client
        relationship.
      </p>
    </div>
  </div>
</section>


      {/* ================= Footer ================= */}
      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-white/50">
          © {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.
        </div>
      </footer>

      {/* ================= Team Detail Modal ================= */}
      {activeMember && (
        <div
          className="fixed inset-0 z-999 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setActiveMemberId(null)}
        >
          <div
            className="w-full max-w-2xl rounded-2xl border border-white/15 bg-[#0b0b0b] p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                {activeMember.avatar ? (
                  <Image
                    src={activeMember.avatar}
                    alt={activeMember.name}
                    width={80}
                    height={80}
                    className="h-20 w-20 rounded-md object-cover"
                  />
                ) : (
                  <div className="h-20 w-20 rounded-md bg-white/20" />
                )}

                <div>
                  <div className="text-xl font-semibold text-white">
                    {activeMember.name}
                  </div>
                  <div className="mt-1 text-sm text-[#C9A24B]">
                    {activeMember.role}
                  </div>
                </div>
              </div>

              <button
                className="rounded-lg border border-white/15 px-3 py-2 text-sm text-white/80 hover:border-[#C9A24B]/40"
                onClick={() => setActiveMemberId(null)}
              >
                Close
              </button>
            </div>

            <div className="mt-5 grid gap-3 text-sm text-white/80">
              {activeMember.email && activeMember.email.trim() !== "" && (
                <div>
                  <span className="font-medium text-white">Email:</span>{" "}
                  <a
                    href={`mailto:${activeMember.email}`}
                    className="text-[#C9A24B] underline"
                  >
                    {activeMember.email}
                  </a>
                </div>
              )}

              {activeMember.phone && (
                <div>
                  <span className="font-medium text-white">Phone:</span>{" "}
                  <a
                    href={`tel:${activeMember.phone}`}
                    className="text-[#C9A24B] underline"
                  >
                    {activeMember.phone}
                  </a>
                </div>
              )}

              {activeMember.website && (
                <div>
                  <span className="font-medium text-white">Website:</span>{" "}
                  <a
                    href={activeMember.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#C9A24B] underline"
                  >
                    {activeMember.website}
                  </a>
                </div>
              )}

              {activeMember.address && (
                <div>
                  <span className="font-medium text-white">Address:</span>{" "}
                  {activeMember.address}
                </div>
              )}

              {activeMember.license && (
                <div>
                  <span className="font-medium text-white">License:</span>{" "}
                  {activeMember.license}
                </div>
              )}

              <div className="mt-2 rounded-xl border border-white/10 bg-white/5 p-4 leading-relaxed">
                {activeMember.bio}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
