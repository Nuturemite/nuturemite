import {
  AiOutlineHome,
  AiOutlineFacebook,
  AiOutlineInstagram,
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineTwitter,
  AiOutlineYoutube,
  AiOutlineLinkedin,
} from "react-icons/ai";
const iconList = [
  {
    icon: AiOutlineHome,
    path: "/",
  },
  {
    icon: AiOutlineFacebook,
    path: "https://facebook.com/nuturemite",
  },
  {
    icon: AiOutlineInstagram,
    path: "https://www.instagram.com/nuturemite_blog",
  },
  {
    icon: AiOutlineTwitter,
    path: "https://twitter.com/nuturemite",
  },
  {
    icon: AiOutlineYoutube,
    path: "https://www.youtube.com/c/Nuturemitehealth",
  },
  {
    icon: AiOutlineLinkedin,
    path: "https://www.linkedin.com/company/nuturemite",
  },
];

export function Header() {
  return (
    <header className="relative bg-white flex flex-row lg:flex-row items-center justify-between px-5 md:px-12 py-2 h-[7vh]">
      <div className="flex max-sm:justify-between flex-row md:items-center md:gap-5 md:w-full ">
        <a href="tel:9675905075" className="flex gap-1 items-center text-sm md:text-sm">
          <AiOutlinePhone size={24}/>
          +91 891 999 3233
        </a>
        <a
          href="mailto:salesnuturemite@gmail.com"
          className="flex gap-1 items-center text-sm md:text-sm"
        >
          <AiOutlineMail size={24}/>
          info@nuturemite.com
        </a>
      </div>

      <div className="hidden md:flex list-none items-center justify-between gap-3">
        {iconList.map(item => (
          <li key={item.path}>
            <a href={item.path} target="_blank" rel="noreferrer">
              <item.icon size={24}/>
            </a>
          </li>
        ))}
      </div>
    </header>
  );
}
