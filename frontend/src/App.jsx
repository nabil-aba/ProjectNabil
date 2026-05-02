import { Routes, Route } from "react-router-dom";

const pages = import.meta.glob("./pages/**/index.{js,jsx}", { eager: true });
// [id].js and [id].jsx for :id dynamic routes
const dynamicPages = import.meta.glob("./pages/**/[id].{js,jsx}", {
  eager: true,
});
function App() {
  return (
    <Routes>
      {Object.keys(pages).map((path) => {
        const Component = pages[path].default;
        const routePath = path
          .replace("./pages", "")
          .replace("/index.jsx", "")
          .replace("/index.js", "");
        return (
          <Route key={routePath} path={routePath} element={<Component />} />
        );
      })}
      {Object.keys(dynamicPages).map((path) => {
        const Component = dynamicPages[path].default;
        const routePath = path
          .replace("./pages", "")
          .replace("/[id].jsx", "/:id")
          .replace("/[id].js", "/:id");
        return (
          <Route key={routePath} path={routePath} element={<Component />} />
        );
      })}
      <Route path="*" element="404 Not Found" />
    </Routes>
  );
}

export default App;
