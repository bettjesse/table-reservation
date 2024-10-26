import { useState, useEffect } from "react";


import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { setReservationData } from "../slices/reservationSlice";
import {
  AiOutlineClose,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
} from "react-icons/ai";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../index.css";
import ConfirmReservation from "./ConfirmReservation";

const CreateReservation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(0);

  const [activeSection, setActiveSection] = useState("popular");
  const [showMenuOption, setShowMenuOption] = useState("");

  const [galleryOpen, setGalleryOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const today = new Date()

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleCreateReservation = async (e) => {
    e.preventDefault();
console.log("i clicked the button")
    if (!userInfo) {
      

      // Redirect to login page
 navigate("/login");
      return;
    }

     if (!date) {
    alert("Please select a date.");
    return;
  }

  if (!time) {
    alert("Please select a time.");
    return;
  }

  const now = new Date();
  const selectedDateTime = new Date(date);
  selectedDateTime.setHours(time.getHours(), time.getMinutes());

  if (selectedDateTime < now) {
    alert("The reservation time must be in the future.");
    return;
  }

  if (numberOfGuests <= 0) {
    alert("Please enter a valid number of guests.");
    return;
  }
      const  reservationData = {
        date,
        time,
        numberOfGuests,
      };
      // localStorage.setItem("reservationData", JSON.stringify(reservationData));

   dispatch(setReservationData(  reservationData))
navigate("/confirm")
      // Reset the form fields
      setDate("");
      setTime("");
      setNumberOfGuests(0);
    
  };

  const scrollToSection = (section) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  const handleMenuOptionClick = (menuOption) => {
    setShowMenuOption(menuOption);
  };
  const galleryImages = [
    "/images/cocktaill.jpg",
    "/images/dish2.jpg",
    "/images/burger.jpg",
    "/images/gallery1.jpg",
    "/images/gallery2.jpg",
    "/images/gallery3.jpg",
    "/images/food-1.jpg",
    "/images/food-2.jpg",
    "/images/food-3.jpg",
    "/images/food-1.jpg",
    // Add more image URLs here
  ];
  const openGallery = (image) => {
    setCurrentImage(image);
    setGalleryOpen(true);
  };

  const closeGallery = () => {
    setGalleryOpen(false);
  };

  const loadMoreImages = () => {
    // Logic to load more images goes here
    console.log("Load more images");
  };

  const scrollToNextImage = () => {
    if (currentImageIndex < galleryImages.length - 1) {
      setCurrentImage(galleryImages[currentImageIndex + 1]);
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const scrollToPreviousImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImage(galleryImages[currentImageIndex - 1]);
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  // const  reservationData = {
  //   date:date,
  //   time: time,
  //   numberOfGuests: numberOfGuests,
  // };
  const activeColor = "#941C2F";
  function formatTime(time) {
    const options = { hour: "numeric", minute: "2-digit", hour12: true };
    return time.toLocaleTimeString([], options).replace(/^0(\d+)/, "$1");
  }

  return (
    <div className="">
      {/* Image */}
      <div className="overflow-hidden">
        <img
          src="images/dish.jpg"
          alt="Restaurant Image"
          className="w-full h-64 object-cover px-0 mx-0"
        />
      </div>
      <div className="px-4">
        {/* Sticky Menu/Navbar */}
        <nav className="sticky top-0 bg-white shadow-md py-4">
          <ul className="flex space-x-4" style={{ padding: "0 10px" }}>
            <li
              className={`cursor-pointer  ${
                activeSection === "popular" ? "active" : ""
              }`}
              onClick={() => scrollToSection("popular")}
            >
              Popular Dishes
            </li>
            <li
              className={`cursor-pointer ${
                activeSection === "gallery" ? "active" : ""
              }`}
              onClick={() => scrollToSection("gallery")}
            >
              Gallery
            </li>
            <li
              className={`cursor-pointer ${
                activeSection === "menu" ? "active" : ""
              }`}
              onClick={() => scrollToSection("menu")}
            >
              Menu
            </li>
          </ul>
        </nav>

        <div className="flex flex-wrap mx-auto">
          <div className="w-full lg:w-2/3 pr-4">
            {/* Additional Content */}
            <section id="popular" className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-blue-200">
                Popular Dishes
              </h2>
              <hr className="mb-4" />

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {/* Card 1 */}
                <div className="popular-card">
                  <h3 className="font-bold mb-2">Tiger Fries</h3>
                  <p className="text-gray-600">
                    Brie Housemade Blueberry Preserves Green Apple Honey Dijon
                    Brioche
                  </p>
                  <p className="text-gray-400 mt-2">Continue reading...</p>
                </div>

                {/* Card 2 */}
                <div className="popular-card">
                  <h3 className="font-bold mb-2">Sushi Rolls</h3>
                  <p className="text-gray-600">
                    Freshly prepared sushi rolls with a variety of fillings and
                    flavors.
                  </p>
                  <p className="text-gray-400 mt-2">Continue reading...</p>
                </div>

                {/* Card 3 */}
                <div className="popular-card">
                  <h3 className="font-bold mb-2">Grilled Steak</h3>
                  <p className="text-gray-600">
                    Tender and juicy grilled steak served with a side of roasted
                    vegetables.
                  </p>
                  <p className="text-gray-400 mt-2">Continue reading...</p>
                </div>

                {/* Add more cards as needed */}
              </div>
            </section>

            <section id="gallery" className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-blue-200">
                Photo Gallery
              </h2>
              <div className="grid grid-cols-3 gap-4">
                {galleryImages.slice(0, 6).map((image, index) => (
                  <div className="gallery-item" key={index}>
                    <img
                      src={image}
                      alt="Restaurant"
                      onClick={() => openGallery(image, index)}
                      className="cursor-pointer"
                    />
                  </div>
                ))}
                {galleryImages.length > 6 && (
                  <div className="gallery-item col-span-3">
                    <button
                      onClick={loadMoreImages}
                      className="p-2 bg-white text-gray-500"
                    >
                      + {galleryImages.length - 6} more pictures
                    </button>
                  </div>
                )}
              </div>
              {galleryOpen && (
                <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-900 bg-opacity-75">
                  <div className="max-w-2xl mx-auto relative gallery-modal">
                    <span
                      onClick={closeGallery}
                      className="absolute top-4 right-4 p-2 bg-white rounded-full text-gray-500 cursor-pointer"
                    >
                      <AiOutlineClose />
                    </span>
                    <div className="flex justify-center items-center">
                      <button
                        onClick={scrollToPreviousImage}
                        className="p-2 bg-white rounded-full text-gray-500"
                        disabled={currentImageIndex === 0}
                      >
                        <AiOutlineArrowLeft />
                      </button>
                      <img
                        src={currentImage}
                        alt="Restaurant"
                        className="mx-4"
                      />
                      <button
                        onClick={scrollToNextImage}
                        className="p-2 bg-white rounded-full text-gray-500"
                        disabled={
                          currentImageIndex === galleryImages.length - 1
                        }
                      >
                        <AiOutlineArrowRight />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </section>

            <section id="menu" className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-blue-200">Menu</h2>
              {/* Menu Navbar */}
              <nav className="sticky top-0 bg-white shadow-md p-4">
                <ul className="flex flex-wrap space-x-2 sm:space-x-4">
                  <li
                    className={`nav-item ${
                      showMenuOption === "drinks" ? "active" : ""
                    }`}
                  >
                    <span
                      className={`cursor-pointer ${
                        showMenuOption === "drinks" ? "font-bold" : ""
                      }`}
                      onClick={() => handleMenuOptionClick("drinks")}
                    >
                      Drinks
                    </span>
                  </li>
                  <li
                    className={`nav-item ${
                      showMenuOption === "dishes" ? "active" : ""
                    }`}
                  >
                    <span
                      className={`cursor-pointer ${
                        showMenuOption === "dishes" ? "font-bold" : ""
                      }`}
                      onClick={() => handleMenuOptionClick("dishes")}
                    >
                      Dishes
                    </span>
                  </li>
                  <li
                    className={`nav-item ${
                      showMenuOption === "sides" ? "active" : ""
                    }`}
                  >
                    <span
                      className={`cursor-pointer ${
                        showMenuOption === "sides" ? "font-bold" : ""
                      }`}
                      onClick={() => handleMenuOptionClick("sides")}
                    >
                      Sides
                    </span>
                  </li>
                  <li
                    className={`nav-item ${
                      showMenuOption === "salads" ? "active" : ""
                    }`}
                  >
                    <span
                      className={`cursor-pointer ${
                        showMenuOption === "salads" ? "font-bold" : ""
                      }`}
                      onClick={() => handleMenuOptionClick("salads")}
                    >
                      Salads
                    </span>
                  </li>
                  <li
                    className={`nav-item ${
                      showMenuOption === "desserts" ? "active" : ""
                    }`}
                  >
                    <span
                      className={`cursor-pointer ${
                        showMenuOption === "desserts" ? "font-bold" : ""
                      }`}
                      onClick={() => handleMenuOptionClick("desserts")}
                    >
                      Desserts
                    </span>
                  </li>
                </ul>
              </nav>

              {/* Menu Options */}
              <div className="flex flex-wrap">
                <div
                  className={`w-full ${
                    showMenuOption !== "drinks" ? "hidden" : ""
                  }`}
                >
                  {/* Drinks */}
                  <h3 className="text-lg font-bold mb-2 menu-item-heading">
                    Drinks
                  </h3>
                  {/* Add drink items */}
                </div>
                <div
                  className={`w-full ${
                    showMenuOption !== "dishes" ? "hidden" : ""
                  }`}
                >
                  {/* Dishes */}
                  <h3 className="text-lg font-bold mb-2 menu-item-heading">
                    Dishes
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {/* First column of dishes */}
                    <div>
                      <div className="menu-item">
                        <p className="font-bold">
                          Spaghetti Bolognese{" "}
                          <span className="text-right ml-auto">$9.99</span>
                        </p>
                        <p className="text-gray-600">
                          Classic Italian pasta dish with meat sauce
                        </p>
                      </div>
                      {/* Add more dish items for the first column */}
                    </div>
                    {/* Second column of dishes */}
                    <div>
                      <div className="menu-item">
                        <p className="font-bold">
                          Chicken Parmesan{" "}
                          <span className="text-right ml-auto">$12.99</span>
                        </p>
                        <p className="text-gray-600">
                          Breaded chicken cutlet topped with marinara sauce and
                          cheese
                        </p>
                      </div>
                      {/* Add more dish items for the second column */}
                    </div>
                  </div>
                </div>
                <div
                  className={`w-full ${
                    showMenuOption !== "sides" ? "hidden" : ""
                  }`}
                >
                  {/* Sides */}
                  <h3 className="text-lg font-bold mb-2 menu-item-heading">
                    Sides
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {/* First column of sides */}
                    <div>
                      <div className="menu-item">
                        <p className="font-bold">
                          French Fries{" "}
                          <span className="text-right ml-auto">$3.99</span>
                        </p>
                        <p className="text-gray-600">Crispy golden fries</p>
                      </div>
                      {/* Add more side items for the first column */}
                    </div>
                    {/* Second column of sides */}
                    <div>
                      <div className="menu-item">
                        <p className="font-bold">
                          Onion Rings{" "}
                          <span className="text-right ml-auto">$4.99</span>
                        </p>
                        <p className="text-gray-600">
                          Breaded and deep-fried onion rings
                        </p>
                      </div>
                      {/* Add more side items for the second column */}
                    </div>
                  </div>
                </div>
                <div
                  className={`w-full ${
                    showMenuOption !== "salads" ? "hidden" : ""
                  }`}
                >
                  {/* Salads */}
                  <h3 className="text-lg font-bold mb-2 menu-item-heading">
                    Salads
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {/* First column of salads */}
                    <div className="menu-item">
                      <p className="font-bold">
                        Caesar Salad{" "}
                        <span className="text-right ml-auto">$6.99</span>
                      </p>
                      <p className="text-gray-600">
                        Romaine lettuce, croutons, Parmesan cheese, and Caesar
                        dressing
                      </p>
                    </div>
                    {/* Add more salad items for the first column */}
                    {/* Second column of salads */}
                    <div className="menu-item">
                      <p className="font-bold">
                        Greek Salad{" "}
                        <span className="text-right ml-auto">$7.99</span>
                      </p>
                      <p className="text-gray-600">
                        Mixed greens, tomatoes, cucumbers, olives, feta cheese,
                        and Greek dressing
                      </p>
                    </div>
                    {/* Add more salad items for the second column */}
                  </div>
                </div>
                <div
                  className={`w-full ${
                    showMenuOption !== "desserts" ? "hidden" : ""
                  }`}
                >
                  {/* Desserts */}
                  <h3 className="text-lg font-bold mb-2 menu-item-heading">
                    Desserts
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {/* First column of desserts */}
                    <div className="menu-item">
                      <p className="font-bold">
                        Cheesecake{" "}
                        <span className="text-right ml-auto">$5.99</span>
                      </p>
                      <p className="text-gray-600">
                        Creamy New York-style cheesecake
                      </p>
                    </div>
                    {/* Add more dessert items for the first column */}
                    {/* Second column of desserts */}
                    <div className="menu-item">
                      <p className="font-bold">
                        Chocolate Brownie{" "}
                        <span className="text-right ml-auto">$4.99</span>
                      </p>
                      <p className="text-gray-600">
                        Warm chocolate brownie with a scoop of vanilla ice cream
                      </p>
                    </div>
                    {/* Add more dessert items for the second column */}
                  </div>
                </div>
              </div>
            </section>
          </div>
          {/* Right Section */}
          <div className="w-full lg:w-1/3">
            {/* Reservation Form Modal */}
            <div className="sticky top-0">
              <div className="bg-white rounded-md shadow-md p-6">
                <h1
                  className="text-2xl font-bold mb-4"
                  style={{ color: "#941C2F" }}
                >
                  Create Reservation
                </h1>
                <form onSubmit={handleCreateReservation}>
                  {/* Date */}
                  <div className="mb-4">
                    <label
                      htmlFor="date"
                      className="block text-gray-700 font-bold mb-2"
                    >
                      Date:
                    </label>
                    <DatePicker
                      id="date"
                      selected={date}
                      onChange={(date) => setDate(date)}
                      className="w-full border-none border-b-2 border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
                      placeholderText="Select date"
                      dateFormat="yyyy-MM-dd"
                      minDate={today}
                    />
                  </div>

                  {/* Time */}
                  <div className="mb-4">
                    <label
                      htmlFor="time"
                      className="block text-gray-700 font-bold mb-2"
                    >
                      Time:
                    </label>
                    <DatePicker
                      id="time"
                      selected={time}
                      onChange={(time) => setTime(time)}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={15}
                      dateFormat="h:mm aa"
                      className="w-full border-none border-b-2 border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
                      placeholderText="Select time"
                    />
                  </div>

                  {/* Number of Guests */}
                  <div className="mb-4">
                    <label
                      htmlFor="numberOfGuests"
                      className="block text-gray-700 font-bold mb-2"
                    >
                      Number of Guests:
                    </label>
                    <input
                      type="number"
                      id="numberOfGuests"
                      value={numberOfGuests}
                      onChange={(e) => setNumberOfGuests(e.target.value)}
                      className="w-full border-none border-b-2 border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                  type="submit"
                    // onClick={openModal}
                    className=" text-white rounded-md px-4 py-2"
                    style={{ backgroundColor: "#03191E" }}
                  >
                    Book Table at {time ? formatTime(time) : ""}
                  </button>
                </form>
                {/* {isModalOpen && (
                  <ConfirmReservation
                    onClose={closeModal}
                    reservationData= { reservationData}
                    
                   
                  />
                )} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateReservation;
