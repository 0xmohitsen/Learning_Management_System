import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";

function Footer() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();

  return (
    <>
      <footer className="relative bottom-0 left-0 flex h-[15vh] flex-col items-center justify-between bg-gray-900 py-5 text-white sm:h-[10vh] sm:flex-row sm:px-20 sm:pb-2">
        <section>Copyright {year} | All rights reserved</section>
        <section className="flex items-center justify-center gap-5 text-2xl text-white">
          <a className="transition-all duration-300 ease-in-out hover:text-yellow-500">
            <BsFacebook />
          </a>
          <a className="transition-all duration-300 ease-in-out hover:text-yellow-500">
            <BsInstagram />
          </a>
          <a className="transition-all duration-300 ease-in-out hover:text-yellow-500">
            <BsLinkedin />
          </a>
          <a className="transition-all duration-300 ease-in-out hover:text-yellow-500">
            <BsTwitter />
          </a>
        </section>
      </footer>
    </>
  );
}
export default Footer;
