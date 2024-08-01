export const metadata = {
  title: "DailyDocket",
  description: "",
};

export default async function Layout({ children }) {

  return (
    <div className="pt-2">
      <div>{children}</div>
    </div>
  );
}
