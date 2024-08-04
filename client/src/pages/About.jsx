// AboutUs.js
import Footer from "../components/Footer.jsx";

function AboutUs() {
  return (
    <div>
      <div className="max-w-6xl mx-auto p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">About Us</h1>
        <p className="text-lg text-gray-700 mb-8">
          At Construction Gear, we provide a platform for individuals and
          businesses in the construction industry to connect with each other.
          Our mission is to simplify the process of renting and listing
          construction machinery and equipment.
        </p>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Services</h2>
        <ul className="list-disc pl-6 text-lg text-gray-700 mb-8">
          <li>
            List your Machinery: If you own construction machinery or equipment,
            you can easily list it on our platform. Simply create an account,
            add details about your machinery, and reach potential renters in
            need.
          </li>
          <li>
            Find Machinery: If you're in need of construction machinery or
            equipment, you can browse through our listings to find the perfect
            match for your project. Our platform allows you to filter listings
            based on your specific requirements.
          </li>
          <li>
            Connect with Renters: Our platform facilitates communication between
            renters and machinery owners. Once you find a listing that meets
            your needs, you can easily contact the owner to discuss rental terms
            and availability.
          </li>
        </ul>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Workforce Solutions
        </h2>
        <p className="text-lg text-gray-700 mb-8">
          At Construction Gear, we understand that having the right workforce is
          just as important as having the right equipment. That's why we also
          provide a platform for construction professionals to connect with job
          opportunities. Whether you are a contractor looking for skilled labor
          or a worker seeking employment in the construction industry, our
          platform can help you find the right match.
        </p>
        <ul className="list-disc pl-6 text-lg text-gray-700 mb-8">
         
          <li>
            Find Jobs: If you are a construction worker looking for employment,
            you can browse through our job listings to find opportunities that
            match your skills and experience. Apply directly through our
            platform and connect with potential employers.
          </li>
          <li>
            Connect with Professionals: Our platform makes it easy for employers
            and job seekers to communicate. Discuss job details, arrange
            interviews, and find the perfect fit for your team or your next job.
          </li>
        </ul>
        <p className="text-lg text-gray-700 mb-8">
          Whether you're a contractor in need of skilled labor or a construction
          professional seeking new opportunities, Construction Gear is here to
          support you. Join our community today and find the workforce solutions
          you need to succeed in the construction industry.
        </p>
      </div>
      <Footer />
    </div>
  );
}

export default AboutUs;
