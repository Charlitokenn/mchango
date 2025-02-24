import { Action, Authenticated, IResourceItem, Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  AuthPage,
  ErrorComponent,
  ThemedLayoutV2,
  ThemedSiderV2,
  useNotificationProvider,
} from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import { dataProvider, liveProvider } from "@refinedev/supabase";
import { App as AntdApp, ConfigProvider, Image } from "antd";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import authProvider from "./authProvider";
import { Header } from "./components/header";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { supabaseClient } from "./utility";
import { resources } from "./config/resources";
import { Home } from "./pages/home";
import { Messaging } from "./pages/sms";
import { Events } from "./pages/events";
import { toProperCase } from "./utility/propercase";
import { customTheme } from "./constants/custom-theme";
import OnboardingModalWizard from "./components/onboarding/onboarding";
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://60168ce3a70dfef398ac6ff497925739@o4507574821060608.ingest.de.sentry.io/4508874474848336",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  // Tracing
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

const customTitleHandler = ({ resource, action, params }:{resource?: IResourceItem,action?: Action,params?: Record<string, string | undefined>;}) => {
  let title = "Mchango App"; // Default title

  if (resource && action) {
      title = `${toProperCase(resource.name)} | Mchango App`;
      if (params?.id) {
          title += ` - ${params.id}`;
      }
  }
  return title;
};

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <AntdApp>
            <DevtoolsProvider>
              {/* <ConfigProvider theme={customTheme}> */}
                <Refine
                  dataProvider={dataProvider(supabaseClient)}
                  liveProvider={liveProvider(supabaseClient)}
                  authProvider={authProvider}
                  routerProvider={routerBindings}
                  notificationProvider={useNotificationProvider}
                  resources={resources}
                  options={{
                    syncWithLocation: true,
                    warnWhenUnsavedChanges: true,
                    useNewQueryKeys: true,
                    projectId: "kLWGIN-aQb8lW-jQLoxh",
                    title: { text: "Mchango App", icon: <Image src="/logo.png"/> },
                    liveMode: "auto",
                  }}
                >
                  <Routes>
                  <Route
                        element={
                          <Authenticated
                            key="authenticated-inner"
                            fallback={<CatchAllNavigate to="/login" />}
                          >
                            <ThemedLayoutV2
                              Header={Header}
                              Sider={(props) => <ThemedSiderV2 {...props} fixed />}
                            >
                              <Outlet />
                            </ThemedLayoutV2>
                            <OnboardingModalWizard/>
                          </Authenticated>
                        }
                      >
                        <Route index element={<Home />}></Route>
                        <Route path="/sms" element={<Messaging />}></Route>
                        <Route path="/events" element={<Events />}></Route>
                        <Route path="*" element={<ErrorComponent />} />
                      </Route>
                    <Route
                      element={
                        <Authenticated
                          key="authenticated-outer"
                          fallback={<Outlet />}
                        >
                          <NavigateToResource />
                        </Authenticated>
                      }
                    >
                      <Route
                        path="/login"
                        element={
                          <AuthPage
                            type="login"
                            formProps={{
                              initialValues: {
                                email: "test@gmail.com",
                                password: "12345678",
                              },
                            }}
                          />
                        }
                      />
                      <Route
                        path="/register"
                        element={<AuthPage type="register" />}
                      />
                      <Route
                        path="/forgot-password"
                        element={<AuthPage type="forgotPassword" />}
                      />
                    </Route>
                  </Routes>

                  <RefineKbar />
                  <UnsavedChangesNotifier />
                  <DocumentTitleHandler handler={customTitleHandler}/>
                </Refine>
              {/* </ConfigProvider> */}
              <DevtoolsPanel />
            </DevtoolsProvider>
          </AntdApp>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
