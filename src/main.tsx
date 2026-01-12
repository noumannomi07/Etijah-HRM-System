// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import App from "./App.jsx";
// import "./index.css";
// import AosAnimation from "./components/AosAnimation/AosAnimation.js";
// import { LanguageProvider } from "./Website/Shared/LanguagesDropMenu/LanguageContext.js";
// import React from "react";
// import { QueryClientProvider } from "@tanstack/react-query";
// import { queryClient } from "./utils/queryClient.js";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";


// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <LanguageProvider>
//       <QueryClientProvider client={queryClient}>
//         <AosAnimation>
//           <ReactQueryDevtools />
//           <App />
//         </AosAnimation>
//       </QueryClientProvider>
//     </LanguageProvider>
//   </StrictMode>
// );





import React,{ StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { lazy, Suspense } from "react";
import "./index.css";
import { LanguageProvider } from "./Website/Shared/LanguagesDropMenu/LanguageContext.js";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./utils/queryClient.js";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Loading from "@/components/loading";

const App = lazy(() => import("./App.jsx"));
const AosAnimation = lazy(() => import("./components/AosAnimation/AosAnimation.js"));

const root = document.getElementById("root") as HTMLElement;
createRoot(root).render(
  <StrictMode>
    <LanguageProvider>
      <QueryClientProvider client={queryClient}>
        {process.env.NODE_ENV !== "production" && <ReactQueryDevtools />}
        <Suspense fallback={<Loading />}>
          <AosAnimation>
            <App />
          </AosAnimation>
        </Suspense>
      </QueryClientProvider>
    </LanguageProvider>
  </StrictMode>
);


// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <LanguageProvider>
//       <QueryClientProvider client={queryClient}>
//         {process.env.NODE_ENV !== 'production' && <ReactQueryDevtools />}
//         <Suspense fallback={<Loading />}>
//           <AosAnimation>
//             <App />
//           </AosAnimation>
//         </Suspense>
//       </QueryClientProvider>
//     </LanguageProvider>
//   </StrictMode>
// );
