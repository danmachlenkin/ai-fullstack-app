import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

const Layout = ({ children }) => {
  const links = [
    { href: "/", lable: "Home" },
    { href: "/jurnal", lable: "Jurnal" },
    { href: "/history", lable: "History" },
  ];

  return (
    <div className="w-screen h-screen relative">
      <aside className="absolute left-0 top-0 h-full w-[200px] border-r border-black/10">
        <div>
          mood
          <ul>
            {links.map((link) => (
              <li key={link.lable} className="px-2 py-6 text-xl">
                <Link href={link.href}>{link.lable}</Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
      <div className=" ml-[200px]">
        <header className="h-[60px] border-b border-black/10">
          <div className="w-full h-full flex px-6 items-center justify-end">
            <UserButton />
          </div>
        </header>
        <div className="h-[calc(100vh-60px)]">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
