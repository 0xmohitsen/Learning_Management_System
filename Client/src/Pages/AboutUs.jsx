import aboutMainImage from "../Assets/Images/aboutMainImage.png";
import CarouselSlide from "../Compontents/CarouselSlide";
import { celebrities } from "../Constants/CelebrityData";
import HomeLayout from "../Layouts/HomeLayout";

function AboutUs() {
  return (
    <HomeLayout>
      <div className="flex min-h-[90vh] flex-col pt-20 text-white lg:pl-20">
        <div className="mx-10 flex flex-col items-center gap-5 lg:flex-row">
          <section className="space-y-10 lg:w-1/2">
            <h1 className="text-5xl font-semibold text-yellow-500">
              Affordable and quality education
            </h1>
            <p className="text-xl text-gray-200">
              Our goal is to provide afoordable quality education to the world ,
              we are providing the platform for the aspiring teachers and
              students to share their skills , creativity and knowledge to each
              other to empower and contribute in the growth and wellness of
              mankind.
            </p>
          </section>
          <div className="lg:w-1/2">
            <img
              id="test1"
              style={{
                filter: "drop-shadow(0px 10px 10px rgb(0,0,0));",
              }}
              alt="about main image"
              className="drop-shadow-2xl"
              src={aboutMainImage}
            />
          </div>
        </div>

        <div className="carousel m-auto my-16 w-[80vw] lg:w-1/2">
          {celebrities &&
            celebrities.map((celebrity) => (
              <CarouselSlide
                {...celebrity}
                key={celebrity.slideNumber}
                totalSlides={celebrities.length}
              />
            ))}
        </div>
      </div>
    </HomeLayout>
  );
}
export default AboutUs;
