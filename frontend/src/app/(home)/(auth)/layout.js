export const metadata = {
  title: "Nuturemite",
  description: "",
};

export default async function Layout({ children }) {

  return (
    <div className="pt-2">
      <div>{children}</div>
    </div>
  );
}
