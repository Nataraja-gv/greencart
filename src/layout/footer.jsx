import React from "react";

const Footer = () => {
  return (
    <div className="bg-[#EAF4EE] text-[#1F2937] mt-[30px]">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
        <img
          src="https://greencart-gs.vercel.app/assets/logo-CMLzTNjw.svg"
          alt="Logo"
          className="w-[170px] h-auto cursor-pointer"
          onClick={() => (window.location.href = "/")}
        />
          <p className="mt-4 text-sm">
            We deliver fresh groceries and snacks straight to your door. Trusted by
            thousands, we aim to make your shopping experience simple and affordable.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#">Home</a></li>
            <li><a href="#">Best Sellers</a></li>
            <li><a href="#">Offers & Deals</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">FAQs</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Need help?</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#">Delivery Information</a></li>
            <li><a href="#">Return & Refund Policy</a></li>
            <li><a href="#">Payment Methods</a></li>
            <li><a href="#">Track your Order</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Follow Us</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#">Instagram</a></li>
            <li><a href="#">Twitter</a></li>
            <li><a href="#">Facebook</a></li>
            <li><a href="#">YouTube</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t text-center text-sm py-4">
        Copyright 2025 © Tech.dev All Right Reserved.
      </div>
    </div>
  );
};

export default Footer;
