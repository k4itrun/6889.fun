import '@/styles/globals.css';

import { MyAppProps } from "@/interfaces";
import { headerConfig } from '@k4itrunconfig';

import { ContextMenu, MenuItem } from '@/components/client/ContextMenu';
import Cursor from '@/components/client/Cursor';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';

import { PageProvider } from '@/context/PageProvider';
import { ThemeProvider } from '@/context/ThemeProvider';

import Progress from '@/lib/useProgress';

import Router from 'next/router';
import Head from 'next/head';

import { Fragment, useEffect, useState } from 'react';
import { Transition } from '@headlessui/react';

export default function MyApp({ Component, pageProps }: MyAppProps) {
  const betters = ['design', 'write', 'develop', 'moderate', 'create', 'explore', 'collaborate'];
  const [loading, setLoading] = useState<boolean>(false);
  const [better, setBetter] = useState<string>(() => {
    const randomBetter = betters[Math.floor(Math.random() * betters.length)];
    return randomBetter || "default";
  });

  useEffect(() => {
    setBetter(better);
  }, [better]);

  useEffect(() => {
    const setLoadingState = (state: boolean) => {
      setLoading(state);
      document.documentElement.style.pointerEvents = state ? 'all' : 'none';
    };

    const handleRouteChange = (isComplete: boolean) => {
      setTimeout(() => setLoadingState(isComplete), 1000);
    };

    Router.events.on('routeChangeStart', () => setLoadingState(false));
    Router.events.on('routeChangeComplete', () => handleRouteChange(true));
    Router.events.on('routeChangeError', () => handleRouteChange(true));

    handleRouteChange(true); // Initial load

    return () => {
      Router.events.off('routeChangeStart', () => setLoadingState(false));
      Router.events.off('routeChangeComplete', () => handleRouteChange(true));
      Router.events.off('routeChangeError', () => handleRouteChange(true));
    };
  }, []);

  return (
    <>
      <ThemeProvider>
        <PageProvider>
          <Head>
            <title>{headerConfig.title}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          </Head>
          <Cursor />
          <ContextMenu
            content={(event) => (
              <>
                <div>
                  {event.hasBack && (
                    <MenuItem
                      icon={<i className="fa fa-arrow-left" />}
                      text="Back"
                      kbd={["Alt", "◀"]}
                      onClick={event.goBack}
                    />
                  )}
                  {event.hasForward && (
                    <MenuItem
                      icon={<i className="fa fa-arrow-right" />}
                      text="Forward"
                      kbd={["Alt", "▶"]}
                      onClick={event.goForward}
                    />
                  )}
                  <MenuItem
                    icon={<i className="fa fa-redo" />}
                    text="Refresh"
                    kbd={["Ctrl", "R"]}
                    onClick={event.refreshPage}
                  />
                </div>
                <div className="pt-3">
                  <MenuItem icon={<i className="fab fa-github" />} text="Github" onClick={event.viewGithub} />
                  <MenuItem icon={<i className="fab fa-youtube" />} text="YouTube" onClick={event.viewYoutube} />
                </div>
              </>
            )}
          >
            <Progress />
            <main className="border-primary/30 dark:border-secondary border-b-[8px] border-t-[0px] h-full w-full">
              <div className="min-h-screen max-w-screen-lg p-5 w-full md:w-10/12 lg:w-8/12 mx-auto transition-all duration-300">
                <Nav />
                <Component {...pageProps} />
              </div>
            </main>

            <Footer better={better} />
          </ContextMenu>

          <div className="color-layout layout-primary position-right-top" />
          <div className="color-layout layout-secondary position-left-bottom" />

        </PageProvider>
      </ThemeProvider>
    </>
  );
};