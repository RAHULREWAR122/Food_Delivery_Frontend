import React from 'react';
import { NavLink } from 'react-router';

function Home() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="bg-green-500 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl font-bold">Welcome to Food Delivery System</h1>
          <p className="mt-4 text-lg">
            Organize your meals, track inventory, and discover new recipes all in one place.
          </p>
          <br /><br />
          <NavLink to={'/menu'} className=" bg-white text-green-500 px-6 py-3 rounded-md font-semibold shadow-md hover:bg-gray-100 transition">
            Get Started
          </NavLink>
        </div>
      </div>
      <div className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">What We Offer</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 shadow-md rounded-lg hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-green-500">Meal Planning</h3>
              <p className="mt-2 text-gray-700">Plan your meals for the week and stay organized.</p>
            </div>
            <div className="bg-white p-6 shadow-md rounded-lg hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-green-500">Inventory Management</h3>
              <p className="mt-2 text-gray-700">
                Keep track of your pantry, fridge, and freezer inventory.
              </p>
            </div>
            <div className="bg-white p-6 shadow-md rounded-lg hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-green-500">Recipe Discovery</h3>
              <p className="mt-2 text-gray-700">
                Find and save recipes that match your preferences and available ingredients.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-green-50 py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-green-600">Ready to Simplify Your Kitchen?</h2>
          <p className="mt-4 text-gray-600">
            Join thousands of users who are making their food management seamless and stress-free.
          </p>
          <br /><br />
          <NavLink to={'/register'} className="mt-6 bg-green-500 text-white px-8 py-4 rounded-md font-semibold shadow-md hover:bg-green-600 transition">
            Sign Up Now
          </NavLink>
        </div>
      </div>
      <footer className="bg-gray-800 text-gray-200 py-8">
        <div className="max-w-6xl mx-auto text-center">
          <p>© {new Date().getFullYear()} Food Manager. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
