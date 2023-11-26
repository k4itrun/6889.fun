import { Fragment, useEffect, useState } from "react";
import { PageProvider } from 'context/page';
import { ThemeProvider } from 'context/theme';
import dynamic from 'next/dynamic';
import 'styles/globals.css';
import Head from 'next/head';
import { Transition } from "@headlessui/react";
import "react-multi-carousel/lib/styles.css";
import Router, { useRouter } from "next/router";
import CustomCursor from 'components/Global/Cursor';
import ContextMenu, { Item } from 'components/Global/ContextMenu';
import k4itrunConfig from '../../k4itrun.config';
import Footer from 'components/Static/Footer';
import Header from '../components/Static/Header';

function MyApp({ Component, pageProps }) {
  const betters = [
    'design',
    'write',
    'develop',
    'moderate'
  ];
  const [load, setLoad] = useState(false);
  let [better, setBetter] = useState(betters[Math.floor(Math.random() * betters.length)]);
  useEffect(() => { setBetter(better) }, [better]);
  useEffect(() => {
    const handleRouteChangeStart = () => {
      setLoad(false);
      document.documentElement.style = 'pointer-events: none;';
    };

    const handleRouteChangeComplete = () => {
      setTimeout(() => {
        setLoad(true);
        document.documentElement.style = 'pointer-events: all;';
      }, 1000);
    };

    const handleRouteChangeError = () => {
      setTimeout(() => {
        setLoad(true);
        document.documentElement.style = 'pointer-events: all;';
      }, 1000);
    };

    setTimeout(() => {
      setLoad(true);
      document.documentElement.style = 'pointer-events: all;';
    }, 1000);

    Router.events.on('routeChangeStart', handleRouteChangeStart);
    Router.events.on('routeChangeComplete', handleRouteChangeComplete);
    Router.events.on('routeChangeError', handleRouteChangeError);

    return () => {
      Router.events.off('routeChangeStart', handleRouteChangeStart);
      Router.events.off('routeChangeComplete', handleRouteChangeComplete);
      Router.events.off('routeChangeError', handleRouteChangeError);
    };
  }, []);

  return (
    <>
      <ThemeProvider>
        <PageProvider>
          <Head>
            <title>{k4itrunConfig.name}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link href="https://pro.fontawesome.com/releases/v5.15.4/css/all.css" rel="stylesheet" />
          </Head>

          <CustomCursor />

          <ContextMenu
            content={(event) => (
              <>
                <div>
                  {event.hasBack && (
                    <Item
                      icon={<i className="fa fa-arrow-left" />}
                      text="Back"
                      kbd={["Alt", "◀"]}
                      onClick={event.goBack}
                    />
                  )}
                  {event.hasForward && (
                    <Item
                      icon={<i className="fa fa-arrow-right" />}
                      text="Forward"
                      kbd={["Alt", "▶"]}
                      onClick={event.goForward}
                    />
                  )}
                </div>
                <div className="pt-2">
                  <Item
                    icon={<i className="fa fa-redo" />}
                    text="Refresh"
                    kbd={["Ctrl", "R"]}
                    onClick={event.refreshPage}
                  />
                  {/* <Item 
                    icon={<i className="fa fa-code" />} 
                    text="View Source" onClick={event.viewSource} 
                  /> */}
                </div>
              </>
            )}
          >
            <Transition
              as={Fragment}
              show={!load}
              enter="transform transition duration-[100ms]"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transform duration-[250ms] transition ease-in-out"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div style={{ zIndex: 99999 }} className="fixed bg-black/50 w-full h-screen flex justify-center items-center pointer-events-none">
                <div className="flex items-center gap-x-6 animate-pulse">
                  <div className="text-center">
                    <p className="text-6xl mb-5 font-semibold">{k4itrunConfig.name}</p>
                    <p className="uppercase text-xl font-semibold text-white"><i className="fal fa-spinner-third fa-spin" /></p>
                  </div>
                </div>
              </div>
            </Transition>

            <main className="border-b-[7px] border-t-[7px] h-full border-[#191932] w-full">
              <div className="min-h-screen max-w-screen-lg p-5 w-full md:w-10/12 lg:w-8/12 mx-auto transition-all duration-300">
                <Header />
                <Component {...pageProps} />
              </div>
            </main>

            <Footer better={better} />
          </ContextMenu>

          <div className="color-layout layout-purple position-right-top" />
          <div className="color-layout layout-blue position-left-bottom" />
        </PageProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
