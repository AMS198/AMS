import React from 'react';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#080D1A] pt-32 pb-20 selection-orange relative">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-custom relative z-10 max-w-4xl">
        <div className="mb-12">
          <div className="section-label mb-4">Legal Information</div>
          <h1 className="font-display font-black text-white text-4xl sm:text-5xl lg:text-6xl mb-6">
            Privacy <span className="text-gradient">Policy</span>
          </h1>
          <p className="text-slate-400 text-lg">
            Last Updated: {new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
          </p>
        </div>

        <div className="prose prose-invert prose-orange max-w-none 
                        prose-headings:font-display prose-headings:font-bold
                        prose-h2:text-3xl prose-h2:text-white prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-b prose-h2:border-[#1E2D45] prose-h2:pb-4
                        prose-h3:text-xl prose-h3:text-orange-100 prose-h3:mt-8
                        prose-p:text-slate-400 prose-p:leading-relaxed prose-p:mb-6
                        prose-li:text-slate-400
                        bg-[#0B1120] border border-[#1E2D45] p-8 md:p-12 rounded-2xl shadow-2xl">
          
          <p>
            At <strong>AMS Civil Construction</strong> (referred to as "we", "us", or "our"), accessible from 
            <Link href="/" className="text-orange-400 hover:underline mx-1">amscivilwork.in</Link>, 
            one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of 
            information that is collected and recorded by us and how we use it.
          </p>
          <p>
            If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.
          </p>

          <h2>1. Information We Collect</h2>
          <p>
            The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.
          </p>
          <ul>
            <li><strong>Contact Forms:</strong> When you request a quote or contact us, we collect your name, email address, phone number, location, and details of your construction project.</li>
            <li><strong>Log Files:</strong> Like many other websites, we use log files. These files log visitors when they visit sites. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable.</li>
            <li><strong>Cookies:</strong> Like any other website, AMS Civil Construction uses "cookies". These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited.</li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>We use the information we collect in various ways, including to:</p>
          <ul>
            <li>Provide, operate, and maintain our website and business.</li>
            <li>Improve, personalize, and expand our website.</li>
            <li>Understand and analyze how you use our website.</li>
            <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with quotes, updates, and other information relating to your civil project.</li>
            <li>Send you emails or SMS related to your project status.</li>
            <li>Find and prevent fraud and spam (through invisible reCAPTCHA/Honeypot mechanisms).</li>
          </ul>

          <h2>3. Third-Party Advertising and Links</h2>
          <p>
            Our website may use third-party advertising companies to serve ads when you visit our website (e.g. Google AdSense, Adsterra). These companies may use information (not including your name, address, email address, or telephone number) about your visits to this and other websites in order to provide advertisements about goods and services of interest to you.
          </p>
          <p>
            Our Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information.
          </p>

          <h2>4. Data Security</h2>
          <p>
            We value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. However, remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security.
          </p>

          <h2>5. Children's Information</h2>
          <p>
            Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.
            AMS Civil Construction does not knowingly collect any Personal Identifiable Information from children under the age of 13.
          </p>

          <h2>6. Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. Thus, we advise you to review this page periodically for any changes. We will notify you of any changes by posting the new Privacy Policy on this page. These changes are effective immediately, after they are posted on this page.
          </p>

          <h2 id="dpdp">7. Digital Personal Data Protection (DPDP) Act, 2023 Compliance</h2>
          <p>
            AMS Civil Construction is fully committed to complying with the <strong>Digital Personal Data Protection (DPDP) Act, 2023</strong> of India. We respect your digital privacy and ensure that any personal data you share with us is handled with the utmost security, transparency, and strictly for the purpose it was collected.
          </p>
          
          <h3>7.1 Consent & Purpose of Data Collection</h3>
          <p>
            By checking the consent box on our forms (Contact Us, Get Quote, Cost Calculator, Lead Generation), you provide us with explicit, verifiable consent to collect and process your personal data (such as Name, Phone Number, Email, and Location). 
            This data is used <strong>exclusively</strong> for:
          </p>
          <ul>
            <li>Providing accurate civil construction and renovation estimates.</li>
            <li>Contacting you to schedule site visits.</li>
            <li>Sharing project updates, invoices, and architectural drawings.</li>
            <li>Sending critical communications related to your inquiry.</li>
          </ul>
          <p>We do <strong>not</strong> sell, rent, or illegally share your personal data with third-party marketing agencies.</p>

          <h3>7.2 Your Rights Under the DPDP Act</h3>
          <p>As a Data Principal (the user), the DPDP Act grants you specific rights over your personal data. You have the right to:</p>
          <ul>
            <li><strong>Right to Access:</strong> You can request a summary of the personal data we hold about you and the processing activities undertaken by us.</li>
            <li><strong>Right to Correction:</strong> You can request us to correct any inaccurate or misleading personal data we have on file.</li>
            <li><strong>Right to Erasure (Right to be Forgotten):</strong> You can request the complete deletion of your personal data when it is no longer required for the purpose it was collected, or if you withdraw your consent.</li>
            <li><strong>Right to Withdraw Consent:</strong> You have the right to withdraw your previously given consent at any time. Upon withdrawal, we will cease processing your data within a reasonable timeframe.</li>
            <li><strong>Right to Grievance Redressal:</strong> You have the right to raise any privacy concerns or complaints regarding your data.</li>
          </ul>

          <h3>7.3 How to Exercise Your Rights (Data Protection Officer)</h3>
          <p>
            To exercise any of your rights under the DPDP Act (such as withdrawing consent or requesting data deletion), please contact our designated <strong>Data Protection / Grievance Officer</strong>:
          </p>
          <div className="bg-orange-500/10 border border-orange-500/20 p-4 rounded-xl my-4">
            <p className="mb-1 font-bold text-white">Grievance Officer: Nitesh Mandal</p>
            <p className="mb-1">Email: <a href="mailto:ams.constructionwork@gmail.com" className="text-orange-400 hover:underline">ams.constructionwork@gmail.com</a></p>
            <p className="mb-0">Phone: <a href="tel:+918779391690" className="text-orange-400 hover:underline">+91 87793 91690</a></p>
          </div>
          <p>
            We are committed to resolving any data-related grievances promptly and within the timeframe stipulated by Indian law.
          </p>

          <h2>8. Contact Us</h2>
          <p>
            If you have any questions or suggestions about our Privacy Policy or your data rights, do not hesitate to contact us.
          </p>
          <ul>
            <li><strong>Email:</strong> <a href="mailto:ams.constructionwork@gmail.com" className="text-orange-400 hover:underline">ams.constructionwork@gmail.com</a></li>
            <li><strong>Phone:</strong> <a href="tel:+918779391690" className="text-orange-400 hover:underline">+91 87793 91690</a></li>
            <li><strong>Address:</strong> Mumbai, Maharashtra, India</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
