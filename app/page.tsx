import React from "react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Hero Section */}
      <section className="bg-orange-500 text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Book LPG Gas Cylinders Easily & Fast
        </h1>
        <p className="text-lg mb-6">
          Manage bookings, track delivery, and get instant support — all in one app.
        </p>
        <div className="space-x-4">
          <button className="bg-white text-orange-500 px-6 py-3 rounded-xl font-semibold">
            Get Started
          </button>
          <button className="border border-white px-6 py-3 rounded-xl">
            Download App
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-10">Why Choose Our App?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            "Easy Gas Booking",
            "Real-Time Delivery Tracking",
            "Secure Online Payment",
            "24/7 Customer Support",
            "Booking History",
            "Instant Notifications",
          ].map((feature, index) => (
            <div key={index} className="p-6 shadow-lg rounded-2xl">
              <h3 className="font-semibold text-lg">{feature}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-100 py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-10">How It Works</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {["Sign Up", "Enter Consumer No.", "Book Cylinder", "Track Delivery"].map(
            (step, index) => (
              <div key={index} className="p-6 bg-white shadow rounded-2xl">
                <p className="font-semibold">{step}</p>
              </div>
            )
          )}
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-10">Benefits</h2>
        <ul className="space-y-4">
          <li>✔ No long queues</li>
          <li>✔ Save time</li>
          <li>✔ Easy payments</li>
          <li>✔ Safe & reliable</li>
        </ul>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-100 py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-10">What Users Say</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-white rounded-2xl shadow">
            <p>"Very easy to book gas. Delivery tracking is awesome!"</p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow">
            <p>"Saved me time, no need to call agency."</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-orange-500 text-white py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Start Booking Your Gas Today!
        </h2>
        <button className="bg-white text-orange-500 px-6 py-3 rounded-xl font-semibold">
          Register Now
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-10 text-center">
        <p>© 2026 Gas Agency App. All rights reserved.</p>
      </footer>
    </div>
  );
}
