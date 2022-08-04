import { Box, Card, Center, Text, useMantineTheme } from "@mantine/core";
import { Suits } from "utils";

interface PokerCardProps {
  rank?: string | number;
  suits?: Suits;
  isCardOpen: boolean;
}

export default function PokerCard({
  rank = "1",
  suits,
  isCardOpen = false,
}: PokerCardProps) {
  const theme = useMantineTheme();
  const cardSize = {
    width: 110,
    height: 150,
  };

  function renderSuits() {
    switch (suits) {
      case "spades":
        return <Text sx={{ fontSize: 60 }}>♠</Text>;
      case "hearts":
        return (
          <Text
            sx={{
              color: theme.colors.red[7],
              fontSize: 40,
            }}
          >
            ♥
          </Text>
        );
      case "clubs":
        return (
          <Text
            sx={{
              fontSize: 60,
            }}
          >
            ♣
          </Text>
        );
      case "diamonds":
        return (
          <Text
            sx={{
              color: theme.colors.red[7],
              fontSize: 60,
            }}
          >
            ♦
          </Text>
        );
      default:
        break;
    }
  }

  function renderRank() {
    switch (rank) {
      case "11":
        return "J";
      case "12":
        return "Q";
      case "13":
        return "K";
      case "1":
        return "A";
      default:
        return rank;
    }
  }

  if (!isCardOpen) {
    return (
      <Card
        withBorder
        sx={{ width: cardSize.width, height: cardSize.height }}
        radius="lg"
      >
        <Box>open</Box>
      </Card>
    );
  } else {
    return (
      <Card
        withBorder
        sx={{ width: cardSize.width, height: cardSize.height }}
        radius="lg"
      >
        <Box
          sx={{
            position: "absolute",
            top: theme.spacing.md,
            left: theme.spacing.md,
          }}
        >
          <Text size="md" weight={600}>
            {renderRank()}
          </Text>
        </Box>
        <Center sx={{ height: "100%" }}>
          <Text size="xl" weight={600}>
            {renderSuits()}
          </Text>
        </Center>
      </Card>
    );
  }
}
