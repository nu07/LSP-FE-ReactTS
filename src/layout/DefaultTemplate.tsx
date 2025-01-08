import NavbarHome from "@/components/navbar/NavbarHome";
import DefaultFooter from "@/components/footer/DefaultFooter";

export default function DefaultTemplate({ children }: { children: any }) {
  return (
    <div className="bg-white">
      <NavbarHome />
      {children}
      <DefaultFooter />
    </div>
  );
}
