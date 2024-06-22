export default function TopBarLoader() {
  return (
    <div className="w-full fixed z-999 top-0  ">
      <div className="h-1 w-full bg-black overflow-hidden">
        <div className="animate-progress w-full h-full bg-white origin-left-right" />
      </div>
    </div>
  );
}
