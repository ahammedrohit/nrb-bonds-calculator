
import { Navbar } from "@/components/Navbar/Navbar";
import { ReactNode } from "react";
import { Helmet } from "react-helmet-async";

interface NavLayoutProps {
  children?: ReactNode;
  title?: string;
  nav?: boolean;
}

export const NavLayout = ({ nav = true, ...props }: NavLayoutProps) => {
  return (
    <div>
      <Helmet>
        <title>{`Kwaski.tech ${props.title ? " | " + props.title : ""}`}</title>
      </Helmet>
      <div>
        <div className="flex flex-col bg-slate-100">
          {nav && <Navbar title={props.title} />}
          <div>
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
}