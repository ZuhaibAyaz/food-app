import React from 'react';

const FooterSection = ({ title, items }) => (
  <div className='pt-10'>
    <h2 className="py-3 font-bold text-[17px] leading-[20px] tracking-[-0.3px]">{title}</h2>
    <ul>
      {items.map((item, index) => (
        <li key={index} className="font-extralight text-[16px] leading-[19px] tracking-[-0.3px] text-gray-400 py-[8px]">
          {item}
        </li>
      ))}
    </ul>
  </div>
);

function Footer() {
  const companyItems = ["About", "Careers", "Team", "Swiggy One", "Swiggy Instamart", "Swiggy Game"];
  const contactItems = ["Help & Support", "Partner with us", "Ride with us"];
  const legalItems = ["Terms & Conditions", "Cookie Policy", "Privacy Policy", "Investor Relations"];
  const deliveryCities = ["Bangalore", "Gurgaon", "Hyderabad", "Delhi", "Mumbai", "Pune"];

  return (
    <div className='bg-[#02060C] text-white px-4 md:px-[237px] mt-[140px]'>
      {/* Swiggy logo section */}
      <div className='pt-10 w-full text-center md:w-[150px] mx-auto'>
        <div className='flex justify-center items-center gap-2'>
          <img src='./images/swiggylogo.png' alt="Swiggy Logo" className='w-[21px] h-[32px] filter brightness-0 invert' />
          <h1 className="text-lg font-bold leading-[28px] tracking-[-0.4px] py-[8px]">Swiggy</h1>
        </div>
        <p className='font-light text-[15px] leading-[19px] tracking-[-0.3px] text-gray-400 py-[8px]'>
          © 2024 Bundl Technologies Pvt. Ltd
        </p>
      </div>

      {/* Footer sections in 2 columns on small screens */}
      <div className='grid grid-cols-1 text-center sm:grid-cols-2 gap-6 md:grid-cols-4 md:gap-10 pt-10'>
        <FooterSection title="Company" items={companyItems} />
        
        {/* Combined Contact us and Legal section */}
       
          <FooterSection title="Contact us" items={contactItems} />
          <FooterSection title="Legal" items={legalItems} />
       

        <FooterSection title="We deliver to:" items={deliveryCities} />
      </div>
    </div>
  );
}

export default Footer;
