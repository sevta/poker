import { MantineProvider } from "@mantine/core";
import { AppProps } from "next/app";
import Head from "next/head";

import "@fontsource/inter/100.css";
import "@fontsource/inter/200.css";
import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/800.css";
import "@fontsource/inter/900.css";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>Page title</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: "light",
          fontFamily: "Inter",
          primaryColor: "cyan",
          headings: {
            fontFamily: "Inter",
          },
          components: {
            Title: {
              styles: {
                root: {
                  fontWeight: 600,
                },
              },
            },
            Card: {
              styles: (theme) => ({
                root: {
                  backgroundColor:
                    theme.colorScheme === "dark"
                      ? theme.colors.dark[4]
                      : theme.white,
                },
              }),
            },
            Button: {
              defaultProps: {
                radius: 0,
              },
              styles: {
                root: {
                  fontWeight: 500,
                },
              },
            },
            Modal: {
              defaultProps: {
                radius: 0,
              },
            },
            TextInput: {
              defaultProps: {
                radius: 0,
              },
            },
          },
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
}
