import { AppShell, AppShellProps, useMantineTheme } from "@mantine/core";

interface LayoutProps extends AppShellProps {}

export default function Layout({ children }: LayoutProps) {
  const theme = useMantineTheme();

  return (
    <AppShell
      padding={0}
      sx={{
        backgroundColor:
          theme.colorScheme === "light"
            ? theme.fn.lighten(theme.colors.gray[1], 0.2)
            : theme.colors.dark[7],
      }}
    >
      {children}
    </AppShell>
  );
}
