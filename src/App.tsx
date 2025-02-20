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
import { Profile } from "./pages/profile";
import { toProperCase } from "./utility/propercase";
import { customTheme } from "./constants/custom-theme";
import OnboardingModalWizard from "./components/onboarding/onboarding";

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
              <ConfigProvider theme={customTheme}>
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
                        <Route path="/profile" element={<Profile />}></Route>
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
              </ConfigProvider>
              <DevtoolsPanel />
            </DevtoolsProvider>
          </AntdApp>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
